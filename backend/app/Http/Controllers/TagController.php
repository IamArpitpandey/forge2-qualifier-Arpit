<?php
namespace App\Http\Controllers;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index() { return Tag::all(); }
    public function store(Request $request) {
        return response()->json(Tag::create($request->validate([
            'name' => 'required|string',
            'color' => 'required|string'
        ])), 201);
    }
    public function show(Tag $tag) { return $tag; }
    public function update(Request $request, Tag $tag) {
        $tag->update($request->validate(['name'=>'string','color'=>'string']));
        return $tag;
    }
    public function destroy(Tag $tag) {
        $tag->delete();
        return response()->json(null, 204);
    }
}