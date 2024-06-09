<?php

namespace App\Http\Controllers;
use App\Models\OrderPemeriksaan;


use Illuminate\Http\Request;
use Inertia\Inertia;

class HasilPemeriksaanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('search');

        if ($search) {
            $pemeriksaan = OrderPemeriksaan::with(['pasien'])->where('no_rm', 'like', "%{$search}%")->get();
            return Inertia::render('Hasil/HasilPemeriksaan', [
                'pemeriksaan' => $pemeriksaan,
                'page' => 1,
                'status' => session('status'),
            ]);
        };

        $pemeriksaan = OrderPemeriksaan::with(['pasien'])->paginate(15);

        return Inertia::render('Hasil/HasilPemeriksaan', [
            'pemeriksaan' => $pemeriksaan->items(),
            'page' => $pemeriksaan->lastPage(),
            'status' => session('status'),
        ]);
    }

    public function validasi(Request $request) 
    {
        $search = $request->query('search');

        if ($search) {
            $pemeriksaan = OrderPemeriksaan::with(['pasien'])->where('no_rm', 'like', "%{$search}%")->get();
            return Inertia::render('Hasil/ValidasiHasil', [
                'pemeriksaan' => $pemeriksaan,
                'page' => 1,
                'status' => session('status'),
            ]);
        };

        $pemeriksaan = OrderPemeriksaan::with(['pasien'])->paginate(15);
        return Inertia::render('Hasil/ValidasiHasil', [
            'pemeriksaan' => $pemeriksaan->items(),
            'page' => $pemeriksaan->lastPage(),
            'status' => session('status'),
        ]);
    }

    public function edit($id)
    {
        $pemeriksaan = OrderPemeriksaan::with(['pasien'])->where('id', $id)->get();
        return Inertia::render('HasilLab/HasilLab', [
            'pemeriksaan1' => $pemeriksaan,
            'status' => session('status'),
        ]);
    }
}
