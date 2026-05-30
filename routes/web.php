<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/light-preview', 'light-preview')->name('light-preview');
Route::inertia('/about-company', 'about-company')->name('about-company');
Route::inertia('/teams', 'teams')->name('teams');
Route::inertia('/our-brands', 'our-brands')->name('our-brands');
Route::inertia('/contact', 'contact')->name('contact');

Route::inertia('/products', 'products')->name('products');
Route::get('/products/{slug}', function ($slug) {
    $categories = ['indoor', 'outdoor', 'solar', 'poles', 'decorative', 'highmast'];
    if (in_array(strtolower($slug), $categories)) {
        return inertia('products', ['initialCategory' => ucfirst($slug)]);
    }
    return inertia('product-details', ['slug' => $slug]);
})->name('products.detail');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
