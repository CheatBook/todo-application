<template>
  <div id="app" class="body-format">
    <header>
      <router-link
        class="btn btn-outline-info btn-lg"
        active-class="list-active"
        exact
        to="/todo-edit"
        >追加</router-link
      >
      <router-link
        class="btn btn-outline-info btn-lg"
        active-class="list-active"
        exact
        to="/todo-list"
        >参照</router-link
      >
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.body-format {
  font-family: "arial black";
  color: rgb(106, 51, 0);
  line-height: 25px;
  font-size: 1.05em;
  width: 80%;
  margin: 0 auto;
}

header {
  padding: 30px 0;
}

.btn {
  box-shadow: 5px 5px 5px #c96213, -5px -5px 5px #e6e0e0;
  width: 100px;
  margin: 10px 5px;
  padding: 10px 5px;
  text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.44), 1px 1px 1px #4a0a11;
}

.list-active {
  box-shadow: inset -5px 5px 10px #c96213, inset 5px -5px 10px #ffffff;
}

.btn-outline-success:active {
  box-shadow: inset -5px 5px 10px #c96213, inset 5px -5px 10px #ffffff;
}
</style>
