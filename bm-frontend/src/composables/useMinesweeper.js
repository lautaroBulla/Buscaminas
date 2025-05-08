import { ref } from 'vue';

export function useMinesweeper(rows = 9, cols = 9, mines = 10) {
    const board = ref([]);
    const revealed = ref([]);
    const flags = ref([]);
    const interrogations = ref([]);
    const gameOver = ref(false);
    const gameWin = ref(false);

    const directions = [[-1, -1],[-1, 0],[-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];
    function isValidCell(r, c) {
        return r >= 0 && r < rows && c >= 0 && c < cols;
    }

    function initBoard() {
        board.value = Array.from({length: rows}, () => Array(cols).fill(0));
        revealed.value = Array.from({length: rows}, () => Array(cols).fill(false));
        flags.value = Array.from({length: rows}, () => Array(cols).fill(false));
        interrogations.value = Array.from({length: rows}, () => Array(cols).fill(false));
        gameOver.value = false;
        gameWin.value = false;
        placeMines();
        adjacentMines();
    }

    function placeMines() {
        let mineCount = 0;
        while (mineCount < mines) {
            const r = Math.floor(Math.random() * rows);
            const c = Math.floor(Math.random() * cols);
            if (board.value[r][c] !== 'M') {
                board.value[r][c] = 'M';
                mineCount++;
            }
        }
    }

    function adjacentMines() {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
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
        if (revealed.value[row][col] || flags.value[row][col]) return

        revealed.value[row][col] = true;

        //si aprieta una casilla con mina
        if (board.value[row][col] === 'M') {
            gameOver.value = true;
            return
        }

        //si revela la ultima casilla
        if (board.value.flat().filter(cell => cell !== 'M').length === revealed.value.flat().filter(cell => cell === true).length){
            gameWin.value = true;
        }

        //si aprieta una casilla valida
        if (board.value[row][col] === 0) {
            directions.forEach(([dr, dc]) => {
                const nr = row + dr;
                const nc = col + dc;
                if (isValidCell(nr, nc) && board.value[nr][nc] !== 'M') {
                    reveal(nr, nc);
                }
            });
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
        board,
        revealed,
        flags,
        interrogations,
        gameOver,
        gameWin,
        initBoard,
        reveal,
        rightClick,
    }
}