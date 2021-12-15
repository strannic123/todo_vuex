import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todo: []
  },
  getters: {
    getTodo: state => state.todo,
    getTodoLength: state => state.todo.length
  },
  mutations: {
    ADD_TODO_ITEM(state, payload) {
      state.todo.push(payload)
    },
    EDIT_CHANGE(state, index) {
      state.todo[index].edit = !state.todo[index].edit
    }
  },
  actions: {
    addTodoItem({commit}, payload) {
      commit('ADD_TODO_ITEM', payload)
    },
    editChange ({commit}, index) {
      commit('EDIT_CHANGE', index)
    }
  },
  modules: {
  }
})
