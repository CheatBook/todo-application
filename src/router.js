import Vue from "vue";
import Router from "vue-router";
import TodoList from "./components/TodoList";
import TodoEdit from "./components/TodoEdit";

Vue.use(Router);
Vue.use(require("vue-shortkey"));

export default new Router({
  mode: "history",
  routes: [
    { path: "/todo-edit", component: TodoEdit },
    { path: "/todo-list", component: TodoList },
    { path: "*", redirect: "/todo-list" },
  ],
});
