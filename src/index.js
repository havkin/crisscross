import playfield from './js/playfield';


/**
 * Инициализация игры.
 */
function init() {
    // Выводим все ячейки.
    playfield.renderMap();
    // Инициализируем обработчики событий.
    playfield.initEventHandlers();
}

init();