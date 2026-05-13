<?php

namespace App\Http\Controllers\Apar;

use App\Http\Controllers\Controller;
use App\Models\AparUnit;
use App\Models\Certificate;
use App\Models\InspectionSchedule;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InspectionController extends Controller
{
    public function index(Request $request): Response
    {
        $inspections = InspectionSchedule::with(['aparUnit:id,serial_number', 'aparUnit.product:id,name,apar_type,apar_size', 'customer:id,name'])
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->orderByDesc('scheduled_date')
            ->get()
            ->map(fn ($i) => [
                'id' => $i->id,
                'serial_number' => $i->aparUnit?->serial_number,
                'product_name' => $i->aparUnit?->product?->name,
                'customer_name' => $i->customer?->name,
                'scheduled_date' => $i->scheduled_date->format('Y-m-d'),
                'completed_date' => $i->completed_date?->format('Y-m-d'),
                'status' => $i->status,
                'result' => $i->result,
            ]);

        return Inertia::render('apar/inspections/index', [
            'inspections' => $inspections,
            'filters' => $request->only(['status']),
        ]);
    }

    public function create(): Response
    {
        $units = AparUnit::whereIn('status', ['Aktif', 'Perlu Isi Ulang'])
            ->with('product:id,name,apar_type,apar_size')
            ->get()
            ->map(fn ($u) => [
                'id' => $u->id,
                'serial_number' => $u->serial_number,
                'product_name' => $u->product?->name,
                'location' => $u->location,
            ]);

        return Inertia::render('apar/inspections/create', [
            'units' => $units,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'apar_unit_id' => ['required', 'exists:apar_units,id'],
            'scheduled_date' => ['required', 'date'],
            'notes' => ['nullable', 'string'],
        ]);

        $unit = AparUnit::findOrFail($validated['apar_unit_id']);

        InspectionSchedule::create([
            'team_id' => $request->user()->current_team_id,
            'apar_unit_id' => $unit->id,
            'customer_id' => $unit->customer_id,
            'scheduled_date' => $validated['scheduled_date'],
            'status' => 'Scheduled',
            'notes' => $validated['notes'],
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Inspection scheduled.')]);

        return to_route('apar.inspections.index', ['current_team' => $request->route('current_team')]);
    }

    public function complete(Request $request, InspectionSchedule $inspectionSchedule)
    {
        $validated = $request->validate([
            'result' => ['required', 'string', 'in:Lulus,Perbaikan,Afkir'],
            'pressure' => ['nullable', 'numeric', 'min:0'],
            'seal_ok' => ['boolean'],
            'pin_ok' => ['boolean'],
            'hose_ok' => ['boolean'],
            'notes' => ['nullable', 'string'],
        ]);

        $inspectionSchedule->update([
            'status' => 'Completed',
            'completed_date' => now(),
            'result' => $validated['result'],
            'pressure' => $validated['pressure'],
            'seal_ok' => $validated['seal_ok'] ?? false,
            'pin_ok' => $validated['pin_ok'] ?? false,
            'hose_ok' => $validated['hose_ok'] ?? false,
            'notes' => $validated['notes'],
        ]);

        $unit = $inspectionSchedule->aparUnit;

        if ($validated['result'] === 'Lulus') {
            $certNumber = 'SERTIF-'.now()->format('Ymd').'-'.str_pad(Certificate::max('id') + 1, 4, '0', STR_PAD_LEFT);
            Certificate::create([
                'team_id' => $request->user()->current_team_id,
                'apar_unit_id' => $unit->id,
                'inspection_schedule_id' => $inspectionSchedule->id,
                'certificate_number' => $certNumber,
                'issued_date' => now(),
                'expiry_date' => now()->addYear(),
                'status' => 'Active',
            ]);

            $unit->update(['status' => 'Aktif']);
        } elseif ($validated['result'] === 'Perbaikan') {
            $unit->update(['status' => 'Perlu Isi Ulang']);
        } else {
            $unit->update(['status' => 'Afkir']);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Inspection completed.')]);

        return back();
    }
}
