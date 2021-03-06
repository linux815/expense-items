import axios from 'axios'
import * as types from '../mutation-types'

// state
export const state = {
    categories: null,
};

// getters
export const getters = {
    categories: state => state.categories,
};

// mutations
export const mutations = {
    [types.FETCH_CATEGORY_SUCCESS](state, {categories}) {
        state.categories = categories;
    },

    [types.FETCH_CATEGORY_FAILURE](state) {
        console.error('fail!');
    },
};

// actions
export const actions = {
    async fetchCategories({commit}, payload) {
        try {
            const {data} = await axios.get('/api/categories');

            commit(types.FETCH_CATEGORY_SUCCESS, {categories: data});

            return data;
        } catch (e) {
            commit(types.FETCH_CATEGORY_FAILURE)
        }
    },
    async fetchCategoryUpdateData({commit}, payload) {
        try {
            return await axios.get('/api/categories/' + payload.id + '/edit');
        } catch (e) {
            console.log(e)
        }
    },
    async deleteCategory({commit}, payload) {
        try {
            return await axios.delete('/api/categories/' + payload.id);
        } catch (e) {
            console.log(e)
        }
    },
};
