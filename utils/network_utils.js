export const get = async (url, errorHandler = console.error) => {
  return await fetch(url)
    .then(async (response) => {
      const { status } = response;
      switch (status) {
        case 200:
          const headers = new Map(response.headers);
          const data = await response.json();
          return {
            data,
            total: headers.get('x-total-count') || null,
          };
        case 400:
          throw new Error(`Bad Request... check response url and try again!`);
        case 404:
          throw new Error(
            `Sorry! Todos not Found, check response url and try again!`
          );
        case 500:
          throw new Error(`Sorry! Internal Server Error, try again later!`);
        default:
          if (status < 500 || status > 400) {
            throw new Error(
              `Unknown Client Error. Check your network and response url`
            );
          }
          if (status > 500) {
            throw new Error(`Sorry! Unknown Server Error...`);
          }
          throw new Error(`Sorry! Unknown  Error...`);
      }
    })
    .catch(errorHandler);
};
