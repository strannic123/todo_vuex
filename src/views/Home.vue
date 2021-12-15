<template>
  <div class="container">
   <div class="wrapper wrapper-input">
     <div class="content content-input-add">
       <img :class="{'hide': todoId}" src="../assets/img/arrow-down.png" alt="">
         <input
             class="input-add"
             @keydown.enter="addItem"
             type="text"
             placeholder="What needs to be done ?"
             v-model="todoInput">

     </div>
   </div>

  <div class="wrapper wrapper-todo-list">
    <div class="content content-todo_items">
      <div class="todo-list" v-for="(todo, index) in filterTodo" :key="todo.id">
        <img class="img-check" @click='todoDone(index)' v-if="todo.completed" src="../assets/img/check.png" alt="">
        <img class="img-check" @click='todoDone(index)' v-if="!todo.completed" src="../assets/img/no-check.png" alt="">
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
        <span>{{todoNoCompl}} item left</span>
      </div>
      <div class="center-group">
        <router-link @click.native="filterActive('all')" to='/all' tag="button">All</router-link>
        <router-link @click.native="filterActive('active')" to='/active' tag="button">Active</router-link>
        <router-link @click.native="filterActive('completed')" to='/completed' tag="button">Completed</router-link>
      </div>
      <div class="right-group" >
        <span
            class="right-btn"
            :class="{'hide': !oneCompleted}"
            @click="delTodoCompleted"
            >Clear Completed</span>
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
    },
    delTodoCompleted () {
      this.$store.dispatch('delElemTodoDone')
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

.input-add {
  border: 1px solid #efefef;
  box-sizing: border-box;
  padding-left: 30px;
}

.todo-list {
  display: flex;
  align-items: center;
  padding: 5px 0;
}
.todo-list:not(:last-child) {
  border-bottom: 1px solid #efefef;
}
.todo-item {
  cursor: pointer;
  padding: 5px 10px;
  text-align: left;
}
.done {
  text-decoration: line-through;
}
.nav {
  display: flex;
  justify-content: space-between;
  padding: 10px 5px;
  border: 1px solid #efefef;
  border-top: none;
  box-sizing: border-box;
}
.hide {
  display: none;
}
.right-btn {
  cursor: pointer;
}

.img-check {
  width: 25px;
  height: fit-content;
  padding-left: 7px;
  cursor: pointer;
}

.content-todo_items {
  border: 1px solid #efefef;
}

.center-group {
  display: flex;
  gap: 5px;
}
.center-group button{
  border: none;
  background: #fff;
  cursor: pointer;
  box-sizing: border-box;
}

.center-group button:hover {
  -webkit-box-shadow: 0px 0px 2px 0px rgb(181, 178, 178);
  -moz-box-shadow: 0px 0px 2px 0px rgb(181, 178, 178);
  box-shadow: 0px 0px 2px 0px rgb(181, 178, 178);
}

.router-link-exact-active {
  -webkit-box-shadow: 0px 0px 2px 0px rgb(0, 0, 0);
  -moz-box-shadow: 0px 0px 2px 0px rgb(0, 0, 0);
  box-shadow: 0px 0px 2px 0px rgb(0, 0, 0);
}

.content-input-add {
  position: relative;
}

.content-input-add img {
  position: absolute;
  width: 20px;
  top: 7px;
  left: 7px;
}
</style>
