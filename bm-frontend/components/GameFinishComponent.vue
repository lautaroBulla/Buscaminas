<script setup>
  const props = defineProps({
    seconds: {
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
    <div class="border-external
                w-full m-1
                md:w-8/12 md:m-0
                lg:w-6/12
                xl:w-3/12"
      >
      <div class="border">
        <div class="border-internal p-2 flex flex-col gap-y-5">

          <h2 class="flex justify-center text-3xl text-color underline">
            {{ $t('finishGames.win') }}
          </h2>

          <div class="grid grid-rows-4 gap-2 text-color text-2xl">
            <div class="flex flex-row justify-between items-center px-32">
              <p>Tiempo:</p>
              <p>{{ formattedTime }}s</p>
            </div>
            <div class="flex flex-row justify-between items-center px-32">
              <p>Ayudas:</p>
              <p>{{ countHelp }}</p>
            </div>
            <div class="flex flex-row justify-between items-center px-32">
              <p>3BV:</p>
              <p>{{ click3BV }}</p>
            </div>
            <div class="flex flex-row justify-between items-center px-32">
              <p>Clicks:</p>
              <p>{{ countClicks }}</p>
            </div>
            <div class="flex flex-row justify-between items-center px-32">
              <p>Eficiencia:</p>
              <p>{{ Math.round((click3BV * 100) / countClicks) }}%</p>            
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