<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrderPemeriksaan;
use Inertia\Inertia;

class TagihanController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        if ($search) {
            $pemeriksaan = OrderPemeriksaan::with(['pasien'])->where('no_rm', 'like', "%{$search}%")->get();
            return Inertia::render('Tagihan/DaftarPembayaran', [
                'pemeriksaan' => $pemeriksaan,
                'page' => 1,
                'status' => session('status'),
            ]);
        };

        $pemeriksaan = OrderPemeriksaan::with(['pasien'])->paginate(15);

        return Inertia::render('Tagihan/DaftarPembayaran', [
            'pemeriksaan' => $pemeriksaan->items(),
            'page' => $pemeriksaan->lastPage(),
            'status' => session('status'),
        ]);
    }

    public function claim(Request $request) 
    {
        $search = $request->query('search');

        if ($search) {
            $pemeriksaan = OrderPemeriksaan::with(['pasien'])->where('no_rm', 'like', "%{$search}%")->get();
            return Inertia::render('Tagihan/DataPembayaran', [
                'pemeriksaan' => $pemeriksaan,
                'page' => 1,
                'status' => session('status'),
            ]);
        };

        $pemeriksaan = OrderPemeriksaan::with(['pasien'])->paginate(15);

        return Inertia::render('Tagihan/DataPembayaran', [
            'pemeriksaan' => $pemeriksaan->items(),
            'page' => $pemeriksaan->lastPage(),
            'status' => session('status'),
        ]);
    }

    public function cetak()
    {

    }
}