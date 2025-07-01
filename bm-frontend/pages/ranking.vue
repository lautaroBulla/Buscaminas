<script setup>
  import { ref, onMounted } from 'vue';

  const { isMobile } = useIsMobile();

  onMounted(async () => {
    await changeDifficulty();
  });

  const { findByDifficulty, findByDifficultyUser } = useGame();
  const rows = ref(9);
  const cols = ref(9);
  const mines = ref(10);
  const page = ref(1);
  const games = ref([]);
  const totalPages = ref(null);
  const globalRanking = ref(true);
  const orderByTime = ref(true);

  const setDefaultValues = (newPage) => {
    page.value = newPage ? newPage : 1;
    indexGame.value = 0;
    totalPages.value = null;
  }
  const setCustomValues = async ({ rows: customRows, cols: customCols, mines: customMines }) => {
    setDefaultValues();
    rows.value = customRows;
    cols.value = customCols;
    mines.value = customMines;
    await changeDifficulty();
  }
  const changePage = async (newPage) => {
    setDefaultValues(newPage);
    await changeDifficulty();
  }
  const changeRanking = async () => {
    globalRanking.value = !globalRanking.value;
    setDefaultValues();
    await changeDifficulty();
  }
  const changeOrder = async (newOrder) => {
    if (orderByTime.value !== newOrder) {
      orderByTime.value = newOrder;
      await changeDifficulty();
    }
  }

  const changeDifficulty = async () => {
    try {
      let response;
      if (globalRanking.value) {
        response = await findByDifficulty(rows.value, cols.value, mines.value, page.value, 10, orderByTime.value);
      } else {
        response = await findByDifficultyUser(rows.value, cols.value, mines.value, page.value, 10, orderByTime.value);
      }
      games.value = response.games;
      totalPages.value = response.totalPages;
      if (isMobile) {
        await getGame();
      }
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  }
  
  const indexGame = ref(0);
  const game = ref(null);
  const rankingGame = ref(1);
  const handleLookStats = (index) => {
    indexGame.value = index;
    getGame();
  };
  const getGame = () => {
    if (games.value.length > 0) {
      const globalIndex = (page.value - 1) * 10 + 1;
      game.value = games.value[indexGame.value];
      rankingGame.value = globalIndex + indexGame.value;
    } else {
      game.value = null;
      rankingGame.value = null;
    }
  }
</script>

<template>

  <div class="w-full flex justify-center">
    <div class="w-full flex flex-col max-w-5xl p-4 gap-y-2">  

      <TableHeaderComponent 
        :globalRanking="globalRanking"
        :orderByTime="orderByTime"
        @change="setCustomValues"
        @changeRanking="changeRanking"
        @changeOrder="changeOrder"
      />

      <TableComponent 
        :games="games"
        :page="page"
        :totalPages="totalPages"
        @changePage="changePage"
        @lookStats="handleLookStats"
      />

      <StatsComponent
        v-if="isMobile"
        :game="game"
        :rankingGame="rankingGame"
      />
    </div>
  </div>

</template>