import AbstractComponent from './Abstract.component.js';

export default class PaginationComponent extends AbstractComponent {
  static PAGE = {
    PREVIOUS: 'PREVIOUS',
    BEFORE: 'BEFORE',
    NEXT: 'NEXT',
    AFTER: 'AFTER',
  };
  #onChange;
  #currentPage;
  #totalPages;
  #css = `
  .paginator {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 50%;
    margin: 0 auto;
    color: rgb(61 177 243);
  }
  .paginator a[aria-current ="page"] {
    text-decoration: underline;
  }
  .paginator li {
    display: block;
    width: 20%;
    text-align: center;
  }
  .paginator a {
    display: block;
  }
  @media screen and (max-width: 900px) {
    .paginator {
      width: auto;
    }
  }
  `.trim();

  _tagName = 'nav';

  constructor(rootElement, { onChange, currentPage = 0, totalPages = 0 }) {
    super(rootElement);
    this.#onChange = onChange;
    this.#currentPage = currentPage;
    this.#totalPages = totalPages;

    this.init();
  }

  init() {
    super.init();
    document.head.insertAdjacentHTML(
      'beforeBegin',
      `<style>${this.#css}</style>`
    );
    this.getElement().addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(evt) {
    evt.preventDefault();
    if (evt.target.tagName.toLowerCase() !== 'a') {
      return;
    }
    const { page } = evt.target.dataset;
    let newPage;
    switch (page) {
      case PaginationComponent.PAGE.PREVIOUS:
        if (this.#currentPage !== 1) {
          newPage = this.#currentPage - 1;
        }
        break;
      case PaginationComponent.PAGE.BEFORE:
        newPage = this.#currentPage - 2;
        break;
      case PaginationComponent.PAGE.NEXT:
        if (this.#currentPage !== this.#totalPages) {
          newPage = this.#currentPage + 1;
        }
        break;
      case PaginationComponent.PAGE.AFTER:
        newPage = this.#currentPage + 2;
        break;
      default:
        newPage = +page;
    }
    if (Number.isFinite(newPage) && newPage !== this.#currentPage) {
      this.#onChange(newPage);
    }
  }

  getHTML() {
    if (!this.#totalPages || !this.#currentPage) {
      return '<ul></ul>';
    } else if (this.#totalPages === 1) {
      return `<ul class="paginator">
        <li><a href="#" aria-current="page" data-page="1">1</a></li>
      </ul>`;
    }
    const pages = [this.#currentPage];
    if (this.#currentPage !== 1) {
      const previousPage = this.#currentPage - 1;
      pages.unshift(previousPage);
      if (previousPage > 1) {
        pages.unshift(PaginationComponent.PAGE.BEFORE);
      }
    }
    if (this.#currentPage !== this.#totalPages) {
      const nextPage = this.#currentPage + 1;
      pages.push(nextPage);
      if (nextPage !== this.#totalPages) {
        pages.push(PaginationComponent.PAGE.AFTER);
        pages.push(this.#totalPages);
      }
    }

    const pagesHtml = pages
      .map((value) => {
        if (
          value === PaginationComponent.PAGE.BEFORE ||
          value === PaginationComponent.PAGE.AFTER
        ) {
          return `<li><a href="#" data-page="${value}">...</a></li>`;
        }
        return `<li><a href="#" data-page="${value}" ${
          value === this.#currentPage ? 'aria-current="page"' : ''
        }>${value}</a></li>`;
      })
      .join('');

    return `
      <ul class="paginator">
        <li><a href="#" data-page="${
          PaginationComponent.PAGE.PREVIOUS
        }" disabled=${this.#currentPage === 1}>предыдущая</a></li>
        ${pagesHtml}
        <li><a href="#" data-page="${PaginationComponent.PAGE.NEXT}" disabled=${
      this.#currentPage === this.#totalPages
    }>следующая</a></li>
      </ul>
    `.trim();
  }

  setCurrentPage(value) {
    if (this.#currentPage !== value) {
      this.#currentPage = value;
    }
    this.update();
  }

  setTotalPages(value) {
    if (this.#totalPages !== value) {
      this.#totalPages = value;
    }
    this.update();
  }
}
