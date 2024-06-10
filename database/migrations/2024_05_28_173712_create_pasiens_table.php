<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pasien', function (Blueprint $table) {
            $table->id();
            $table->string("no_rm")->unique();
            $table->string('nama_pasien');
            $table->string('tanggal_lahir');
            $table->string('tempat_lahir')->nullable();
            $table->enum('jenis_kelamin', ['LK', 'PM']);
            $table->string('status_pasien')->nullable();
            $table->string('no_bpjs');
            $table->string('alamat');
            $table->string('no_kontak');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pasien');
    }
};
