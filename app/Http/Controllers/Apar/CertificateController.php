<?php

namespace App\Http\Controllers\Apar;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CertificateController extends Controller
{
    public function index(Request $request): Response
    {
        $certificates = Certificate::with(['aparUnit:id,serial_number', 'aparUnit.product:id,name,apar_type,apar_size', 'inspectionSchedule'])
            ->orderByDesc('issued_date')
            ->get()
            ->map(fn ($c) => [
                'id' => $c->id,
                'certificate_number' => $c->certificate_number,
                'serial_number' => $c->aparUnit?->serial_number,
                'product_name' => $c->aparUnit?->product?->name,
                'issued_date' => $c->issued_date->format('Y-m-d'),
                'expiry_date' => $c->expiry_date->format('Y-m-d'),
                'status' => $c->status,
            ]);

        return Inertia::render('apar/certificates/index', [
            'certificates' => $certificates,
        ]);
    }
}
