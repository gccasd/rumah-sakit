<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasienStoreRequest;
use App\Http\Requests\PasienUpdateRequest;
use App\Models\Pasien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class PasienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $search = $request->query('search');

        if ($search) {
            $pasien = Pasien::where('nama_pasien', 'like', "%{$search}%")->get();
            return Inertia::render('Pasien/DaftarPasien', [
                'pasien' => $pasien,
                'page' => 1,
                'status' => session('status'),
            ]);
        };

        $pasien = Pasien::paginate(15);

        return Inertia::render('Pasien/DaftarPasien', [
            'pasien' => $pasien->items(),
            'page' => $pasien->lastPage(),
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Pasien/InputDataPasien', [
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PasienStoreRequest $request)
    {
        $validate = $request->validated();

        $pasien = Pasien::create($validate);

        return Inertia::render('Pasien/InputDataPasien', [
            'status' => session('status'),
            'pasien' => $pasien
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Hitung jumlah halaman yang akan dilewati
        $page = $id; // Halaman kedua
        $perPage = 15; // Jumlah entri per halaman

        $dataSkipped = ($page - 1) * $perPage; // Hitung jumlah data yang akan dilewati

        $pasien = Pasien::skip($dataSkipped)->take($perPage)->get();
        $totalData = Pasien::count();
        $totalPages = ceil($totalData / $perPage);

        return Inertia::render('Pasien/DaftarPasien', [
            'pasien' => $pasien,
            'page' => $totalPages,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pasien $pasien)
    {

        return Inertia::render('Pasien/UpdateDataPasien', [
            'pasien' => $pasien,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PasienUpdateRequest $request, Pasien $pasien)
    {
        $validate = $request->validated();

        $pasien = Pasien::find($pasien->id)->update($validate);

        return Inertia::render('Pasien/UpdateDataPasien', [
            'pasien' => $pasien,
            'status' => session('status'),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pasien $pasien)
    {
        //
        $pasien = Pasien::destroy($pasien->id);
        return Redirect::back();
    }
}
