<?php
namespace App\Http\Controllers;
use App\Models\Member;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function index() { return Member::all(); }
    public function store(Request $request) {
        return response()->json(Member::create($request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:members'
        ])), 201);
    }
    public function show(Member $member) { return $member; }
    public function update(Request $request, Member $member) {
        $member->update($request->validate(['name'=>'string','email'=>'email']));
        return $member;
    }
    public function destroy(Member $member) {
        $member->delete();
        return response()->json(null, 204);
    }
}