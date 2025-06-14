import { ref } from 'vue';


export function useMinesweeper(initialRows = 9, initialCols = 9, initialMines = 10) {
  const { t } = useI18n();

  const rows = ref<number>(initialRows);
  const cols = ref<number>(initialCols);
  const mines = ref<number>(initialMines);

  const board = ref<(number | 'M')[][]>([]);
  const revealed = ref<boolean[][]>([]);
  const flags = ref<boolean[][]>([]);
  const interrogations = ref<boolean[][]>([]);
  const gameOver = ref(false);
  const gameWin = ref(false);
  const firstClick = ref(true);

  const firstClickZero = ref(true);
  const interrogationsActivated = ref(true);

  const seconds = ref(0);
  let intervalId: ReturnType<typeof setInterval> | null = null;

  const directions = [[-1, -1],[-1, 0],[-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];

  const explotedCell = ref<{row: number, col: number} | null>(null); // necesario para saber cual mina fue la que exploto, para mostrarla al con fondo rojo

  const helpCells = ref<{ row: number; col: number }[]>([]);
  const messageHelp = ref<string | null>(null);

  //verifica que sea una celda del tablero
  function isValidCell(r: number, c: number): boolean {
    return r >= 0 && r < rows.value && c >= 0 && c < cols.value;
  }

  //reinicia el juego
  function resetGame () {
    explotedCell.value = null;
    helpCells.value = [];
    stopTime();
    seconds.value = 0;
    initBoard();
  }

  //se setean los valores iniciales del tablero
  function initBoard() {
    board.value = Array.from({length: rows.value}, () => Array(cols.value).fill(0));
    revealed.value = Array.from({length: rows.value}, () => Array(cols.value).fill(false));
    flags.value = Array.from({length: rows.value}, () => Array(cols.value).fill(false));
    if (interrogationsActivated.value)
        interrogations.value = Array.from({length: rows.value}, () => Array(cols.value).fill(false));   
    gameOver.value = false;
    gameWin.value = false;
    firstClick.value = true;    
  }

  //coloca las minas en el tablero, en caso de que sea el primer click, evita que se coloquen minas en las casillas adyacentes
  function placeMines(row: number, col: number) {
    let mineCount = 0;
    const invalidCells = new Set();

    invalidCells.add(`${row}-${col}`);
    if (firstClickZero.value) { 
        directions.forEach(([dr, dc]) => {
            const r = dr + row;
            const c = dc + col;
            if (isValidCell(r, c)) {
                invalidCells.add(`${r}-${c}`)
            }
        });
    }
    
    while (mineCount < mines.value) {
        const r = Math.floor(Math.random() * rows.value);
        const c = Math.floor(Math.random() * cols.value);
        const key = `${r}-${c}`
        if (board.value[r][c] !== 'M' && !invalidCells.has(key)) {
            board.value[r][c] = 'M';
            mineCount++;
        }
    }

    adjacentMines();
  }
  
  //esta funcion sirve para que el jugador no pierda en el primer moviminto en caso de apretar una mina
  function boardFirstClick(row: number, col: number) {
    firstClick.value = false;
    placeMines(row, col);
    startTime();
    reveal(row, col);
  }

  //funciones del tiempo de la partida
  function startTime() {
    if (intervalId !== null) return // evitar múltiples timers

    intervalId = setInterval(() => {
        seconds.value++
    }, 1000)
  }
  function stopTime() {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  //recorre cada casilla del tablero, en caso de no ser una mina, cuenta las minas adyacentes y setea el numero
  function adjacentMines() {
    for (let r = 0; r < rows.value; r++) {
      for (let c = 0; c < cols.value; c++) {
        if (board.value[r][c] === 'M') continue;

        let count = 0;
        directions.forEach(([dr, dc]) => {
          const nr = r + dr;
          const nc = c + dc;
          if (isValidCell(nr, nc) && board.value[nr][nc] === 'M') {
              count++;
          }
        });

        board.value[r][c] = count;
      }
    } 
  }

  function reveal(row: number, col: number) {
    if ( flags.value[row][col] || gameOver.value || gameWin.value) return

    if (!revealed.value[row][col]) {
      // lógica si no estaba revelada
      revealed.value[row][col] = true;
      
      if (board.value[row][col] === 'M') {
        stopTime();
        explotedCell.value = { row, col };
        gameOver.value = true;
        revealGameOver();
        return;
      }

      if (board.value[row][col] === 0) {
        directions.forEach(([dr, dc]) => {
            const nr = row + dr;
            const nc = col + dc;
            if (isValidCell(nr, nc)) {
                reveal(nr, nc);
            }
        });
      }

      checkWin();
      return;
    }

    // ahora manejamos el caso de celda ya revelada
    let adjacentFlags = 0;
    directions.forEach(([dr, dc]) => {
      const nr = row + dr;
      const nc = col + dc;
      if (isValidCell(nr, nc) && flags.value[nr][nc]) {
          adjacentFlags++;
      }
    });

    if (adjacentFlags > 0 && board.value[row][col] === adjacentFlags) {
      directions.forEach(([dr, dc]) => {
        const nr = row + dr;
        const nc = col + dc;
        if (isValidCell(nr, nc) && !revealed.value[nr][nc]) {
            reveal(nr, nc);
        }
      });
    }
  }

  function revealGameOver() {
    for (let r=0; r<rows.value; r++){
      for (let c=0; c<cols.value; c++){
        if (board.value[r][c] === 'M' && !flags.value[r][c]) {
          revealed.value[r][c] = true;
        }
      }
    }
  }

  function checkWin() {
    //verifica si todas las casillas con valor diferente a M han sido reveladas
    if (board.value.flat().filter(cell => cell !== 'M').length === revealed.value.flat().filter(cell => cell === true).length){
      stopTime();
      revealGameWin();
      gameWin.value = true;
    }
  }

  function revealGameWin() {
    for (let r=0; r<rows.value; r++){
      for (let c=0; c<cols.value; c++){
        if (board.value[r][c] === 'M' && !flags.value[r][c]) {
          flags.value[r][c] = true;
        }
      }
    }
  }


  function rightClick(row: number, col: number) {
    if (revealed.value[row][col] || gameOver.value || gameWin.value) return

    // sirve para ir alterando la casilla con las marcas flags e interrogations
    if (interrogationsActivated.value) {
      if (!flags.value[row][col] && !interrogations.value[row][col]){ 
        flags.value[row][col] = true;
      } else if (flags.value[row][col]) {
        flags.value[row][col] = false;
        interrogations.value[row][col] = true;
      } else if (interrogations.value[row][col]) {
        interrogations.value[row][col] = false;
      }
    } else if (!interrogationsActivated.value) {
      flags.value[row][col] = !flags.value[row][col];
    }
  }

  function getRandomRevealedCell() {
    const revealedCells: { row: number; col: number}[] = [];

    for (let r=0; r<rows.value; r++) {
      for (let c=0; c<cols.value; c++) {
        const cellValue = board.value[r][c];

        if (!revealed.value[r][c]) continue;
        if (cellValue === 'M' || cellValue === 0) continue;

        let flagsAround = 0;
        let hiddenUnFlagged = 0;

        directions.forEach(([dr, dc]) => {
          const nr = r + dr;
          const nc = c + dc;
          if (!isValidCell(nr, nc)) return;

          if (flags.value[nr][nc]) {
            flagsAround++;
          } else if (!revealed.value[nr][nc]) {
            hiddenUnFlagged++;
          }
        });

        const totalHidden = flagsAround + hiddenUnFlagged;

        if (
          (totalHidden === cellValue && hiddenUnFlagged > 0) ||
          (flagsAround === cellValue && hiddenUnFlagged > 0)
        ) {
          revealedCells.push({ row: r, col: c });
        }
      }
    }

    if (revealedCells.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * revealedCells.length);
    return revealedCells[randomIndex];
  } 

  function help() { 
    helpCells.value = [];
    const helpCellFunction = getRandomRevealedCell();
    
    if (helpCellFunction) {
      helpCells.value.push({ row: helpCellFunction.row, col: helpCellFunction.col});
      directions.forEach(([dr, dc]) => {
        const nr = helpCellFunction.row + dr;
        const nc = helpCellFunction.col + dc;
        
        if (isValidCell(nr, nc)) {
          helpCells.value.push({ row: nr, col: nc});
        }
      })
      
      setTimeout(() => {
        helpCells.value = []
      }, 2000);
    } else {
      messageHelp.value = t('helpMessage.noHelp');
      setTimeout(() => {
        messageHelp.value = null;
      }, 1000);
    }

    if (firstClick.value) {
      console.log('entre');
      messageHelp.value = t('helpMessage.firstClick');
      setTimeout(() => {
        messageHelp.value = null;
      }, 1000);
    }
  }
  
  return {
    rows,
    cols,
    mines,
    board,
    revealed,
    flags,
    interrogations,
    gameWin,
    gameOver,
    firstClick,
    boardFirstClick,
    resetGame,
    reveal,
    rightClick,
    seconds,
    firstClickZero,
    interrogationsActivated,
    explotedCell,
    help,
    helpCells,
    messageHelp
  }
}
