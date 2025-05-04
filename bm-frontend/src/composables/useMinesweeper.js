import { ref } from 'vue';

export function useMinesweeper(rows = 9, cols = 9, mines = 10) {
    const board = ref([]);

    function initBoard() {
        board.value = Array.from({length: rows}, () => Array(cols).fill(0));
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
        const directions = [[-1, -1], [-1, 0], [-1, 1],[0, -1],[0, 1],[1, -1], [1, 0], [1, 1]];
    
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
    
        function isValidCell(r, c) {
            return r >= 0 && r < rows && c >= 0 && c < cols;
        }
    }

    return {
        board,
        initBoard,
    }
}