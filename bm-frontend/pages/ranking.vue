<script setup>
  import { ref, onMounted } from 'vue';

  onMounted(async () => {
    await changeDifficulty();
    await getGame();
  });

  const { isMobile } = useIsMobile();

  const { findByDifficulty } = useGame();
  const rows = ref(9);
  const cols = ref(9);
  const mines = ref(10);
  const page = ref(1);
  const games = ref([]);
  const totalPages = ref(null);

  const setCustomValues = async ({ rows: customRows, cols: customCols, mines: customMines }) => {
    page.value = 1;
    totalPages.value = null;
    rows.value = customRows;
    cols.value = customCols;
    mines.value = customMines;
    await changeDifficulty();
  }

  const changePage = async (newPage) => {
    page.value = newPage;
    await changeDifficulty();
  }


  const changeDifficulty = async () => {
    try {
      const response = await findByDifficulty(rows.value, cols.value, mines.value, page.value, 10)
      games.value = response.games;
      totalPages.value = response.totalPages;
      await getGame();
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
    <div class="w-full flex flex-col max-w-5xl p-4 space-y-5 md:space-y-3">  

      <TableHeaderComponent 
        @change="setCustomValues"
      />

      <div class="border-b-2 border-[#adb5bd]"></div>

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