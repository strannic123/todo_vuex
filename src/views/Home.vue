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
      <div class="todo-list" v-for="todo in storeTodo" :key="todo.id">
        <div
            class="todo-item"
            @dblclick="editTodo(todo)"
            v-if="!todo.edit"
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
    storeTodo() {
      return this.$store.state.todo
    }
  },
  methods: {
    addItem() {
      this.$store.dispatch('addTodoItem', {
        id: ++this.todoID ,
        text: this.todoInput,
        completed: false,
        edit: false
      })
      this.todoInput = ''
    },
    editTodo (todo) {
      todo.edit = true
    },
    editDone (todo) {
      todo.edit = false
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
  width: 350px;
}
.input-add,
.input-edit {
  width: 100%;
  padding: 0;
}
.todo-list {
  border: 1px solid darkgray;
}
</style>
