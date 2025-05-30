<script setup>
  import { ref } from 'vue';
  const props = defineProps({
    firstClickZero: {
      type: Boolean,
      required: true
    },
    interrogationsActivated: {
      type: Boolean,
      required: true
    }
  });

  const localFirstClickZero = ref(props.firstClickZero);
  const localInterrogationsActivated = ref(props.interrogationsActivated);

  const emit = defineEmits(['update', 'close']);

  function updateSettings () {
    emit('update', {
      firstClickZero: localFirstClickZero.value,
      interrogationsActivated: localInterrogationsActivated.value
    });
  }
</script>

<template>
  <div class="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
    <div class="bg-black w-1/3 border-2 border-gray-500 p-5">
      <div class="flex justify-end">
        <button
          @click="emit('close')"
        >
          {{ $t('gameSettings.close') }}
        </button>
      </div>
      <div class="flex flex-col">
        <div class="flex flex-row gap-x-2">
          <label> {{ $t('gameSettings.firstClick') }} </label>
          <input type="checkbox" v-model="localFirstClickZero">
        </div>
        <div class="flex flex-row gap-x-2">
          <label> {{ $t('gameSettings.interrogations') }} </label>
          <input type="checkbox" v-model="localInterrogationsActivated">
        </div>
      </div>
      <div class="flex justify-center">
        <button 
          @click="updateSettings"
          class="border w-fit"
        >
          {{ $t('gameSettings.update') }}
        </button>
      </div>
    </div>
  </div>
</template>