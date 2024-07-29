function addCard(columnId) {
    const column = document.getElementById(columnId);
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('draggable', 'true');
    card.innerText = prompt('Введите текст карточки');
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);
    column.appendChild(card);
  }
  
  function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    setTimeout(() => event.target.style.display = 'none', 0);
  }
  
  function dragEnd(event) {
    setTimeout(() => event.target.style.display = 'block', 0);
  }
  
  document.querySelectorAll('.column').forEach(column => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('drop', drop);
  });
  
  function dragOver(event) {
    event.preventDefault();
  }
  
  function drop(event) {
    event.preventDefault();
    const cardId = event.dataTransfer.getData('text/plain');
    const card = document.getElementById(cardId);
    event.target.appendChild(card);
  }
  