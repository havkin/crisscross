let ticTakToe = {

    status: 'playing',
    phase: 'X',

    /**
     * Проверка что мы "играем", что игра не закончена.
     * @returns {boolean} Вернет true, статус игры "играем", иначе false.
     */
    isStatusPlaying() {
        return this.status === 'playing';
    },

    /**
     * Проверка есть ли выигрышная ситуация на карте.
     * @returns {boolean} Вернет true, если игра выиграна, иначе false.
     */
    hasWon(center) {

        const directions = [{
                x: 1,
                y: 0
            },
            {
                x: 0,
                y: 1
            },
            {
                x: 1,
                y: 1
            },
            {
                x: 1,
                y: -1
            }
        ];

        const cY = +center.dataset.row;
        const cX = +center.dataset.col;

        return directions.some(direction => this.isLineWon(direction, cX, cY));

    },

    /**
     * Проверка есть ли выигрышная ситуация на линии.
     * @param {{x: int, y: int}} a 1-ая ячейка.
     * @param {{x: int, y: int}} b 2-ая ячейка.
     * @param {{x: int, y: int}} c 3-я ячейка.
     * @returns {boolean} Вернет true, если линия выиграна, иначе false.
     */
    isLineWon(direction, cX, cY) {
        let lineLength = 1;

        let x = direction.x;
        let y = direction.y;

        lineLength += this.countSegment(x, y, cX, cY);

        x *= -1;
        y *= -1;

        lineLength += this.countSegment(x, y, cX, cY);

        return lineLength > 4;
    },

    countSegment(x, y, cX, cY) {
        let segment = 0;
        for (let i = 1; i < 5; i++) {

            const nextCell = document.querySelector(`[data-row="${cY + i * y}"][data-col="${cX + x *i}"]`)

            if (nextCell != null && nextCell.innerText === this.phase) {
                segment++;
            } else {
                break;
            }
        }
        return segment;
    },

    /**
     * Ставит статус игры в "остановлена".
     */
    setStatusStopped() {
        this.status = 'stopped';
    },

    /**
     * Сообщает о победе.
     */
    sayWonPhrase() {
        let figure = this.phase === 'X' ? 'Крестики' : 'Нолики';
        alert(`${figure} выиграли!`);
    },

    /**
     * Меняет фигуру (крестик или нолик).
     */
    togglePhase() {
        this.phase = this.phase === 'X' ? '0' : 'X';
    },
};

export default ticTakToe;