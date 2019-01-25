<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExpenseFormRequest;
use App\Models\Category;
use App\Models\Expense;
use Carbon\Carbon;

class ExpenseController extends Controller
{
    private const STATUS_SUCCESS = 'success';
    private const STATUS_ERROR = 'error';

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $expenses = Expense::query()->with('category')->latest('id');

        return response()->json($expenses->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return response()->json(Category::latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ExpenseFormRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(ExpenseFormRequest $request)
    {
        $expense = Expense::create($request->all());

        return response()->json(['success' => true, 'expense' => $expense->toArray()]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $expense = Expense::query()->whereId($id)->first();

        if (!$expense) {
            return response()->json([
                'status' => self::STATUS_ERROR,
                'message' => __('app.expense_not_found')
            ]);
        }

        return response()->json($expense);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ExpenseFormRequest $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(ExpenseFormRequest $request, $id)
    {
        $expense = Expense::query()->whereId($id)->first();

        $expensedAt = Carbon::parse($request->expensed_at)->setTimezone(config('app.timezone'));

        if (!$expense) {
            abort(404, __('app.expense_not_found'));
        }

        $expense->fill($request->all());
        $expense->expensed_at = $expensedAt->format('Y-m-d H:i');

        if (!$expense->save()) {
            return response()->json([
                'status' => self::STATUS_ERROR,
                'message' => __('app.update_expense_error', ['content' => $expense->name])
            ]);
        }

        return response()->json([
            'status' => self::STATUS_SUCCESS,
            'message' => __('app.update_expense_success', ['content' => $expense->name])
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $expense = Expense::query()->whereId($id)->first();

        if (!$expense) {
            return response()->json([
                'status' => self::STATUS_ERROR,
                'message' => __('app.expense_not_found')
            ]);
        }

        $expense->delete();

        return response()->json([
            'status' => self::STATUS_SUCCESS,
            'message' => __('app.deleting_expense_success', ['expense' => $expense->name])
        ]);
    }
}
