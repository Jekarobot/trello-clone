import { initializeDragAndDrop } from './dragAndDrop';
import { loadState, addCardToState, removeCardFromState, saveState } from './state';
export function addCard(columnId, cardText) {
  const { state, cardIdCounter } = loadState();
  const column = document.getElementById(columnId);

  if (cardText) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('draggable', 'true');
    card.setAttribute('id', `card-${cardIdCounter}`);
    card.innerText = cardText;

    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Удалить';
    removeBtn.style.backgroundColor = 'red';
    removeBtn.style.marginTop = '5px';
    removeBtn.onclick = () => {
      card.remove();
      removeCardFromState(columnId, card.id);
    };

    card.appendChild(removeBtn);
    initializeDragAndDrop(card);
    column.appendChild(card);

    state.columns[columnId] = state.columns[columnId] || [];
    state.columns[columnId].push({ id: card.id, text: cardText });
    saveState(state, cardIdCounter + 1);
  }
}

export function loadCards() {
  const { state, cardIdCounter } = loadState();
  const columns = document.querySelectorAll('.column');

  columns.forEach(column => {
    const columnId = column.id;
    state.columns[columnId] = state.columns[columnId] || [];

    state.columns[columnId].forEach(cardData => {
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('draggable', 'true');
      card.setAttribute('id', cardData.id);
      card.innerText = cardData.text;

      const removeBtn = document.createElement('button');
      removeBtn.innerText = 'Удалить';
      removeBtn.style.backgroundColor = 'red';
      removeBtn.style.marginTop = '5px';
      removeBtn.onclick = () => {
        card.remove();
        removeCardFromState(columnId, cardData.id);
      };

      card.appendChild(removeBtn);

      initializeDragAndDrop(card);

      column.appendChild(card);
    });
  });
}
