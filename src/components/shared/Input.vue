<template>
    <div class="mb-4">
      <label :for="id" class="block text-sm font-medium text-paleBlue">{{ label }}</label>
      <input
        :type="type"
        :id="id"
        :placeholder="placeholder"
        :value="value"
        @input="handleInput"
        @blur="validateField"
        class="mt-1 p-2 border rounded-md w-full text-paleBlue bg-darkBlue border-darkBlue"
      />
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
    type: [String, Number],
    default: "",
  },
  id: {
    type: String,
    required: true,
  },
  type: {
    type: [String, Number], 
    default: "text",
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
  