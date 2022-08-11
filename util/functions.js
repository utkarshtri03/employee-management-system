const keepOnlyWantedKeys = (obj, keys) => {
  let newObj = {};
  for (let key in obj) {
    if (keys.indexOf(key) !== -1) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
};

module.exports = { keepOnlyWantedKeys };
