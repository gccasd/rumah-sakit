<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisPemeriksaan extends Model
{
    use HasFactory;

    protected $table = 'jenis_pemeriksaan';

    protected $fillable = [
        'jenis_pemeriksaan',
        'nama_jenis_pemeriksaan',
        'active'
    ];

    public function orderJenisPemeriksaans()
    {
        return $this->hasMany(OrderJenisPemeriksaan::class, 'jenis_pemeriksaan_id', 'id');
    }

}
