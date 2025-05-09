import { ref } from 'vue';

export function useMinesweeper(initialRows = 9, initialCols = 9, initialMines = 10) {
    const rows = ref(initialRows);
    const cols = ref(initialCols);
    const mines = ref(initialMines);

    const board = ref([]);
    const revealed = ref([]);
    const flags = ref([]);
    const interrogations = ref([]);
    const gameOver = ref(false);
    const gameWin = ref(false);
    const firstClick = ref(true);
    const firstClickZero = ref(true);

    const seconds = ref(0);
    let intervalId = null;

    const directions = [[-1, -1],[-1, 0],[-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];
    function isValidCell(r, c) {
        return r >= 0 && r < rows.value && c >= 0 && c < cols.value;
    }

    function initBoard() {
        board.value = Array.from({length: rows.value}, () => Array(cols.value).fill(0));
        revealed.value = Array.from({length: rows.value}, () => Array(cols.value).fill(false));
        flags.value = Array.from({length: rows.value}, () => Array(cols.value).fill(false));
        interrogations.value = Array.from({length: rows.value}, () => Array(cols.value).fill(false));   
        gameOver.value = false;
        gameWin.value = false;
        firstClick.value = true;
        firstClickZero.value = true; //esta variable indica si la primera casilla va a ser 0 o no, a gusto del jugador
        seconds.value = 0;
    }

    function placeMines(row, col) {
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
    function boardFirstClick(row, col) {
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
        clearInterval(intervalId)
        intervalId = null
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


    function reveal(row, col) {
        if (gameOver.value || flags.value[row][col]) return
 
        if (revealed.value[row][col] === false) {
            revealed.value[row][col] = true;

            //si aprieta una casilla con mina
            if (board.value[row][col] === 'M') {
                gameOver.value = true;
                return
            }

            //si aprieta una casilla valida y no tiene minas al rededor
            if (board.value[row][col] === 0) {
                directions.forEach(([dr, dc]) => {
                    const nr = row + dr;
                    const nc = col + dc;
                    if (isValidCell(nr, nc) && board.value[nr][nc] !== 'M') {
                        reveal(nr, nc);
                    }
                });
            }

        } else if (revealed.value[row][col] === true) {
            let adjacentFlags = 0;
            let adjacentRevealed = 0;
            directions.forEach(([dr, dc]) => {
                const nr = row + dr;
                const nc = col + dc;
                if (isValidCell(nr, nc) && flags.value[nr][nc]) {
                    adjacentFlags++;
                }
            });

            if (adjacentFlags > 0 && board.value[row][col] === adjacentFlags) {
                console.log('entre');
                console.log(row, col);
                directions.forEach(([dr, dc]) => {
                    const nr = row + dr;
                    const nc = col + dc;
                    console.log(nr, nc);
                    if (isValidCell(nr, nc) && board.value[nr][nc] !== 'M' && !revealed.value[nr][nc]) {
                        reveal(nr, nc);
                    }
                });
            }
        }
        
        //checkeo para ver si gano
        checkWin();
    }

    function checkWin() {
        //verifica si todas las casillas con valor diferente a M han sido reveladas
        if (board.value.flat().filter(cell => cell !== 'M').length === revealed.value.flat().filter(cell => cell === true).length){
            stopTime();
            gameWin.value = true;
        }
    }


    function rightClick(row, col) {
        if (revealed.value[row][col]) return

        // sirve para ir alterando la casilla con las marcas flags e interrogations
        if (!flags.value[row][col] && !interrogations.value[row][col]){ 
            flags.value[row][col] = true;
        } else if (flags.value[row][col]) {
            flags.value[row][col] = false;
            interrogations.value[row][col] = true;
        } else if (interrogations.value[row][col]) {
            interrogations.value[row][col] = false;
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
        gameOver,
        gameWin,
        firstClick,
        boardFirstClick,
        initBoard,
        reveal,
        rightClick,
        seconds,
    }
}