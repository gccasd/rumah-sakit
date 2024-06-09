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
        Schema::create('jenis_pemeriksaan', function (Blueprint $table) {
            $table->id();
            $table->string('nama_jenis_pemeriksaan');            
            $table->enum('jenis_pemeriksaan', 
                                [
                                    "Hematologi", 
                                    "Kimia Klinik", 
                                    "Imunoserologi",
                                    "Parasitologi",
                                    "Mikrobiologi",
                                    "Histologi"
                                ]);
                                $table->enum('active', ['active', 'inactive'])->default('inactive')->nullable();            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jenis_pemeriksaan');
    }
};
