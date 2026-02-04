<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['role', 'search']);
        $users = $this->userService->getAllUsers($filters);

        return response()->json($users);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => ['required', Rule::in(['student', 'admin'])],
        ]);

        $user = $this->userService->createUser($validated);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }

    public function show($id)
    {
        $user = $this->userService->getUserById($id);
        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $user = $this->userService->getUserById($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => ['sometimes', 'required', 'email', Rule::unique('users')->ignore($user->id)],
            'password' => 'sometimes|nullable|string|min:8',
            'role' => ['sometimes', 'required', Rule::in(['student', 'admin'])],
        ]);

        $updatedUser = $this->userService->updateUser($user, $validated);

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $updatedUser
        ]);
    }

    public function destroy($id)
    {
        $user = $this->userService->getUserById($id);

        // Prevent deleting yourself
        if ($user->id === auth()->id()) {
            return response()->json([
                'message' => 'You cannot delete your own account'
            ], 403);
        }

        $this->userService->deleteUser($user);

        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }
}
