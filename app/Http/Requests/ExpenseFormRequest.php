<?php

namespace App\Http\Requests;

use App\Rules\CategoryOwned;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @property mixed name
 */
class ExpenseFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'comment' => 'nullable|string|max:500',
            'cost' => 'required|integer|min:0|max:999999',
            'category_id' => ['required', new CategoryOwned(), 'integer'],
            'expensed_at' => 'required|date',
        ];
    }
}
