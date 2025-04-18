<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DashboardController;


Route::get('/', [DashboardController::class, 'index'])->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('products', ProductController::class)->names('products');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
