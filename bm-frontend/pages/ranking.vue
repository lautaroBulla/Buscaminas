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

  const difficulty = ref('easy');
  watch(difficulty, async(newDifficulty) => {
    console.log(newDifficulty);
    switch (newDifficulty) {
      case "easy":
        rows.value = 9; cols.value = 9; mines.value = 10; changeDifficulty(); break;
      case "intermediate":
        rows.value = 16; cols.value = 16; mines.value = 40; changeDifficulty(); break;
      case "expert": 
        rows.value = 16; cols.value = 30; mines.value = 99; changeDifficulty(); break;
    }
  })

  const setCustomValues = ({ rows: customRows, cols: customCols, mines: customMines }) => {
    rows.value = customRows;
    cols.value = customCols;
    mines.value = customMines;
    changeDifficulty();
  }

  const changeDifficulty = async () => {
    try {
      const response = await findByDifficulty(rows.value, cols.value, mines.value, page.value, 10);
      games.value = response;
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  }
</script>

<template>

  <div class="w-full flex justify-center">
    <div class="w-full flex flex-col max-w-5xl p-4 space-y-3">  

      <TableHeaderComponent 
        :rows="rows"
        :cols="cols"
        :mines="mines"
        v-model="difficulty"
        @update:customValues="setCustomValues"
      />

      <div class="border-b-2 border-[#adb5bd]"></div>

      <TableComponent 
        :games="games"
      />

    </div>
  </div>

</template>