<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pasien extends Model
{
    use HasFactory;

    protected $table = 'pasien';

    protected $fillable = [
        'no_rm',
        'nama_pasien',
        'tanggal_lahir',
        'jenis_kelamin',
        'status_pasien',
        'no_bpjs',
        'alamat',
        'no_kontak',
    ];

    public function orderPemeriksaan()
    {
        return $this->hasMany(OrderPemeriksaan::class, 'no_rm', 'no_rm');
    }
}
