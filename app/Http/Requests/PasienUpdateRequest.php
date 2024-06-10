<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PasienUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama_pasien' => 'required',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:LK,PM',
            'status_pasien' => '',
            'no_bpjs' => 'required',
            'alamat' => 'required',
            'no_kontak' => 'required',
        ];
    }
}
