import AbstractComponent from './Abstract.component.js';

export default class TodoListComponent extends AbstractComponent {
  static getTodoHTML(todo) {
    const { title, completed } = todo;
    const clases = ['todo-item'];
    if (completed) {
      clases.push('done');
    }
    return `<li class="${clases.join(' ')}">
    <h1>${title}</h2><h2>${completed ? 'Выполнена' : 'В процессе'}</h2>
      </li>`;
  }

  _tagName = 'ul';
  #todos = [];
  #css = `
  .todo-list {
    display: flex;
    justify-content: space-between;
    margin-right: -30px;
    flex-wrap: wrap;
  }

  .todo-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    margin-right: 30px;

    width: 300px;
    min-height: 300px;
    background-color: wheat;
    border: 1px solid gray;
    padding: 0 20px;
  }

  .todo-item h1, .todo-item h2 {
    text-align: center;
  }

  .todo-item:hover {
    outline: 2px solid rgb(61 177 243);
  }

  .todo-item.done {
    background-color: gray;
    opacity: 0.5;
  }

  `;

  constructor(rootElement, { todos }) {
    super(rootElement);
    this.#todos = todos;
    this.init();
  }

  getHTML() {
    return this.#todos.length
      ? this.#todos.reduce(
          (html, todo) => html + TodoListComponent.getTodoHTML(todo),
          ''
        )
      : '';
  }

  init() {
    document.head.insertAdjacentHTML(
      'afterBegin',
      `<style>${this.#css}</style>`
    );
    this.getElement().classList.add('todo-list');
  }

  setTodos(todos) {
    if (todos !== this.#todos) {
      this.#todos = todos;
      this.update();
    }
  }
}
