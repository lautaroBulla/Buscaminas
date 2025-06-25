<script setup>
  const props = defineProps({
    seconds: {
      type: Number,
      required: true
    },
    bestTime: {
      type: Number,
      required: false
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

  const { user } = useAuth();

  const formattedTime = computed(() => {
    const secs = Math.floor(props.seconds / 1000);
    const ms = (props.seconds % 1000).toString().padStart(3, '0');
    return `${secs}.${ms}`;
  });
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div class="border-external mx-2 w-full max-w-xl"
      >
      <div class="border">
        <div class="border-internal p-5 flex flex-col gap-y-5 text-color">

          <h2 class="flex justify-center text-3xl underline text-color">
            {{ $t('finishGame.win') }}
          </h2>

          <div class="text-xl 
                      md:text-2xl"
          >
            <div class="flex justify-between w-full px-2">
              <span>{{ $t('finishGame.time') }}:</span>
              <span>{{ formattedTime }}s</span>
            </div>
            <div class="flex justify-between w-full px-2 text-[#339966] underline" v-if="bestTime && formattedTime > bestTime && user !== null">
              <span>{{ $t('finishGame.bestTime') }}:</span>
              <span>{{ bestTime }}s</span>
            </div>
            <div class="flex justify-between w-full px-2 text-[#339966] underline" v-else-if="user !== null">
              <span>{{ $t('finishGame.newBestTime') }}:</span>
              <span>{{ formattedTime }}s</span>
            </div>
          </div>

          <div class="modal-separator-line"></div>

          <div class="grid gap-y-2
                      grid-cols-2 text-lg
                      md:grid-cols-4 md:text-xl">
            <div class="flex flex-row space-x-1 px-2">
              <span :title="$t('finishGame.helpTitle')">{{ $t('finishGame.help') }}:</span>
              <span>{{ countHelp }}</span>
            </div>
            <div class="flex flex-row space-x-1 px-2">
              <span :title="$t('finishGame.3bvTitle')">{{ $t('finishGame.3bv') }}:</span>
              <span>{{ click3BV }}</span>
            </div>
            <div class="flex flex-row space-x-1 px-2">
              <span :title="$t('finishGame.clicksTitle')">{{ $t('finishGame.clicks') }}:</span>
              <span>{{ countClicks }}</span>
            </div>
            <div class="flex flex-row space-x-1 px-2">
              <span :title="$t('finishGame.efficiencyTitle')">{{ $t('finishGame.efficiency') }}:</span>
              <span>{{ Math.round((click3BV * 100) / countClicks) }}%</span>
            </div>
          </div>

          <div v-if="user === null" class="modal-separator-line"></div>

          <div v-if="user === null" class="flex justify-start">
            <p>
              {{ $t('finishGame.noAuth') }}
            </p>
          </div>

          <div class="flex justify-center">
            <div class="button-border">
              <button 
                @click="$emit('close')"
                class="button px-2 py-1 h-[30px]
                      md:h-[35px]
                      lg:h-[40px]"
              >
                {{ $t('finishGame.continue') }}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>