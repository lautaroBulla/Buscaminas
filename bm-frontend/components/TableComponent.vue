<script setup>
  defineProps({
    games: {
      type: Array,
      required: true
    }
  });
</script>

<template>
  
  <table v-if="games.length > 0" class="table w-full border-collapse table-fixed">
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
    <tbody>
      <tr v-for="(game, index) in games" :key="game.id">
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

  <p v-if="games.length === 0" class="text-center">{{ $t('ranking.noGames') }}</p>
</template>