const STATE_KEY = 'dragAndDropState';
const ID_COUNTER_KEY = 'cardIdCounter';
export function loadState() {
  const stateJSON = localStorage.getItem(STATE_KEY);
  const idCounterJSON = localStorage.getItem(ID_COUNTER_KEY);

  let cardIdCounter = 0;
  if (idCounterJSON !== null) {
    const parsedCounter = parseInt(idCounterJSON, 10);
    cardIdCounter = isNaN(parsedCounter) ? 0 : parsedCounter;
  }

  return {
    state: stateJSON ? JSON.parse(stateJSON) : { columns: {} },
    cardIdCounter: cardIdCounter
  };
}

export function saveState(state, cardIdCounter) {
  console.log('Сохраняем состояние:', state, 'Счетчик:', cardIdCounter);
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
  localStorage.setItem(ID_COUNTER_KEY, cardIdCounter.toString()); // Преобразование к строке для хранения
}

export function addCardToState(columnId, card, cardIdCounter) {
  const { state } = loadState();
  if (!state.columns[columnId]) {
    state.columns[columnId] = [];
  }
  state.columns[columnId].push(card);
  saveState(state, cardIdCounter);
}

export function removeCardFromState(columnId, cardId) {
  const { state, cardIdCounter } = loadState();
  state.columns[columnId] = state.columns[columnId].filter(card => card.id !== cardId);
  saveState(state, cardIdCounter);
}
