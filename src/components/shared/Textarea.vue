<template>
    <div class="mb-4">
      <label :for="id" class="block text-sm font-medium text-paleBlue">{{ label }}</label>
      <textarea
        :id="id"
        :placeholder="placeholder"
        :value="value"
        @input="handleInput"
        @blur="validateField"
        class="mt-1 p-2 border rounded-md w-full text-paleBlue bg-darkBlue border-darkBlue sm:h-28 h-20 px-4 py-2 block resize-none scrollbar-none"
      ></textarea>
      <span v-if="!isValid && inputBlurred" class="text-red-500 text-xs">{{ errorMessage }}</span>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, defineProps, defineEmits } from "vue";
  
  const props = defineProps({
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      required: true,
    },
  });
  
  const emit = defineEmits(["update:value"]);
  
  const inputBlurred = ref(false);
  
  const handleInput = (event) => {
    emit("update:value", event.target.value);
  };
  
  const validateField = () => {
    inputBlurred.value = true;
  };
  
  const isValid = computed(() => {
    const inputValue = props.value;
    return typeof inputValue === 'string' && inputValue.trim() !== '';
  });
  
  const errorMessage = computed(() => {
    const isInvalid = !isValid.value;
    return isInvalid && inputBlurred.value ? `${props.label} is required` : '';
  });
  </script>
  