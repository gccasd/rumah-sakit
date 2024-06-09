<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderPemeriksaanUpdateRequest;
use App\Models\JenisPemeriksaan;
use App\Models\OrderPemeriksaan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pasien;
use Faker\Factory as Faker;
use Illuminate\Support\Number;

class OrderPemeriksaanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //


    }

        /**
     * Display a listing of the resource.
     */
    public function indexJenisPemeriksaan()
    {
        //
        $jenisPemeriksaan = JenisPemeriksaan::all();

        return Inertia::render('Pemeriksaan/ListPemeriksaan', [
            'jenisPemeriksaan' => $jenisPemeriksaan,
            'session' => session('status')
        ]);
    }

    public function updateJenisPemeriksaan(Request $request, $id)
    {
        $validate = $request->all();

        JenisPemeriksaan::find($id)->update($validate);
        return redirect()->back();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {;
        $no_rm = $request->query('no_rm');
        $jenisPemeriksaan = JenisPemeriksaan::where('active', 'active')->get();

        if ($no_rm) {
            $pasien = Pasien::where('no_rm', 'like', "%{$no_rm}%")->take(6)->get();
            return Inertia::render('Pemeriksaan/OrderPemeriksaan', [
                'pasien' => $pasien,
                'status' => session('status'),
            ]);
        }
        
        return Inertia::render('Pemeriksaan/OrderPemeriksaan', [
            'jenisPemeriksaan' => $jenisPemeriksaan,
            'session' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderPemeriksaanUpdateRequest $request)
    {
        //
        $faker = Faker::create('id_ID');
        $number = $faker->numberBetween(30000, 150000);
        // Membuat angka menjadi kelipatan 1000
        $rounded_number = floor($number / 1000) * 1000;
        $total_pembayaran = $rounded_number;

        $validate = $request->validated();
        $validate["total_pembayaran"] = $total_pembayaran;
        $validate["metode_pembayaran"] = $faker->randomElement(['cash', 'debit']);
        $validate["status_pemeriksaan"] = $faker->randomElement(['proeses', 'selesai']);

        $OrderPemeriksaan = OrderPemeriksaan::create($validate);
        $jenisPemeriksaan = JenisPemeriksaan::where('active', 'active')->get();

        return Inertia::render('Pemeriksaan/OrderPemeriksaan', [
            'status' => session('status'),
            'orderPemeriksaan' => $OrderPemeriksaan,
            'jenisPemeriksaan' => $jenisPemeriksaan,
            'pasien' => ''
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
