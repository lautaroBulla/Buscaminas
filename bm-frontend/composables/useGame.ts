export const useGame = () => {
  const { $apiFetch } = useNuxtApp();

  const getMyBestTime = async (rowsLocal: number, colsLocal: number, minesLocal: number) => {
    try {
      return await $apiFetch('api/games/myBestTime', {
        method: 'GET',
        query: {rows: rowsLocal, cols: colsLocal, mines: minesLocal}
      })
    } catch (error) {
      throw error;
    }
  }

  return {
    getMyBestTime
  }
}