const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let playerNumber = 1;
const dim = 3;

const container = document.getElementById('fieldWrapper');
const map = Array(dim * dim).fill(' ');

startGame();
addResetListener();

function startGame () {
    renderGrid(dim);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function isWin(map) {
    for (let i = 0; i < dim; i++) {
        if (map[i * dim] === map[i * dim + 1] && map[i * dim + 1] === map[i * dim + 2]) {
            renderSymbolInCell(map[i * dim], i * dim, 0, color='#F00');
            renderSymbolInCell(map[i * dim], i * dim, 1, color='#F00');
            renderSymbolInCell(map[i * dim], i * dim, 2, color='#F00');
            return map[i * dim];
        }
    }

    if (map[0] === map[4] && map[4] === map[8]) {
        renderSymbolInCell(map[0], 0, 0, color='#F00');
        renderSymbolInCell(map[0], 1, 1, color='#F00');
        renderSymbolInCell(map[0], 2, 2, color='#F00');
        return map[0];
    }

    if (map[2] === map[4] && map[4] === map[6]) {
        renderSymbolInCell(map[4], 2, 0, color='#F00');
        renderSymbolInCell(map[4], 1, 1, color='#F00');
        renderSymbolInCell(map[4], 0, 2, color='#F00');
        return map[4];
    }

    for (let i = 0; i < 3; i++) {
        if(map[i] === map[i + 3] && map[i + 3] === map[i + 6]) {
            renderSymbolInCell(map[i], 0, i, color='#F00');
            renderSymbolInCell(map[i], 1, i, color='#F00');
            renderSymbolInCell(map[i], 2, i, color='#F00');
            return map[i];
        }
    }

    return -1;
}

function isDraw () {
    if (playerNumber === 10)
        alert("Победила дружба");
}

function cellClickHandler (row, col) {
    if (map[row * dim + col] !== ' ')
        return;
    if (playerNumber % 2 === 1) {
        renderSymbolInCell(CROSS, row, col);
        map[row * dim + col] = CROSS;
    } else {
        renderSymbolInCell(ZERO, row, col);
        map[row * dim + col] = ZERO;
    }
    playerNumber++;
    let winner = isWin(map);
    if (winner === -1)
        isDraw();
    else {
        alert(winner + " - победил");
    }


    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    playerNumber = 1;
    map.fill(' ');
    for (let i = 0; i < dim; i++)
        for (let j = 0; j < dim; j++)
            renderSymbolInCell(EMPTY, i, j);
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
