let ticTakToe = {

    // начальные параметры игры
    status: 'playing',
    phase: 'X',

    /**
     * Метод проверяет, что игра не закончена.
     * @returns {boolean} Вернет true, статус игры "играем", иначе false.
     */
    isStatusPlaying() {
        return this.status === 'playing';
    },

    /**
     * Метод проверяет, есть ли выигрышная ситуация на карте.
     * @param {event.target} center ячейка по которой совершен ход
     * @returns {boolean} Вернет true, если игра выиграна, иначе false.
     */
    hasWon(center) {
        // направления линий для проверки: горизонталь, вертикаль, две диагонали
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
     * @param { Object {x: int, y: int}} direction направление линии
     * @param {int} cX координата X ячейки, в которую совершен ход
     * @param {int} cY координата Y ячейки, в которую совершен ход
     * @returns {boolean} Вернет true, если линия выиграна, иначе false.
     */
    isLineWon(direction, cX, cY) {
        let lineLength = 1;

        // считаем отрезок от центра в заданном направлении
        let x = direction.x;
        let y = direction.y;

        lineLength += this.countSegment(x, y, cX, cY);

        // меняем направление на противоположное
        x *= -1;
        y *= -1;

        lineLength += this.countSegment(x, y, cX, cY);

        return lineLength > 4;
    },



    /**
     * Метод считает длину отрезка заполненного знаком текущего хода по заданному направлению от ячейки, по которой совершен ход
     *
     * @param {int}  x характеристика направления по оси X
     * @param {int} y характеристика направления по оси Y
     * @param {int} cX координата X ячейки, в которую совершен ход
     * @param {int} cY координата Y ячейки, в которую совершен ход
     * @returns {int}  возвращает длину отрезка
     */
    countSegment(x, y, cX, cY) {
        let segment = 0;
        for (let i = 1; i < 5; i++) {

            const nextCell = document.querySelector(`[data-row="${cY + i * y}"][data-col="${cX + i * x}"]`)

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
        alert(`${figure} выиграли!`); // TODO переделать вывод
    },

    /**
     * Меняет фигуру (крестик или нолик).
     */
    togglePhase() {
        this.phase = this.phase === 'X' ? 'O' : 'X';
    },
};

export default ticTakToe;