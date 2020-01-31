import playfield from './js/playfield';


/**
 * Инициализация игры.
 */
function init() {
    // Отрисовываем игровое поле.
    playfield.renderMap();
    // Инициализируем обработчики событий.
    playfield.initEventHandlers();
}

init();