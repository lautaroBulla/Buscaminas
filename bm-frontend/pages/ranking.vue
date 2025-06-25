<script setup>
  import { ref, onMounted } from 'vue';

  const { findByDifficulty } = useGame();

  const rows = ref(9);
  const cols = ref(9);
  const mines = ref(10);
  const page = ref(1);
  const games = ref([]);

  onMounted(async () => {
    try {
      const response = await findByDifficulty(rows.value, cols.value, mines.value, page.value, 10);
      games.value = response;
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  });

</script>

<template>

  <div class="flex flex-col items-center p-4 space-y-4">
    
    <table class="w-full max-w-3xl border-collapse table-fixed text-center">
      <thead>
        <tr>
          <th class="tableHeader">#</th>
          <th class="tableHeader">{{ $t('ranking.username') }}</th>
          <th class="tableHeader">{{ $t('finishGame.time') }}</th>
          <th class="tableHeader md:hidden">{{ $t('ranking.stats') }}</th>
          <th class="tableHeader hidden md:table-cell">{{ $t('finishGame.3bv') }}</th>
          <th class="tableHeader hidden md:table-cell">{{ $t('finishGame.clicks') }}</th>
          <th class="tableHeader hidden md:table-cell">{{ $t('finishGame.efficiency') }}</th>
          <th class="tableHeader hidden md:table-cell">{{ $t('finishGame.help') }}</th>
          <th class="tableHeader hidden md:table-cell">{{ $t('ranking.date') }}</th>
        </tr>
      </thead>
      <tbody v-for="(game, index) in games" :key="game.id">
        <tr class="">
          <td class="tableCell">{{ index + 1 }}</td>
          <td class="tableCell">{{ game.user.username }}</td>
          <td class="tableCell">{{ game.seconds }}s</td>
          <td class="tableCell md:hidden">ver</td>
          <td class="tableCell hidden md:table-cell">{{ game.n3BV }}</td>
          <td class="tableCell hidden md:table-cell">{{ game.clicks }}</td>
          <td class="tableCell hidden md:table-cell">{{ game.efficiency }}%</td>
          <td class="tableCell hidden md:table-cell">{{ game.help }}</td>
          <td class="tableCell hidden md:table-cell">{{ new Date(game.createdAt).toLocaleDateString() }}</td>
        </tr>
      </tbody>
    </table>

  </div>

</template>