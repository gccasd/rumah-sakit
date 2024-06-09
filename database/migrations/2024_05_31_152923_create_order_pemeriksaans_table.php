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
        Schema::create('order_pemeriksaan', function (Blueprint $table) {
            $table->id();
            $table->string('no_rm');
            $table->string('jaminan')->nullable();
            $table->string('dokter_penanggung_jawab');
            $table->string('status_pemeriksaan')->nullable();
            $table->bigInteger('total_pembayaran')->nullable();
            $table->enum('metode_pembayaran', ['debit', 'cash'])->nullable();
            $table->string('jenis_pemeriksaan')->nullable();
            $table->enum('status_pembayaran', ['proses', 'diterima'])->nullable();
            $table->enum('edta', ["yes", "no"])->default("no")->nullable();
            $table->enum('serum', ["yes", "no"])->default("no")->nullable();
            $table->enum('citrate', ["yes", "no"])->default("no")->nullable();
            $table->enum('urin', ["yes", "no"])->default("no")->nullable();
            $table->enum('lainnya', ["yes", "no"])->default("no")->nullable();   
            $table->foreign('no_rm')->references('no_rm')->on('pasien');      
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_pemeriksaan');
    }
};
