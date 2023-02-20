const createLiker = () => {
  let rating = 0;
  return {
    like() {
      rating++;
      return this;
    },
    dislike() {
      rating = rating === 0 ? rating : --rating;
      return this;
    },
    val() {
      return rating;
    },
  };
};
