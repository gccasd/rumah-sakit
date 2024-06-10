<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PasienStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        return true; 
    }

    public function rules()
    {
        return [
            'no_rm' => 'required|unique:pasien',
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
