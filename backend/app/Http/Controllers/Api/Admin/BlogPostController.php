<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class BlogPostController extends Controller
{
    public function index()
    {
        $posts = BlogPost::orderBy('created_at', 'desc')->get();
        return response()->json($posts);
    }

    public function store(Request $request)
    {
        // Convert string 'true'/'false' to boolean for FormData
        $requestData = $request->all();
        if (isset($requestData['is_published'])) {
            $requestData['is_published'] = filter_var($requestData['is_published'], FILTER_VALIDATE_BOOLEAN);
        }

        $validator = Validator::make($requestData, [
            'title' => 'required|string|max:255',
            'title_my' => 'nullable|string|max:255',
            'title_ja' => 'nullable|string|max:255',
            'short_description' => 'required|string',
            'short_description_my' => 'nullable|string',
            'short_description_ja' => 'nullable|string',
            'content' => 'required|string',
            'content_my' => 'nullable|string',
            'content_ja' => 'nullable|string',
            'author' => 'required|string|max:255',
            'author_my' => 'nullable|string|max:255',
            'author_ja' => 'nullable|string|max:255',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_published' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except('thumbnail');

        // Convert is_published to boolean
        if (isset($data['is_published'])) {
            $data['is_published'] = filter_var($data['is_published'], FILTER_VALIDATE_BOOLEAN);
        }

        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('blog-thumbnails', $fileName, 'public');
            $data['thumbnail'] = $filePath;
        }

        if (!empty($data['is_published']) && !isset($data['published_at'])) {
            $data['published_at'] = now();
        }

        $post = BlogPost::create($data);

        return response()->json($post, 201);
    }

    public function show($id)
    {
        $post = BlogPost::findOrFail($id);
        return response()->json($post);
    }

    public function update(Request $request, $id)
    {
        $post = BlogPost::findOrFail($id);

        // Convert string 'true'/'false' to boolean for FormData
        $requestData = $request->all();
        if (isset($requestData['is_published'])) {
            $requestData['is_published'] = filter_var($requestData['is_published'], FILTER_VALIDATE_BOOLEAN);
        }

        $validator = Validator::make($requestData, [
            'title' => 'required|string|max:255',
            'title_my' => 'nullable|string|max:255',
            'title_ja' => 'nullable|string|max:255',
            'short_description' => 'required|string',
            'short_description_my' => 'nullable|string',
            'short_description_ja' => 'nullable|string',
            'content' => 'required|string',
            'content_my' => 'nullable|string',
            'content_ja' => 'nullable|string',
            'author' => 'required|string|max:255',
            'author_my' => 'nullable|string|max:255',
            'author_ja' => 'nullable|string|max:255',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_published' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except('thumbnail', '_method');

        // Convert is_published to boolean
        if (isset($data['is_published'])) {
            $data['is_published'] = filter_var($data['is_published'], FILTER_VALIDATE_BOOLEAN);
        }

        if ($request->hasFile('thumbnail')) {
            // Delete old thumbnail
            if ($post->thumbnail && Storage::disk('public')->exists($post->thumbnail)) {
                Storage::disk('public')->delete($post->thumbnail);
            }

            $file = $request->file('thumbnail');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('blog-thumbnails', $fileName, 'public');
            $data['thumbnail'] = $filePath;
        }

        // Set published_at when publishing for the first time
        if (!empty($data['is_published']) && !$post->published_at) {
            $data['published_at'] = now();
        }

        $post->update($data);

        return response()->json($post);
    }

    public function destroy($id)
    {
        $post = BlogPost::findOrFail($id);

        // Delete thumbnail from storage
        if ($post->thumbnail && Storage::disk('public')->exists($post->thumbnail)) {
            Storage::disk('public')->delete($post->thumbnail);
        }

        $post->delete();

        return response()->json(['message' => 'Blog post deleted successfully']);
    }
}
