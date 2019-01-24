<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryFormRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    private const STATUS_SUCCESS = 'success';
    private const STATUS_ERROR = 'error';

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(Category::query()->latest('id')->get());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy($id)
    {
        $category = Category::query()->whereId($id)->first();

        if (!$category) {
            return response()->json([
                'status' => self::STATUS_ERROR,
                'message' => __('app.category_not_found')
            ]);
        }

        $category->delete();

        return response()->json([
            'status' => self::STATUS_SUCCESS,
            'message' => __('app.deleting_category_success', ['category' => $category->name])
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id)
    {
        $category = Category::query()->whereId($id)->first();

        if (!$category) {
            return response()->json([
                'status' => self::STATUS_ERROR,
                'message' => __('app.category_not_found')
            ]);
        }

        return response()->json($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param CategoryFormRequest $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(CategoryFormRequest $request, $id)
    {
        $category = Category::query()->whereId($id)->first();

        if (!$category) {
            abort(404, __('app.category_not_found'));
        }

        $category->fill($request->all());

        if (!$category->save()) {
            return response()->json([
                'status' => self::STATUS_ERROR,
                'message' => __('app.update_category_error', ['content' => $category->name])
            ]);
        }

        return response()->json([
            'status' => self::STATUS_SUCCESS,
            'message' => __('app.update_category_success', ['content' => $category->name])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CategoryFormRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CategoryFormRequest $request)
    {
        $category = Category::create($request->all());

        return response()->json(['success' => true, 'category' => $category->toArray()]);
    }
}
