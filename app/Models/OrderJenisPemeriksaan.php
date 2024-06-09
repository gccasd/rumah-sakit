<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderJenisPemeriksaan extends Model
{
    use HasFactory;

    protected $table = 'order_jenis_pemeriksaan';

    protected $fillable = [
        'order_pemeriksaan_id',
        'jenis_pemeriksaan_id',
    ];

    public function orderPemeriksaan()
    {
        return $this->belongsTo(OrderPemeriksaan::class, 'order_pemeriksaan_id', 'id');
    }

    public function jenisPemeriksaan()
    {
        return $this->belongsTo(JenisPemeriksaan::class, 'jenis_pemeriksaan_id', 'id');
    }
}
