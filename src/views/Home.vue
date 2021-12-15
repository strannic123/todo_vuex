<template>
  <div class="container">
   <div class="wrapper wrapper-input">
     <div class="content">
       <label >
         <input
             class="input-add"
             @keydown.enter="addItem"
             type="text"
             placeholder="What needs to be done ?"
             v-model="todoInput">
       </label>
     </div>
   </div>

  <div class="wrapper wrapper-todo-list">
    <div class="content">
      <div class="todo-list" v-for="(todo, index) in filterTodo" :key="todo.id">
        <div
            class="todo-item"
            @click="todoDone(index)"
            @dblclick="editTodo(todo)"
            v-if="!todo.edit"
            :class="{done: todo.completed}"

        >
          {{todo.text}}
          {{todo.id}}
        </div>
        <div
            v-else>
          <input
              v-focus
              type="text"
              @blur="editDone(todo)"
              @keydown.enter="editDone(todo)"
              v-model="todo.text"
              class="input-edit">
        </div>
      </div>
    </div>
  </div>
    <div class="wrapper nav">
      <div class="left-group">
        <span>{{todoNoCompl}} Item left</span>
      </div>
      <div class="center-group">
        <router-link @click.native="filterActive('all')" to='/all' tag="button">All</router-link>
        <router-link @click.native="filterActive('active')" to='/active' tag="button">Active</router-link>
        <router-link @click.native="filterActive('completed')" to='/completed' tag="button">Completed</router-link>
      </div>
      <div class="right-group" >
        <span :class="{'hide': !oneCompleted}">Clear Completed</span>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "Home",
  data() {
    return {
      todoInput: '',
      todoID: 0
    }
  },
  computed: {
    todoId() {
      return this.$store.getters['getTodoLength']
    },
    todoNoCompl() {
      return this.$store.getters['getTodoNoCompleted']
    },
    filterTodo () {
      return this.$store.getters['getFilterTodo']
    },
    oneCompleted () {
      const checkTodo =  this.$store.getters['getCheckCompleted']
      if (checkTodo === undefined) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    addItem() {
      if (this.todoInput.trim() != 0) {
        this.$store.dispatch('addTodoItem', {
          id: ++this.todoID ,
          text: this.todoInput,
          completed: false,
          edit: false
        })
        this.todoInput = ''
      } else {
        alert('Нельзя добавлять пустые задачи.')
      }

    },
    editTodo (todo) {
      todo.edit = true
    },
    editDone (todo) {
      todo.edit = false
    },
    todoDone (index) {
      this.$store.dispatch('todoDone', index)
    },
    filterActive (filter) {
       this.$store.dispatch('updateFilter', filter)
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      }
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.wrapper {
  width: 450px;
}
.input-add,
.input-edit {
  width: 100%;
  padding: 7px;

}
.todo-list {
  border: 1px solid darkgray;
}
.todo-item {
  cursor: pointer;
  padding: 5px 10px;
}
.done {
  text-decoration: line-through;
}
.nav {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}
.hide {
  display: none;
}
</style>
