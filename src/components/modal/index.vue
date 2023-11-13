<!-- <template>
    <teleport to="#main">
      <div v-if="show" class="modal-overlay">
        <div class="modal-container">
          <button @click="show = false" class="close-button">Close</button>
          <slot></slot>
        </div>
      </div>
    </teleport>
  </template>
  
  <script setup>
  import { ref, defineProps } from 'vue';

  const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    }
  })
  
  </script> -->


  <!-- <template>
      <div class="modal-overlay">
        <div class="modal-container">
          <button @click="close" class="close-button">Close</button>
          <slot></slot>
        </div>
      </div>
  </template>
  
  <script setup>

  const emit = defineEmits(['closeModal']);

  const close = () => {
    emit('closeModal')
  }

  </script> -->

  <template>
    <teleport to="#main">
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-container">
          <button @click="closeModal" class="close-button">Close</button>
          <slot></slot>
        </div>
      </div>
    </teleport>
  </template>
  
  <script setup>
  import { ref, onUpdated, defineProps, defineEmits } from 'vue';
  
  const props = defineProps(['show']);
  const emits = defineEmits(['update:show']);
  
  const showModal = ref(props.show);
  
  onUpdated(() => {
    showModal.value = props.show;
  });
  
  const closeModal = () => {
    emits('update:show', false);
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-container {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    max-width: 80%;
    max-height: 80%;
    overflow: auto;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  </style>
  