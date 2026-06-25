<?php
namespace App\Http\Controllers;
use App\Models\Board;
use Illuminate\Http\Request;

class BoardController extends Controller
{
    public function index() {
        return Board::all();
    }
    public function store(Request $request) {
        $board = Board::create($request->validate(['title' => 'required|string']));
        return response()->json($board, 201);
    }
    public function show(Board $board) {
        return $board->load('lists.cards');
    }
    public function update(Request $request, Board $board) {
        $board->update($request->validate(['title' => 'required|string']));
        return $board;
    }
    public function destroy(Board $board) {
        $board->delete();
        return response()->json(null, 204);
    }
}