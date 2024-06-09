<?php

namespace App\Http\Controllers;

use App\Models\OrderPemeriksaan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengambilanSampleController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        if ($search) {
            $pemeriksaan = OrderPemeriksaan::with(['pasien'])->where('no_rm', 'like', "%{$search}%")->get();
            return Inertia::render('Sample/PengambilanSample', [
                'pemeriksaan' => $pemeriksaan,
                'page' => 1,
                'status' => session('status'),
            ]);
        };

        $pemeriksaan = OrderPemeriksaan::with(['pasien'])->paginate(15);

        return Inertia::render('Sample/PengambilanSample', [
            'pemeriksaan' => $pemeriksaan->items(),
            'page' => $pemeriksaan->lastPage(),
            'status' => session('status'),
        ]);
    }

    public function cetakBarcode(Request $request) 
    {
        $search = $request->query('search');

        if ($search) {
            $pemeriksaan = OrderPemeriksaan::with(['pasien'])->where('no_rm', 'like', "%{$search}%")->get();
            return Inertia::render('Sample/CetakBarcode', [
                'pemeriksaan' => $pemeriksaan,
                'page' => 1,
                'status' => session('status'),
            ]);
        };

        $pemeriksaan = OrderPemeriksaan::with(['pasien'])->paginate(15);

        return Inertia::render('Sample/CetakBarcode', [
            'pemeriksaan' => $pemeriksaan->items(),
            'page' => $pemeriksaan->lastPage(),
            'status' => session('status'),
        ]);
    }
}
