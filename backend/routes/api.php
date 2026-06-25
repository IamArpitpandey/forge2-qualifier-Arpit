<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\ListController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\MemberController;

Route::apiResource('boards', BoardController::class);
Route::apiResource('lists', ListController::class);
Route::apiResource('cards', CardController::class);
Route::patch('cards/{card}/move', [CardController::class, 'move']);
Route::apiResource('tags', TagController::class);
Route::apiResource('members', MemberController::class);
