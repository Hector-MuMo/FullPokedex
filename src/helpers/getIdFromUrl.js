const getIdFromUrl = (url) => {
  let id = 0,
    split = [];

  split = url.split('/');

  id = split[split.length - 2];

  return id;
};

export default getIdFromUrl;
