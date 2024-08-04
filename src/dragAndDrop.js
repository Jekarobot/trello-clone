import { loadState, saveState } from './state';

let draggedCard = null;
const initializedCards = new WeakSet();
const initializedColumns = new WeakSet();

export function initializeDragAndDrop(card) {
  if (!initializedCards.has(card)) {
    console.log('Initializing drag and drop for card:', card.id);
    console.trace(); // Для отслеживания стека вызовов
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

  console.log('dragStart called');
  console.log('Drag Start:', draggedCard);
}

function dragEnd() {
  console.log('dragEnd called');
  console.log('Drag End:', draggedCard);
  if (draggedCard) {
    draggedCard.style.opacity = '1';
    draggedCard.classList.remove('dragging');
    document.querySelectorAll('.placeholder').forEach(placeholder => placeholder.remove());
    draggedCard = null; // Установка draggedCard в null
  }
}

export function enableColumnDropping(column) {
  if (!initializedColumns.has(column)) {
    console.log('Enabling column dropping for column:', column.id);
    console.trace(); // Для отслеживания стека вызовов
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
  console.log('Drop (start):', draggedCard);

  const column = event.currentTarget;
  const afterElement = getDragAfterElement(column, event.clientY);
  const placeholder = document.querySelector('.placeholder');

  if (!draggedCard) {
    console.error('draggedCard is null');
    return;
  }

  const { state, cardIdCounter } = loadState(); // Загрузите состояние и cardIdCounter
  const cardId = draggedCard.id;
  const cardText = draggedCard.innerText.replace('Удалить', '').trim();
  const originalColumnId = draggedCard.parentElement.id;
  const newColumnId = column.id;

  // Убедитесь, что состояние колонок инициализировано
  if (!state.columns) {
    state.columns = {};
  }
  state.columns[originalColumnId] = state.columns[originalColumnId] || [];
  state.columns[newColumnId] = state.columns[newColumnId] || [];

  if (originalColumnId === newColumnId) {
    // Перемещение карточки в пределах одной колонки
    if (afterElement == null) {
      column.appendChild(draggedCard);
    } else {
      column.insertBefore(draggedCard, afterElement);
    }

    if (placeholder) {
      placeholder.remove();
    }

    // Обновление состояния для одной колонки
    state.columns[newColumnId] = Array.from(column.querySelectorAll('.card')).map(card => ({
      id: card.id,
      text: card.innerText.replace('Удалить', '').trim()
    }));

    saveState(state, cardIdCounter); // Используйте текущий cardIdCounter
  } else {
    // Перемещение карточки между колонками
    if (afterElement == null) {
      column.appendChild(draggedCard);
    } else {
      column.insertBefore(draggedCard, afterElement);
    }

    if (placeholder) {
      placeholder.remove();
    }

    // Обновление состояния
    state.columns[originalColumnId] = state.columns[originalColumnId].filter(card => card.id !== cardId);
    state.columns[newColumnId].push({ id: cardId, text: cardText });

    saveState(state, cardIdCounter); // Используйте текущий cardIdCounter
  }

  console.log('Drop (end):', draggedCard);
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

// Привязка событий к элементам
document.querySelectorAll('.card').forEach(card => {
  initializeDragAndDrop(card);
});

document.querySelectorAll('.column').forEach(column => enableColumnDropping(column));
