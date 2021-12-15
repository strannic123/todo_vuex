import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todo: [],
    filter: 'all'
  },
  getters: {
    getTodo: state => state.todo,
    getTodoLength: state => state.todo.length,
    getTodoNoCompleted: state => state.todo.filter(elem => !elem.completed).length,
    getFilterTodo: state => {
      if (state.filter === 'all') {
        return state.todo
      } else if (state.filter === 'active') {
        return state.todo.filter(elem => !elem.completed)
      }else if (state.filter === 'completed') {
        return state.todo.filter(elem => elem.completed)
      }
    },
    getCheckCompleted: state => state.todo.find(elem => {
      if (elem.completed) {
        return true
      }
    })
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
    },
    UPDATE_FILTER (state, filter) {
      state.filter = filter
    },
    DEL_ELEM_TODO_DONE(state) {
      state.todo = state.todo.filter(el => !el.completed)
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
    },
    updateFilter ({commit}, filter) {
      commit('UPDATE_FILTER', filter)
    },
    delElemTodoDone ({ commit}) {
        commit('DEL_ELEM_TODO_DONE')
    }
  },
  modules: {
  }
})
