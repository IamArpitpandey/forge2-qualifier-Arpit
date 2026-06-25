<?php
namespace App\Http\Controllers;
use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function index() {
        return Card::with('tags','member')->get();
    }
    public function store(Request $request) {
        $card = Card::create($request->validate([
            'title' => 'required|string',
            'list_id' => 'required|exists:lists,id',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'member_id' => 'nullable|exists:members,id'
        ]));
        if($request->tags) $card->tags()->sync($request->tags);
        return response()->json($card->load('tags','member'), 201);
    }
    public function show(Card $card) {
        return $card->load('tags','member');
    }
    public function update(Request $request, Card $card) {
        $card->update($request->validate([
            'title' => 'string',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'member_id' => 'nullable|exists:members,id'
        ]));
        if($request->tags) $card->tags()->sync($request->tags);
        return $card->load('tags','member');
    }
    public function destroy(Card $card) {
        $card->delete();
        return response()->json(null, 204);
    }
    public function move(Request $request, string $id) {
        $card = Card::findOrFail($id);
        $card->update(['list_id' => $request->list_id]);
        return response()->json($card);
    }
}