<template>
  <Teleport to="#main">
    <Transition>
      <div v-if="showModal" class="modal-overlay">
        <Transition name="pop" appear>
          <div
            class="modal bg-veryDarkBlue"
            ref="modalRef"
            role="dialog"
          >
            <button @click="showModal = false" class="absolute top-3 right-3">
              <ph-x :size="28" color="#e01f1f" />
            </button>
            <!-- <button @click="closeModal" class="absolute top-3 right-3">
              <ph-x :size="28" color="#e01f1f" />
            </button> -->
            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
  
  <script setup>
import { ref, onUpdated, defineProps, defineEmits } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps(["show"]);
const emits = defineEmits(["update:show"]);

const showModal = ref(false);
const modalRef = ref(null);

onUpdated(() => {
  showModal.value = props.show;
});

// const closeModal = () => {
//   emits("update:show", false);
// };

onClickOutside(modalRef, () => { showModal.value = false });
</script>
  
  <style scoped>
.modal-overlay {
  position: fixed;
  backdrop-filter: blur(1px);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(79, 79, 90, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  position: relative;
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  overflow: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
</style>
  

<!-- 
<template>
  <teleport to="#main">
    <transition name="fade" mode="out-in">
      <div class="modal-overlay" v-if="showModal" @click="closeModal"></div>
    </transition>
    <transition name="pop">
      <div class="modal" v-if="showModal" ref="modalRef">
        <button @click="closeModal" class="absolute top-3 right-3">
          <ph-x :size="28" color="#e01f1f" />
        </button>
        <slot />
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps(["show"]);
const emits = defineEmits(["update:show"]);

const showModal = ref(props.show);
const modalRef = ref(null);

watch(() => props.show, (newValue) => {
  showModal.value = newValue;
});

const closeModal = () => {
  emits("update:show", false);
};

onClickOutside(modalRef, () => {
  closeModal();
});
</script>

<style>
.modal {
  width: 400px;
  width: full;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  overflow: auto;
  text-align: left;
}
.modal h1 {
  margin: 0 0 1rem;
}

.modal-overlay {
  content: "";
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  background: #2c3e50;
  opacity: 0.6;
  cursor: pointer;
}

/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
</style> -->