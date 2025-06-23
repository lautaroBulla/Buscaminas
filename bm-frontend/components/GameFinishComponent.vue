<script setup>
  const props = defineProps({
    seconds: {
      type: Number,
      required: true
    },
    bestTime: {
      type: Number,
      required: true
    },
    countHelp: {
      type: Number,
      required: true
    },
    click3BV: {
      type: Number,
      required: true
    },
    countClicks: {
      type: Number,
      required: true
    }
  });

  const formattedTime = computed(() => {
    const secs = Math.floor(props.seconds / 1000);
    const ms = (props.seconds % 1000).toString().padStart(3, '0');
    return `${secs}.${ms}`;
  });
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div class="border-external m-1"
      >
      <div class="border">
        <div class="border-internal p-5 flex flex-col gap-y-5 text-color">

          <h2 class="flex justify-center text-3xl underline text-color">
            {{ $t('finishGames.win') }}
          </h2>

          <div class="md:text-2xl mt-4">
            <div class="flex justify-between w-full px-2">
              <span>Tiempo:</span>
              <span>{{ formattedTime }}s</span>
            </div>
            <div class="flex justify-between w-full px-2" v-if="bestTime && formattedTime > bestTime">
              <span>Mejor tiempo:</span>
              <span>{{ bestTime }}s</span>
            </div>
            <div class="flex justify-between w-full px-2" v-else>
              <span>Nuevo mejor tiempo:</span>
              <span>{{ formattedTime }}s</span>
            </div>
          </div>

          <!-- Divider opcional -->
          <hr class="my-4 border-color opacity-50" />

          <!-- Bloque: Estadísticas -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-y-2 text-lg md:text-xl">
            <div class="flex flex-row space-x-1 px-2">
              <span>Ayudas:</span>
              <span>{{ countHelp }}</span>
            </div>
            <div class="flex flex-row space-x-1 px-2">
              <span>3BV:</span>
              <span>{{ click3BV }}</span>
            </div>
            <div class="flex flex-row space-x-1 px-2">
              <span>Clicks:</span>
              <span>{{ countClicks }}</span>
            </div>
            <div class="flex flex-row space-x-1 px-2">
              <span>Eficiencia:</span>
              <span>{{ Math.round((click3BV * 100) / countClicks) }}%</span>
            </div>
          </div>

          <div class="flex justify-center mt-2">
            <div class="button-border">
              <button 
                @click="$emit('close')"
                class="button px-2 py-1 h-[30px]
                      md:h-[35px]
                      lg:h-[40px]"
              >
                {{ $t('finishGames.continue') }}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>