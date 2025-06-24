export const useGame = () => {
  const { $apiFetch } = useNuxtApp();

  const getMyBestTime = async (rowsLocal: number, colsLocal: number, minesLocal: number) => {
    try {
      const data = await $apiFetch('/api/games/myBestTime', {
        method: 'GET',
        query: {rows: rowsLocal, cols: colsLocal, mines: minesLocal}
      })
      return Number(data);
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
      console.error('Error saving game:', error);
      throw error;
    }
  }

  return {
    getMyBestTime,
    saveGame
  }
}