import { loadState, saveState } from './state';

let draggedCard = null;
const initializedCards = new WeakSet();
const initializedColumns = new WeakSet();

export function initializeDragAndDrop(card) {
  if (!initializedCards.has(card)) {
    card.setAttribute('draggable', true);
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);
    initializedCards.add(card);
  }
}

function dragStart(event) {
  draggedCard = event.target;
  draggedCard.style.opacity = '0.5';
  draggedCard.classList.add('dragging');
  event.dataTransfer.effectAllowed = 'move';
}

function dragEnd() {
  if (draggedCard) {
    draggedCard.style.opacity = '1';
    draggedCard.classList.remove('dragging');
    document.querySelectorAll('.placeholder').forEach(placeholder => placeholder.remove());
    draggedCard = null;
  }
}

export function enableColumnDropping(column) {
  if (!initializedColumns.has(column)) {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('drop', drop);
    initializedColumns.add(column);
  }
}

function dragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';

  const column = event.currentTarget;
  const afterElement = getDragAfterElement(column, event.clientY);
  let placeholder = document.querySelector('.placeholder');

  if (!placeholder) {
    placeholder = document.createElement('div');
    placeholder.className = 'placeholder';
  }

  if (afterElement == null) {
    column.appendChild(placeholder);
  } else {
    column.insertBefore(placeholder, afterElement);
  }
}

function drop(event) {
  event.preventDefault();

  const column = event.currentTarget;
  const afterElement = getDragAfterElement(column, event.clientY);
  const placeholder = document.querySelector('.placeholder');

  if (!draggedCard) {
    return;
  }

  const { state, cardIdCounter } = loadState(); 
  const cardId = draggedCard.id;
  const cardText = draggedCard.innerText.replace('Удалить', '').trim();
  const originalColumnId = draggedCard.parentElement.id;
  const newColumnId = column.id;

  if (!state.columns) {
    state.columns = {};
  }
  state.columns[originalColumnId] = state.columns[originalColumnId] || [];
  state.columns[newColumnId] = state.columns[newColumnId] || [];

  if (originalColumnId === newColumnId) {
    if (afterElement == null) {
      column.appendChild(draggedCard);
    } else {
      column.insertBefore(draggedCard, afterElement);
    }

    if (placeholder) {
      placeholder.remove();
    }

    state.columns[newColumnId] = Array.from(column.querySelectorAll('.card')).map(card => ({
      id: card.id,
      text: card.innerText.replace('Удалить', '').trim()
    }));

    saveState(state, cardIdCounter);
  } else {
    if (afterElement == null) {
      column.appendChild(draggedCard);
    } else {
      column.insertBefore(draggedCard, afterElement);
    }

    if (placeholder) {
      placeholder.remove();
    }

    state.columns[originalColumnId] = state.columns[originalColumnId].filter(card => card.id !== cardId);
    state.columns[newColumnId].push({ id: cardId, text: cardText });

    saveState(state, cardIdCounter);
  }
}

function getDragAfterElement(column, y) {
  const draggableElements = [...column.querySelectorAll('.card:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

document.querySelectorAll('.card').forEach(card => {
  initializeDragAndDrop(card);
});

document.querySelectorAll('.column').forEach(column => enableColumnDropping(column));
