/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://trello-clone/./src/styles.css?");

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addCard: () => (/* binding */ addCard),\n/* harmony export */   loadCards: () => (/* binding */ loadCards)\n/* harmony export */ });\n/* harmony import */ var _dragAndDrop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dragAndDrop */ \"./src/dragAndDrop.js\");\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ \"./src/state.js\");\n\r\n\r\nfunction addCard(columnId, cardText) {\r\n  const { state, cardIdCounter } = (0,_state__WEBPACK_IMPORTED_MODULE_1__.loadState)();\r\n  const column = document.getElementById(columnId);\r\n\r\n  if (cardText) {\r\n    const card = document.createElement('div');\r\n    card.className = 'card';\r\n    card.setAttribute('draggable', 'true');\r\n    card.setAttribute('id', `card-${cardIdCounter}`);\r\n    card.innerText = cardText;\r\n\r\n    const removeBtn = document.createElement('button');\r\n    removeBtn.innerText = 'Удалить';\r\n    removeBtn.style.backgroundColor = 'red';\r\n    removeBtn.style.marginTop = '5px';\r\n    removeBtn.onclick = () => {\r\n      card.remove();\r\n      (0,_state__WEBPACK_IMPORTED_MODULE_1__.removeCardFromState)(columnId, card.id);\r\n    };\r\n\r\n    card.appendChild(removeBtn);\r\n    (0,_dragAndDrop__WEBPACK_IMPORTED_MODULE_0__.initializeDragAndDrop)(card);\r\n    column.appendChild(card);\r\n\r\n    // Обновляем состояние и инкрементируем счетчик\r\n    state.columns[columnId] = state.columns[columnId] || [];\r\n    state.columns[columnId].push({ id: card.id, text: cardText });\r\n    (0,_state__WEBPACK_IMPORTED_MODULE_1__.saveState)(state, cardIdCounter + 1);\r\n  }\r\n}\r\n\r\nfunction loadCards() {\r\n  const { state, cardIdCounter } = (0,_state__WEBPACK_IMPORTED_MODULE_1__.loadState)();\r\n  const columns = document.querySelectorAll('.column');\r\n\r\n  columns.forEach(column => {\r\n    const columnId = column.id;\r\n    state.columns[columnId] = state.columns[columnId] || [];\r\n\r\n    state.columns[columnId].forEach(cardData => {\r\n      const card = document.createElement('div');\r\n      card.className = 'card';\r\n      card.setAttribute('draggable', 'true');\r\n      card.setAttribute('id', cardData.id);\r\n      card.innerText = cardData.text;\r\n\r\n      const removeBtn = document.createElement('button');\r\n      removeBtn.innerText = 'Удалить';\r\n      removeBtn.style.backgroundColor = 'red';\r\n      removeBtn.style.marginTop = '5px';\r\n      removeBtn.onclick = () => {\r\n        card.remove();\r\n        (0,_state__WEBPACK_IMPORTED_MODULE_1__.removeCardFromState)(columnId, cardData.id);\r\n      };\r\n\r\n      card.appendChild(removeBtn);\r\n\r\n      (0,_dragAndDrop__WEBPACK_IMPORTED_MODULE_0__.initializeDragAndDrop)(card);\r\n\r\n      column.appendChild(card);\r\n    });\r\n  });\r\n}\r\n\n\n//# sourceURL=webpack://trello-clone/./src/dom.js?");

/***/ }),

/***/ "./src/dragAndDrop.js":
/*!****************************!*\
  !*** ./src/dragAndDrop.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   enableColumnDropping: () => (/* binding */ enableColumnDropping),\n/* harmony export */   initializeDragAndDrop: () => (/* binding */ initializeDragAndDrop)\n/* harmony export */ });\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ \"./src/state.js\");\n\r\n\r\nlet draggedCard = null;\r\nconst initializedCards = new WeakSet();\r\nconst initializedColumns = new WeakSet();\r\n\r\nfunction initializeDragAndDrop(card) {\r\n  if (!initializedCards.has(card)) {\r\n    console.log('Initializing drag and drop for card:', card.id);\r\n    console.trace(); // Для отслеживания стека вызовов\r\n    card.setAttribute('draggable', true);\r\n    card.addEventListener('dragstart', dragStart);\r\n    card.addEventListener('dragend', dragEnd);\r\n    initializedCards.add(card);\r\n  }\r\n}\r\n\r\nfunction dragStart(event) {\r\n  draggedCard = event.target;\r\n  draggedCard.style.opacity = '0.5';\r\n  draggedCard.classList.add('dragging');\r\n  event.dataTransfer.effectAllowed = 'move';\r\n\r\n  console.log('dragStart called');\r\n  console.log('Drag Start:', draggedCard);\r\n}\r\n\r\nfunction dragEnd() {\r\n  console.log('dragEnd called');\r\n  console.log('Drag End:', draggedCard);\r\n  if (draggedCard) {\r\n    draggedCard.style.opacity = '1';\r\n    draggedCard.classList.remove('dragging');\r\n    document.querySelectorAll('.placeholder').forEach(placeholder => placeholder.remove());\r\n    draggedCard = null; // Установка draggedCard в null\r\n  }\r\n}\r\n\r\nfunction enableColumnDropping(column) {\r\n  if (!initializedColumns.has(column)) {\r\n    console.log('Enabling column dropping for column:', column.id);\r\n    console.trace(); // Для отслеживания стека вызовов\r\n    column.addEventListener('dragover', dragOver);\r\n    column.addEventListener('drop', drop);\r\n    initializedColumns.add(column);\r\n  }\r\n}\r\n\r\nfunction dragOver(event) {\r\n  event.preventDefault();\r\n  event.dataTransfer.dropEffect = 'move';\r\n\r\n  const column = event.currentTarget;\r\n  const afterElement = getDragAfterElement(column, event.clientY);\r\n  let placeholder = document.querySelector('.placeholder');\r\n\r\n  if (!placeholder) {\r\n    placeholder = document.createElement('div');\r\n    placeholder.className = 'placeholder';\r\n  }\r\n\r\n  if (afterElement == null) {\r\n    column.appendChild(placeholder);\r\n  } else {\r\n    column.insertBefore(placeholder, afterElement);\r\n  }\r\n}\r\n\r\nfunction drop(event) {\r\n  event.preventDefault();\r\n  console.log('Drop (start):', draggedCard);\r\n\r\n  const column = event.currentTarget;\r\n  const afterElement = getDragAfterElement(column, event.clientY);\r\n  const placeholder = document.querySelector('.placeholder');\r\n\r\n  if (!draggedCard) {\r\n    console.error('draggedCard is null');\r\n    return;\r\n  }\r\n\r\n  const { state, cardIdCounter } = (0,_state__WEBPACK_IMPORTED_MODULE_0__.loadState)(); // Загрузите состояние и cardIdCounter\r\n  const cardId = draggedCard.id;\r\n  const cardText = draggedCard.innerText.replace('Удалить', '').trim();\r\n  const originalColumnId = draggedCard.parentElement.id;\r\n  const newColumnId = column.id;\r\n\r\n  // Убедитесь, что состояние колонок инициализировано\r\n  if (!state.columns) {\r\n    state.columns = {};\r\n  }\r\n  state.columns[originalColumnId] = state.columns[originalColumnId] || [];\r\n  state.columns[newColumnId] = state.columns[newColumnId] || [];\r\n\r\n  if (originalColumnId === newColumnId) {\r\n    // Перемещение карточки в пределах одной колонки\r\n    if (afterElement == null) {\r\n      column.appendChild(draggedCard);\r\n    } else {\r\n      column.insertBefore(draggedCard, afterElement);\r\n    }\r\n\r\n    if (placeholder) {\r\n      placeholder.remove();\r\n    }\r\n\r\n    // Обновление состояния для одной колонки\r\n    state.columns[newColumnId] = Array.from(column.querySelectorAll('.card')).map(card => ({\r\n      id: card.id,\r\n      text: card.innerText.replace('Удалить', '').trim()\r\n    }));\r\n\r\n    (0,_state__WEBPACK_IMPORTED_MODULE_0__.saveState)(state, cardIdCounter); // Используйте текущий cardIdCounter\r\n  } else {\r\n    // Перемещение карточки между колонками\r\n    if (afterElement == null) {\r\n      column.appendChild(draggedCard);\r\n    } else {\r\n      column.insertBefore(draggedCard, afterElement);\r\n    }\r\n\r\n    if (placeholder) {\r\n      placeholder.remove();\r\n    }\r\n\r\n    // Обновление состояния\r\n    state.columns[originalColumnId] = state.columns[originalColumnId].filter(card => card.id !== cardId);\r\n    state.columns[newColumnId].push({ id: cardId, text: cardText });\r\n\r\n    (0,_state__WEBPACK_IMPORTED_MODULE_0__.saveState)(state, cardIdCounter); // Используйте текущий cardIdCounter\r\n  }\r\n\r\n  console.log('Drop (end):', draggedCard);\r\n}\r\n\r\nfunction getDragAfterElement(column, y) {\r\n  const draggableElements = [...column.querySelectorAll('.card:not(.dragging)')];\r\n\r\n  return draggableElements.reduce((closest, child) => {\r\n    const box = child.getBoundingClientRect();\r\n    const offset = y - box.top - box.height / 2;\r\n    if (offset < 0 && offset > closest.offset) {\r\n      return { offset: offset, element: child };\r\n    } else {\r\n      return closest;\r\n    }\r\n  }, { offset: Number.NEGATIVE_INFINITY }).element;\r\n}\r\n\r\n// Привязка событий к элементам\r\ndocument.querySelectorAll('.card').forEach(card => {\r\n  initializeDragAndDrop(card);\r\n});\r\n\r\ndocument.querySelectorAll('.column').forEach(column => enableColumnDropping(column));\r\n\n\n//# sourceURL=webpack://trello-clone/./src/dragAndDrop.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n/* harmony import */ var _dragAndDrop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dragAndDrop */ \"./src/dragAndDrop.js\");\n\r\n\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n  document.querySelectorAll('.column').forEach(column => {\r\n    (0,_dragAndDrop__WEBPACK_IMPORTED_MODULE_2__.enableColumnDropping)(column);\r\n\r\n    const form = column.querySelector('form');\r\n    form.addEventListener('submit', (e) => {\r\n      e.preventDefault();\r\n      const input = form.querySelector('input');\r\n      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.addCard)(column.id, input.value);\r\n      input.value = '';\r\n    });\r\n  });\r\n\r\n  (0,_dom__WEBPACK_IMPORTED_MODULE_1__.loadCards)();\r\n});\r\n\r\nwindow.addCard = _dom__WEBPACK_IMPORTED_MODULE_1__.addCard;\r\n\n\n//# sourceURL=webpack://trello-clone/./src/index.js?");

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addCardToState: () => (/* binding */ addCardToState),\n/* harmony export */   loadState: () => (/* binding */ loadState),\n/* harmony export */   removeCardFromState: () => (/* binding */ removeCardFromState),\n/* harmony export */   saveState: () => (/* binding */ saveState)\n/* harmony export */ });\nconst STATE_KEY = 'dragAndDropState';\r\nconst ID_COUNTER_KEY = 'cardIdCounter';\r\nfunction loadState() {\r\n  const stateJSON = localStorage.getItem(STATE_KEY);\r\n  const idCounterJSON = localStorage.getItem(ID_COUNTER_KEY);\r\n\r\n  let cardIdCounter = 0;\r\n  if (idCounterJSON !== null) {\r\n    const parsedCounter = parseInt(idCounterJSON, 10);\r\n    cardIdCounter = isNaN(parsedCounter) ? 0 : parsedCounter;\r\n  }\r\n\r\n  return {\r\n    state: stateJSON ? JSON.parse(stateJSON) : { columns: {} },\r\n    cardIdCounter: cardIdCounter\r\n  };\r\n}\r\n\r\nfunction saveState(state, cardIdCounter) {\r\n  console.log('Сохраняем состояние:', state, 'Счетчик:', cardIdCounter);\r\n  localStorage.setItem(STATE_KEY, JSON.stringify(state));\r\n  localStorage.setItem(ID_COUNTER_KEY, cardIdCounter.toString()); // Преобразование к строке для хранения\r\n}\r\n\r\nfunction addCardToState(columnId, card, cardIdCounter) {\r\n  const { state } = loadState();\r\n  if (!state.columns[columnId]) {\r\n    state.columns[columnId] = [];\r\n  }\r\n  state.columns[columnId].push(card);\r\n  saveState(state, cardIdCounter);\r\n}\r\n\r\nfunction removeCardFromState(columnId, cardId) {\r\n  const { state, cardIdCounter } = loadState();\r\n  state.columns[columnId] = state.columns[columnId].filter(card => card.id !== cardId);\r\n  saveState(state, cardIdCounter);\r\n}\r\n\n\n//# sourceURL=webpack://trello-clone/./src/state.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;