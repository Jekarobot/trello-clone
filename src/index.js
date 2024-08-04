import './styles.css';
import { addCard, loadCards } from './dom';
import { enableColumnDropping } from './dragAndDrop';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.column').forEach(column => {
    enableColumnDropping(column);

    const form = column.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      addCard(column.id, input.value);
      input.value = '';
    });
  });

  loadCards();
});

window.addCard = addCard;
