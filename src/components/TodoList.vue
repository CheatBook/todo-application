<template>
  <div>
    <div v-if="results.length">
      <div class="row">
        <div class="col-3 border list-title">タスク名</div>
        <div class="col-1 border list-title">優先度</div>
        <div class="col-2 border list-title">開始予定</div>
        <div class="col-2 border list-title">完了予定</div>
        <div class="col-4"></div>
      </div>
    </div>
    <h1 v-else>データがありません。</h1>
    <div class="row" v-for="todoInfo in results" :key="todoInfo.taskId">
      <div class="col-3 border">
        <div>{{ todoInfo.taskName }}</div>
      </div>
      <div class="col-1 border">
        <div>{{ todoInfo.priority }}</div>
      </div>
      <div class="col-2 border">
        <time>{{ dateFormat(todoInfo.workingStartPlanTime) }}</time>
      </div>
      <div class="col-2 border">
        <time>{{ dateFormat(todoInfo.workingCompletePlanTime) }}</time>
      </div>
      <div class="col-4">
        <button
          class="btn btn-outline-success btn-lg"
          @click="editTodoListData(todoInfo.taskId, todoInfo.taskName)"
        >
          Edit
        </button>
        <button
          class="btn btn-outline-danger btn-lg"
          @click="deleteTodoListData(todoInfo.taskId, todoInfo.taskName)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      message: "",
      results: [],
    };
  },
  created() {
    this.showTodoListData();
  },
  methods: {
    showTodoListData: function () {
      axios
        .get("http://localhost:8081/todo/list/")
        .then((response) => {
          this.results = response.data;
          this.rows = response.data;
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteTodoListData: function (taskId, taskName) {
      axios
        .delete(`http://localhost:8081/todo/${taskId}`)
        .then(() => {
          this.message = `タスク【${taskName}】を削除しました`;
          this.showTodoListData();
        })
        .catch(() => {
          this.message = `タスク【${taskName}】の削除に失敗しました`;
        });
    },
    dateFormat: (dateTimeStr) => {
      if (!dateTimeStr) return "";
      return moment(dateTimeStr).format("YYYY年MM月DD日 HH時mm分");
    },
  },
};
</script>

<style scoped>
.list-title {
  text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.44), 1px 1px 1px #4a0a11;
}
</style>