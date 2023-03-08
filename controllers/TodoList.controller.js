import { get } from '../utils/network_utils.js';
import { getErrorRenderer } from '../utils/render_utils.js';

const TODOS_ON_PAGE = 10;
const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

export default class TodoListController {
  static EVENTS = {
    TODOS_UPDATE: 'TODOS_UPDATE',
    TODOS_TOTAL_UPDATE: 'TODOS_TOTAL_UPDATE',
    PAGE_UPDATE: 'PAGE_UPDATE',
  };
  #rootElement;
  #TodoListComponent;
  #PaginationComponent;
  #Loader;
  #todos = [];
  #totalTodos = [];
  #currentPage = 1;

  // Subscribers:
  #todosChangeListeners = [];
  #todosCountChangeListeners = [];
  #pageChangeListeners = [];

  constructor(
    rootElement,
    TodoListComponent,
    PaginationComponent,
    LoaderComponent
  ) {
    this.#rootElement = rootElement;
    this.#PaginationComponent = new PaginationComponent(this.#rootElement, {
      onChange: this.handlePageChange.bind(this),
      currentPage: this.#currentPage,
    });
    this.#TodoListComponent = new TodoListComponent(this.#rootElement, {
      todos: this.#todos,
    });
    this.#Loader = new LoaderComponent(this.#rootElement);
    this.init();
  }

  init() {
    this.on(TodoListController.EVENTS.TODOS_UPDATE, (todos) => {
      this.#TodoListComponent.setTodos(todos);
    });
    this.on(TodoListController.EVENTS.TODOS_TOTAL_UPDATE, () => {
      this.#PaginationComponent.setTotalPages(this.totalPages);
    });
    this.on(TodoListController.EVENTS.PAGE_UPDATE, (newPage) => {
      this.fetchTodos();
      this.#PaginationComponent.setCurrentPage(newPage);
    });
  }

  run(page) {
    this.#PaginationComponent.render();
    this.#TodoListComponent.render();

    if (page !== this.#currentPage) {
      this.setCurrentPage(page);
    } else {
      this.fetchTodos();
    }
  }

  async fetchTodos() {
    this.setLoading(true);
    const { data: todos, total } = await get(
      `${TODOS_URL}?_page=${this.#currentPage}&_limit=${TODOS_ON_PAGE}`,
      this.renderFetchError.bind(this)
    );
    this.setLoading(false);
    this.setTodosTotal(total);
    this.setTodos(todos);
  }

  setTodos(todos) {
    this.#todos = todos;
    this.#todosChangeListeners.forEach((cb) => cb(todos));
  }

  setCurrentPage(page) {
    if (page === this.#currentPage) {
      return;
    }
    this.#currentPage = page;
    this.#pageChangeListeners.forEach((cb) => cb(page));
  }

  setTodosTotal(total) {
    if (total === this.#totalTodos) {
      return;
    }
    this.#totalTodos = total;
    this.#todosCountChangeListeners.forEach((cb) => cb(total));
  }

  get totalPages() {
    return Math.ceil(this.#totalTodos / TODOS_ON_PAGE) || 0;
  }

  handlePageChange = (newPage) => {
    this.setCurrentPage(newPage);
  };

  on(event, cb) {
    switch (event) {
      case TodoListController.EVENTS.TODOS_UPDATE:
        this.#todosChangeListeners.push(cb);
        break;
      case TodoListController.EVENTS.TODOS_TOTAL_UPDATE:
        this.#todosCountChangeListeners.push(cb);
        break;
      case TodoListController.EVENTS.PAGE_UPDATE:
        this.#pageChangeListeners.push(cb);
        break;
      default:
        throw new Error(`Unknown TodoListController event: ${event}`);
    }
  }

  setLoading(value) {
    if (value) {
      this.#PaginationComponent.clear();
      this.#TodoListComponent.clear();
      this.#Loader.render();
    } else {
      this.#Loader.remove();
    }
  }

  renderFetchError(error) {
    this.#Loader.remove();
    this.#PaginationComponent.clear();
    this.#TodoListComponent.clear();
    const render = getErrorRenderer(this.#rootElement);
    render(error);
    throw error;
  }
}
