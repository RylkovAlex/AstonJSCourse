export const getErrorRenderer = (rootElement) => (error) => {
  rootElement.innerHTML = '';
  rootElement.insertAdjacentHTML('afterbegin', `<h1>${error.message}</h1>`);
};
