<?php
namespace App\Http\Controllers;
use App\Models\BoardList;
use Illuminate\Http\Request;

class ListController extends Controller
{
    public function index() {
        return BoardList::all();
    }
    public function store(Request $request) {
        $list = BoardList::create($request->validate([
            'title' => 'required|string',
            'board_id' => 'required|exists:boards,id',
            'position' => 'integer'
        ]));
        return response()->json($list, 201);
    }
    public function show(BoardList $list) {
        return $list->load('cards');
    }
    public function update(Request $request, BoardList $list) {
        $list->update($request->validate(['title' => 'string', 'position' => 'integer']));
        return $list;
    }
    public function destroy(BoardList $list) {
        $list->delete();
        return response()->json(null, 204);
    }
}