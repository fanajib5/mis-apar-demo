<?php

namespace App\Http\Requests\Master;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCustomerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'code' => ['required', 'string', 'max:20', Rule::unique('customers', 'code')],
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'in:Perorangan,Instansi,Toko,Apotek,Puskesmas,Perusahaan,Hotel/Mall/Gedung'],
            'tag' => ['nullable', 'string', 'in:VIP,Reguler,Tender'],
            'phone' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:255'],
            'address' => ['nullable', 'string'],
            'pic_name' => ['nullable', 'string', 'max:255'],
            'pic_phone' => ['nullable', 'string', 'max:20'],
            'pic_position' => ['nullable', 'string', 'max:255'],
            'credit_limit' => ['nullable', 'numeric', 'min:0'],
            'payment_term' => ['nullable', 'string', 'max:20'],
        ];
    }
}
