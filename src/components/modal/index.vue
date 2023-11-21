<template>
  <teleport to="#main">
    <transition name="modal" mode="out-in" appear>
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-container bg-veryDarkBlue relative" ref="modalRef">
          <button @click="closeModal" class="absolute top-3 right-3">
            <ph-x :size="28" color="#e01f1f" />
          </button>
          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>
  
  <script setup>
import { ref, onUpdated, defineProps, defineEmits } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps(["show"]);
const emits = defineEmits(["update:show"]);

const showModal = ref(props.show);
const modalRef = ref(null);

onUpdated(() => {
  showModal.value = props.show;
});

const closeModal = () => {
  emits("update:show", false);
};

onClickOutside(modalRef, () => {
  closeModal();
});
</script>
  
  <style scoped>
.modal-overlay {
  position: fixed;
  backdrop-filter: blur(1px);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(79, 79, 90, 0.271);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-container {
  width: 450px;
  width: full;
  margin: 16px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(29, 73, 116, 0.2);
  overflow: auto;
}


.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
  