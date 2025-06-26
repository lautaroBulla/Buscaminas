<script setup>
  import { ref, onMounted } from 'vue';

  onMounted(async () => {
    changeDifficulty();
  });

  const { findByDifficulty } = useGame();
  const rows = ref(9);
  const cols = ref(9);
  const mines = ref(10);
  const page = ref(1);
  const games = ref([]);
  const totalPages = ref(null);

  const setCustomValues = ({ rows: customRows, cols: customCols, mines: customMines }) => {
    page.value = 1;
    rows.value = customRows;
    cols.value = customCols;
    mines.value = customMines;
    changeDifficulty();
  }

  watch(page, async(newPage) => {
    page.value = newPage;
    changeDifficulty();
  })


  const changeDifficulty = async () => {
    try {
      const response = await findByDifficulty(rows.value, cols.value, mines.value, page.value, 10);
      console.log(response);
      games.value = response.games;
      totalPages.value = response.totalPages;
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  }
</script>

<template>

  <div class="w-full flex justify-center">
    <div class="w-full flex flex-col max-w-5xl p-4 space-y-3">  

      <TableHeaderComponent 
        @change="setCustomValues"
      />

      <div class="border-b-2 border-[#adb5bd]"></div>

      <TableComponent 
        v-model="page"
        :games="games"
        :totalPages="totalPages"
      />

    </div>
  </div>

</template>