export const useGame = () => {
  const { $apiFetch } = useNuxtApp();

  const getMyBestTime = async (rows: number, cols: number, mines: number) => {
    try {
      const data = await $apiFetch('/api/games/myBestTime', {
        method: 'GET',
        query: {rows, cols, mines}
      })
      return Number(data);
    } catch (error) {
      throw error;
    }
  }

  const getBestTimes = async (rows: number, cols: number, mines: number) => {
    try {
      const data = await $apiFetch('/api/games/bestTimes', {
        method: 'GET',
        query: {rows, cols, mines}
      })
      data.userBestTime = Number(data.userBestTime);
      data.globalBestTime = Number(data.globalBestTime);

      return data;
    } catch (error) {
      throw error;
    }
  }

  const saveGame = async (
    helpLocal: number,
    secondsLocal: number,
    difficultyLocal: string,
    rowsLocal: number, 
    colsLocal: number, 
    minesLocal: number, 
    n3bvLocal: number,
    clicksLocal: number,
    efficiencyLocal: number
  ) => {
    try {
      const res = await $apiFetch('/api/games', {
        method: 'POST',
        body: {
          help: helpLocal,
          seconds: secondsLocal,
          difficulty: difficultyLocal,
          rows: rowsLocal,
          cols: colsLocal,
          mines: minesLocal,
          n3BV: n3bvLocal,
          clicks: clicksLocal,
          efficiency: efficiencyLocal
        }
      })
      return res;
    } catch (error) {
      throw error;
    }
  }

  const findByDifficulty = async (
    rows: number,
    cols: number,
    mines: number,
    page: number,
    take: number
  ) => {
    try {
      const data = await $apiFetch('/api/games/difficulty', {
        method: 'GET',
        query: {rows, cols, mines, page, take}
      })
      return data;
    } catch (error) {
      throw error;
    }
  }

  return {
    getMyBestTime,
    getBestTimes,
    saveGame,
    findByDifficulty
  }
}