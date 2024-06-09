<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\OrderPemeriksaanController;
use App\Http\Controllers\HasilPemeriksaanController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\PengambilanSampleController;
use App\Http\Controllers\TagihanController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
        Route::get('register', [RegisteredUserController::class, 'create'])
                ->name('register');

        Route::post('register', [RegisteredUserController::class, 'store']);

        Route::get('login', [AuthenticatedSessionController::class, 'create'])
                ->name('login');

        Route::post('login', [AuthenticatedSessionController::class, 'store']);

        Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
                ->name('password.request');

        Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
                ->name('password.email');

        Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
                ->name('password.reset');

        Route::post('reset-password', [NewPasswordController::class, 'store'])
                ->name('password.store');
});

Route::middleware('auth')->group(function () {
        Route::get('verify-email', EmailVerificationPromptController::class)
                ->name('verification.notice');

        Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
                ->middleware(['signed', 'throttle:6,1'])
                ->name('verification.verify');

        Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware('throttle:6,1')
                ->name('verification.send');

        Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
                ->name('password.confirm');

        Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

        Route::put('password', [PasswordController::class, 'update'])->name('password.update');

        Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');
        // new route
        Route::get('list-pemeriksaan', [OrderPemeriksaanController::class, 'indexJenisPemeriksaan'])
                ->name('jenis_pemeriksaan');

        Route::put('list-pemeriksaan/{id}', [OrderPemeriksaanController::class, 'updateJenisPemeriksaan'])
                ->name('jenis_pemeriksaan_update');

        Route::get('order-pemeriksaan', [OrderPemeriksaanController::class, 'create'])
                ->name('order-pemeriksaan');

        Route::post('order-pemeriksaan', [OrderPemeriksaanController::class, 'store'])
                ->name('order-pemeriksaan');

        Route::get('hasil-pemeriksaan', [HasilPemeriksaanController::class, 'index'])
                ->name('hasil-pemeriksaan');

        Route::get('hasil-pemeriksaan/{id}', [HasilPemeriksaanController::class, 'edit'])
                ->name('hasil-pemeriksaan-edit');

        Route::get('hasil-pemeriksaan-validasi', [HasilPemeriksaanController::class, 'validasi'])
                ->name('hasil-pemeriksaan-validasi');

        Route::get('daftar-pembayaran', [TagihanController::class, 'index'])
                ->name('daftar-pembayaran');

        Route::get('data-pembayaran', [TagihanController::class, 'claim'])
                ->name('data-pembayaran');

        Route::get('pengambilan-sample', [PengambilanSampleController::class, 'index'])
                ->name('pengambilan-sample');

        Route::get('cetak-barcode', [PengambilanSampleController::class, 'cetakBarcode'])
                ->name('cetak-barcode');

        Route::get('laporan-keuangan', [LaporanController::class, 'keuangan'])
                ->name('laporan-keuangan');

        Route::get('laporan-rawat-jalan', [LaporanController::class, 'rawatJalan'])
                ->name('laporan-rawat-jalan');

        Route::resource('pasien', PasienController::class);

        // Route::resource('pemeriksaan', OrderPemeriksaanController::class);
});
