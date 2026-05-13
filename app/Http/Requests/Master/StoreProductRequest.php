<?php

namespace App\Http\Requests\Master;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'code' => ['required', 'string', 'max:20', Rule::unique('products', 'code')],
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'in:Isi Ulang,APAR Baru,Tukar Tambah,Reparasi,O2,Evakuasi'],
            'apar_type' => ['nullable', 'string', 'in:Powder,CO2,Foam,Wet Chemical'],
            'apar_size' => ['nullable', 'string', 'max:10'],
            'cost_price' => ['nullable', 'numeric', 'min:0'],
            'selling_price' => ['nullable', 'numeric', 'min:0'],
            'expiry_months' => ['nullable', 'integer', 'min:1'],
        ];
    }
}
