<template>
  <div>
    <div class="row">
      <div class="col-2 list-format">
        <label class="font-weight-bold" for="taskName"> タスク名： </label>
      </div>
      <div class="col-7 list-format">
        <input
          class="form-control"
          type="text"
          id="taskName"
          v-model="taskName"
        />
      </div>
      <div class="col-3"></div>

      <div class="col-2 list-format">
        <label class="font-weight-bold" for="priority"> 優先度： </label>
      </div>
      <div class="col-4 list-format">
        <vue-dropdown
          class="dropdown"
          active-class="dropdown"
          :config="priorityConfig"
          @setSelectedOption="setPriorityDropdownNewSelectedOption($event)"
        ></vue-dropdown>
      </div>
      <div class="col-6"></div>

      <div class="col-2 list-format">
        <label class="font-weight-bold" for="workingStartPlanTime">
          開始予定：
        </label>
      </div>
      <div class="col-4 list-format">
        <input
          class="form-control"
          type="datetime-local"
          id="workingStartPlanTime"
          v-model="workingStartPlanTime"
        />
      </div>
      <div class="col-6"></div>

      <div class="col-2 list-format">
        <label class="font-weight-bold" for="workingCompletePlanTime">
          完了予定：
        </label>
      </div>
      <div class="col-4 list-format">
        <input
          class="form-control"
          type="datetime-local"
          id="workingCompletePlanTime"
          v-model="workingCompletePlanTime"
        />
      </div>
      <div class="col-6"></div>

      <div class="col-9"></div>
      <div class="col-3">
        <button
          v-shortkey.once="['ctrl', 'enter']"
          class="btn btn-outline-success btn-lg"
          @shortkey="addTodoData"
          @click="addTodoData"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueDropdown from "vue-dynamic-dropdown";
import moment from "moment";

let deteTimeFormat = "";
let addTime = 0;
if (moment().format("mm") <= "15") {
  deteTimeFormat = "YYYY-MM-DDTHH:15";
} else if (moment().format("mm") <= "30") {
  deteTimeFormat = "YYYY-MM-DDTHH:30";
} else if (moment().format("mm") <= "45") {
  deteTimeFormat = "YYYY-MM-DDTHH:45";
} else {
  addTime = 1;
  deteTimeFormat = "YYYY-MM-DDTHH:00";
}
let currentJustGoodTime = moment().add(addTime, "hour").format(deteTimeFormat);
let currentJustGoodTimeAdd2Hours = moment()
  .add(addTime + 2, "hour")
  .format(deteTimeFormat);

export default {
  data() {
    return {
      taskName: "",
      priority: 3,
      priorityConfig: {
        options: [
          { value: "1" },
          { value: "2" },
          { value: "3" },
          { value: "4" },
          { value: "5" },
        ],
        placeholder: "3",
        textColor: "rgb(63, 32, 0)",
        "font-family": "arial black",
        width: 80,
      },
      workingStartPlanTime: currentJustGoodTime,
      workingCompletePlanTime: currentJustGoodTimeAdd2Hours,
    };
  },
  components: {
    VueDropdown,
  },
  methods: {
    addTodoData: function () {
      axios
        .post("http://localhost:8081/todo/registration", {
          taskName: this.taskName,
          priority: this.priority,
          workingStartPlanTime: this.workingStartPlanTime,
          workingCompletePlanTime: this.workingCompletePlanTime,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.taskName = "";
    },
    setPriorityDropdownNewSelectedOption(selectedOption) {
      this.priorityConfig.placeholder = selectedOption.value;
      this.priority = selectedOption.value;
    },
  },
};
</script>

<style scoped>
.form-control {
  background: #fff5ee;
  box-shadow: inset -5px 5px 10px #66625f, inset 5px -5px 10px #ffffff;
  margin: 10px 0;
}

.form-control:focus {
  background: #fff5ee;
  box-shadow: inset -5px 5px 10px #66625f, inset 5px -5px 10px #ffffff;
}

.dropdown {
  background: #fff5ee;
  box-shadow: inset -5px 5px 5px #66625f, inset 5px -5px 5px #ffffff;
  margin: 10px 0;
}

.list-format {
  display: flex;
  align-items: center;
}
</style>
