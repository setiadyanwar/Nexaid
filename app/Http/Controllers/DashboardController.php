<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        // Ambil data dari database
        $totalProducts = Product::count();
        $totalCategories = Category::count();

        // Kirim data ke view Inertia
        return Inertia::render('dashboard', [
            'totalProducts' => $totalProducts,
            'totalCategories' => $totalCategories,
        ]);
    }
}