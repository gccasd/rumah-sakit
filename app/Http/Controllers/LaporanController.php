<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanController extends Controller
{
    public function keuangan()
    {
        return Inertia::render('Laporan/Keuangan', [
            'status' => session('status'),
        ]);
    }

    public function rawatJalan()
    {
        return Inertia::render('Laporan/RawatJalan', [
            'status' => session('status'),
        ]);
    }
}
