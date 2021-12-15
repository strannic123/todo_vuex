import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todo: []
  },
  getters: {
    getTodo: state => state.todo,
    getTodoLength: state => state.todo.length,
    getTodoNoCompleted: state => state.todo.filter(elem => elem.completed === false).length
  },
  mutations: {
    ADD_TODO_ITEM(state, payload) {
      state.todo.push(payload)
    },
    EDIT_CHANGE(state, index) {
      state.todo[index].edit = !state.todo[index].edit
    },
    TODO_DONE (state, index) {
      state.todo[index].completed = !state.todo[index].completed
    }
  },
  actions: {
    addTodoItem({commit}, payload) {
      commit('ADD_TODO_ITEM', payload)
    },
    // подумать нужно ли ?
    editChange ({commit}, index) {
      commit('EDIT_CHANGE', index)
    },
    todoDone ({commit}, index) {
      commit('TODO_DONE', index)
    }
  },
  modules: {
  }
})
