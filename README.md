# 🗂️ Trello Clone

Простая реализация доски задач в стиле Trello с поддержкой drag-and-drop.

## 📖 Описание

Проект представляет собой одностраничное приложение для управления задачами. Пользователь может создавать карточки, перемещать их между колонками (статусами) с помощью перетаскивания. Реализовано на чистом JavaScript без использования сторонних библиотек для UI.

## 🛠️ Технологический стек

- **JavaScript (ES6+)**
- **HTML5**
- **CSS3**
- **Webpack** — сборка
- **Yarn** — менеджер пакетов
- **AppVeyor** — CI/CD

## 🚀 Установка и запуск

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/your-username/trello-clone.git
   cd trello-clone
   ```

2. Установите зависимости:
   ```bash
   yarn install
   ```

3. Запустите в режиме разработки:
   ```bash
   yarn start
   ```

4. Для production сборки:
   ```bash
   yarn build
   ```

## 💻 Примеры использования

После запуска откройте `http://localhost:8080` в браузере.

- **Добавление задачи**: нажмите кнопку "Add card" в нужной колонке.
- **Перемещение задачи**: перетащите карточку мышью в другую колонку.

Пример структуры данных (state.js):
```javascript
const state = {
  columns: [
    { id: 'todo', title: 'To Do', cards: ['Task 1', 'Task 2'] },
    { id: 'in-progress', title: 'In Progress', cards: ['Task 3'] },
    { id: 'done', title: 'Done', cards: ['Task 4'] }
  ]
};
```

## 📁 Структура проекта

```
trello-clone/
├── appveyor.yml          # Конфигурация CI/CD
├── package.json          # Зависимости и скрипты
├── webpack.config.js     # Конфигурация Webpack
├── yarn.lock             # Lock-файл зависимостей
└── src/
    ├── index.html        # HTML-шаблон
    ├── index.js          # Точка входа
    ├── styles.css        # Стили
    ├── dom.js            # Манипуляции с DOM
    ├── dragAndDrop.js    # Логика перетаскивания
    └── state.js          # Управление состоянием
```

## 📄 Лицензия

MIT