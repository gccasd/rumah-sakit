<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderPemeriksaan extends Model
{
    use HasFactory;

    protected $table = 'order_pemeriksaan';

    protected $fillable = [
        'no_rm',
        'jaminan',
        'dokter_penanggung_jawab',
        'status_pemeriksaan',
        'total_pembayaran',
        'metode_pembayaran',
        'jenis_pemeriksaan',
        'status_pembayaran',
        'edta',
        'serum',
        'citrate',
        'urin',
        'lainnya',
    ];

    public function orderJenisPemeriksaans()
    {
        return $this->hasMany(OrderJenisPemeriksaan::class, 'order_pemeriksaan_id', 'id');
    }

    public function pasien()
    {
        return $this->belongsTo(Pasien::class, 'no_rm', 'no_rm');
    }

}
