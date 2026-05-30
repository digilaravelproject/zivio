<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/about-company', 'about-company')->name('about-company');
Route::inertia('/teams', 'teams')->name('teams');
Route::inertia('/our-brands', 'our-brands')->name('our-brands');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
