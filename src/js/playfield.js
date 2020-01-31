import game from './game';

let playfield = {
    fieldSize: 20,
    gameTableElement: document.getElementById('game'),


    /**
     * метод формирует игровое поле в виде таблицы
     * присваивает каждой ячейке координаты в dataset
     */
    renderMap() {

        for (let row = 0; row < this.fieldSize; row++) {

            const tr = document.createElement('tr');
            this.gameTableElement.appendChild(tr);

            for (let col = 0; col < this.fieldSize; col++) {

                let td = document.createElement('td');
                td.dataset.row = row.toString();
                td.dataset.col = col.toString();
                tr.appendChild(td);
            }
        }
    },

    /**
     * Метод вешает на каждую ячейку обработчик события click.
     */
    initEventHandlers() {
        const cells = document.querySelectorAll('td');
        cells.forEach(cell => cell.addEventListener('click', event => this.cellClickHandler(event)));
    },

    /**
     * Обработчик события клика.
     * @param {MouseEvent} event
     */
    cellClickHandler(event) {
        // Если клик не нужно обрабатывать, уходим из функции.
        if (!this.isCorrectClick(event)) {
            return;
        }

        // Заполняем ячейку.
        this.fillCell(event);
        // Если кто-то выиграл, заходим в if.
        if (game.hasWon(event.target)) {
            // Ставим статус в "остановлено".
            game.setStatusStopped();
            // Сообщаем о победе пользователя.
            game.sayWonPhrase();
        }

        // Меняем фигуру (крестик или нолик).
        game.togglePhase();
    },

    /**
     * Проверка был ли корректный клик, что описан в событии event.
     * @param {Event} event
     * @returns {boolean} Вернет true в случае если статус игры "играем", клик был по пустой ячейке.
     */
    isCorrectClick(event) {
        return game.isStatusPlaying() && this.isCellEmpty(event);
    },

    /**
     * Проверка что в ячейку не ставили значение (крестик или нолик).
     * @param {Event} event
     * @returns {boolean} Вернет true, если ячейка пуста, иначе false.
     */
    isCellEmpty(event) {
        return event.target.textContent === '';
    },

    /**
     * Заполняет ячейку в которую кликнул пользователь в событии event.
     * @param {Event} event
     * 
     */
    fillCell(event) {
        event.target.textContent = game.phase;
    },

};

export default playfield;