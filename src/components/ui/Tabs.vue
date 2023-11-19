<template>
  <div class="container mb-6">
    <div class="tabs">
      <input type="radio" id="radio-1" name="tabs" @change="filter('all')">
      <label class="tab" for="radio-1">All</label>
      <input type="radio" id="radio-2" name="tabs" @change="filter('income')">
      <label class="tab px-3" for="radio-2">Income</label>
      <input type="radio" id="radio-3" name="tabs" @change="filter('expense')">
      <label class="tab" for="radio-3">Expense</label>
      <span class="glider"></span>
    </div>
  </div>
</template>
  
<script setup>
import { ref, defineProps } from "vue";
  
const activeTab = ref('all');
  
const props = defineProps({
  filterTransactions: {
    type: Function,
    required: true,
  },
});
  
const filter = (tab) => {
  activeTab.value = tab;
  props.filterTransactions(tab);
};
</script>

<style>
.tabs {
  display: flex;
  position: relative;
  border-bottom: 1px solid var(--grayBlue);;
  /* opacity: 0.5; */
}

.tabs * {
  z-index: 2;
}

.container input[type="radio"] {
  display: none;
}

.tab {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 80px;
  border-radius: 10px;
  cursor: pointer;
  transition: color 0.15s ease-in;
}


.container input[id="radio-1"]:checked ~ .glider {
  transform: translateX(0);
}

.container input[id="radio-2"]:checked ~ .glider {
  transform: translateX(100%);
}

.container input[id="radio-3"]:checked ~ .glider {
  transform: translateX(200%);
}

.glider {
  position: absolute;
  display: flex;
  height: 35px;
  width: 80px;
  background: var(--darkBlue);
  z-index: 1;
  transition: 0.25s ease-out;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}

</style>
  