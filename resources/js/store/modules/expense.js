import axios from 'axios'
import * as types from '../mutation-types'

// state
export const state = {
    expenses: null,
    categoryOptions: [],
};

// getters
export const getters = {
    expenses: state => state.expenses,
    categoryOptions: state => {
        return state.categoryOptions.map(val => {
            return {
                label: val.name.toString(),
                value: val.id.toString(),
            }
        });
    },
};

// mutations
export const mutations = {
    [types.FETCH_EXPENSE_SUCCESS](state, {expenses}) {
        state.expenses = expenses;
    },

    [types.FETCH_EXPENSE_FAILURE](state) {
        console.error('fail!');
    },

    [types.GET_CATEGORY_OPTIONS](state, {categoryOptions}) {
        state.categoryOptions = categoryOptions
    }
};

// actions
export const actions = {
    async fetchExpenses({commit}, payload) {
        try {
            const {data} = await axios.get('/api/expenses');

            commit(types.FETCH_EXPENSE_SUCCESS, {categories: data});

            return data;
        } catch (e) {
            commit(types.FETCH_EXPENSE_FAILURE)
        }
    },
    async fetchAnalysisExpenses({commit}, payload) {
        try {
            let dateRange = '';

            if (typeof payload !== 'undefined') {
                dateRange = payload.dateRange;
            }

            let configWithParams = {
                params: {
                    dateRange: dateRange,
                }
            };

            const {data} = await axios.get('/api/expenses/report', configWithParams);

            commit(types.FETCH_EXPENSE_SUCCESS, {categories: data});

            return data;
        } catch (e) {
            commit(types.FETCH_EXPENSE_FAILURE)
        }
    },
    async fetchExpenseUpdateData({commit}, payload) {
        try {
            return await axios.get('/api/expenses/' + payload.id + '/edit');
        } catch (e) {
            console.log(e)
        }
    },
    async deleteExpense({commit}, payload) {
        try {
            return await axios.delete('/api/expenses/' + payload.id);
        } catch (e) {
            console.log(e)
        }
    },
    async fetchCategoryOptions({commit}, payload) {
        try {
            const {data} = await axios.get('/api/expenses/create');
            commit(types.GET_CATEGORY_OPTIONS, {categoryOptions: data});
        } catch (e) {
            console.log(e);
        }
    },
};
