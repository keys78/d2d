<template>
  <div class="flex items-center justify-between">
    <div>&nbsp;</div>
    <div
      class="border rounded-md w-full text-paleBlue bg-darkBlue border-darkBlue flex items-center space-x-2 mb-5 max-w-[250px]">
      <span class="pl-3 pt-1"><ph-magnifying-glass :size="20" color="#828FA3" /></span>
      <input type="search" @input="handleInputChange" placeholder="Search by title" :value="searchTerm"
        class="w-full h-full mt-1 py-2 text-paleBlue bg-darkBlue outline-none border-0" />
    </div>
  </div>
</template>
  
<script setup>
import { defineProps, defineEmits, ref } from 'vue';


const emit = defineEmits(['updateSearch']);
const searchTerm = ref('');

const handleInputChange = (event) => {
  searchTerm.value = event.target.value;
  emit('updateSearch', searchTerm.value);
};
</script>
  