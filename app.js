import TodoListController from './controllers/TodoList.controller.js';

import LoaderComponent from './components/Loader.component.js';
import PaginationComponent from './components/Pagination.component.js';
import TodoListComponent from './components/TodoList.component.js';

const rootElement = document.querySelector('#root');
if (!rootElement) {
  throw new Error(`Can't find root element to render App. Check HTML!`);
}

const todoListController = new TodoListController(
  rootElement,
  TodoListComponent,
  PaginationComponent,
  LoaderComponent
);

// роутинг вроде работает, но нормально не тестил:
const pageStr = new URL(window.location).searchParams.get('page');
const page = +pageStr || 1;
todoListController.on(TodoListController.EVENTS.PAGE_UPDATE, (page) => {
  const url = new URL(window.location);
  url.searchParams.set('page', page);
  window.history.pushState({}, '', url);
});

todoListController.run(+page);
