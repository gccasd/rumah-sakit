<?php

namespace Database\Seeders;

use App\Models\JenisPemeriksaan;
use App\Models\OrderJenisPemeriksaan;
use App\Models\OrderPemeriksaan;
use App\Models\Pasien;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    public $faker;

    public function __construct() {
        $this->faker = Faker::create('id_ID');
    }

    /**
     * Seed the application's database.
     */
    public function generateRupiah($min, $max) {
        $number = $this->faker->numberBetween($min, $max);
        // Membuat angka menjadi kelipatan 1000
        $rounded_number = floor($number / 1000) * 1000;
        return $rounded_number;
    }

    public function run(): void
    {
        // User::factory(10)->create();
        for ($i = 1; $i <= 110; $i++) {
            Pasien::create([
                'no_rm' => 'RM' . sprintf('%03d', $i),
                'nama_pasien' => $this->faker->name(),
                'tanggal_lahir' => date('Y-m-d', strtotime('-' . rand(7, 80) . ' years')),
                'jenis_kelamin' => $i % 2 == 0 ? 'LK' : 'PM',
                'status_pasien' => $i % 5 == 0 ? 'Non-Aktif' : 'Aktif',
                'no_bpjs' => sprintf('%010d', rand(1, 9999999999)),
                'alamat' => $this->faker->streetAddress(),
                'no_kontak' => '0812345678' . sprintf('%02d', $i),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        User::create([
            'name' => 'AndKocak',
            'email' => 'admin@gmail.com',
            'password' => Hash::make("12345678"),
        ]);

        $jenis_pemeriksaan = [
            'Hematologi' => [
                'Pemeriksaan darah rutin',
                'Pemeriksaan darah lengkap',
                'Pemeriksaan hemotokrit',
                'Pemeriksaan golongan darah',
                'Pemeriksaan trombosit',
            ],
            'Kimia klinik' => [
                'Pemeriksaan asam urat',
                'Pemeriksaan kolesterol',
                'Pemeriksaan glukosa darah',
                'Pemeriksaan LDL HDL',
                'Pemeriksaan Trigliserida',
            ],
            'Imunoserologi' => [
                'Pemeriksaan HIV',
                'Pemeriksaan HBsAg',
                'Pemeriksaan Dengue',
                'Pemeriksaan Sifilis',
                'Pemeriksaan Widal',
            ],
            'Parasitologi' => [
                'Pemeriksaan Malaria',
                'Analisa Parasit Tinja',
                'Analisa Parasit Protozoa',
            ],
            'Mikrobiologi' => [
                'BTA/GRAM',
                'Kultur Bakteri',
                'TCM',
                'Tes Kepekaan Antibiotik',
            ],
            'Histologi' => [
                'Pap smear',
                'Sputum',
                'Biopsi jaringan',
            ],
        ];

        foreach ($jenis_pemeriksaan as $jenis => $pemeriksaans) {
            foreach ($pemeriksaans as $pemeriksaan) {
                JenisPemeriksaan::create([
                    'jenis_pemeriksaan' => $jenis,
                    'nama_jenis_pemeriksaan' => $pemeriksaan,
                ]);
            }
        }
        for ($i = 1; $i <= 16; $i++) { 
            OrderPemeriksaan::create([
                'no_rm' => 'RM' . str_pad($i, 3, '0', STR_PAD_LEFT), // Format nomor RM
                'jaminan' => $this->faker->randomElement(['BPJS']),
                'dokter_penanggung_jawab' => $this->faker->name,
                'status_pemeriksaan' => $this->faker->randomElement(['selesai', 'proses']),
                'total_pembayaran' => $this->generateRupiah(10000, 150000), 
                'metode_pembayaran' => $this->faker->randomElement(['cash', 'debit']),
                'jenis_pemeriksaan' => $this->faker->word,
                'status_pembayaran' => $this->faker->randomElement(['proses', 'diterima']),
                'edta' => $this->faker->randomElement(["yes", "no"]),
                'serum' => $this->faker->randomElement(["yes", "no"]),
                'citrate' => $this->faker->randomElement(["yes", "no"]),
                'urin' => $this->faker->randomElement(["yes", "no"]),
                'lainnya' => $this->faker->randomElement(["yes", "no"]),
            ]);
        }

        for ($i = 1; $i <= 10; $i++) { 
            for ($j = 1; $j <= 3; $j++) {
                OrderJenisPemeriksaan::create([
                    'order_pemeriksaan_id' => $i,
                    'jenis_pemeriksaan_id' => $j,
                ]);
            }
        }
    }
}
