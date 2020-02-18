module.exports = function AssetsQueue() {
  // Assets list and their dependencies
  // ex: { 'a': ['b', 'c', 'd'] , 'b': ['c'], 'c': [], 'd': ['b', 'c'] }
  const assetsList = [];

  // List of assets paths
  // ex: { 'a': './path/to/..' , 'b': '...', 'c': '...', 'c': '...' }
  const pathsList = [];

  // List of sorted assets
  // ex: ['c', 'b', 'd', 'a']
  const sortedList = [];

  // Sorts assest list according their dependencies
  const sortList = (list) => {
    list.forEach(item => {
      if (assetsList[item] && assetsList[item].length) {
        sortList(assetsList[item]);
      }

      if (!sortedList.includes(item)) {
        sortedList.push(item);
      }
    });
  }

  return {
    enqueue: (name, path, deps) => {
      // Add asset to the assets list
      assetsList[name] = deps;
      // Add assest's path to the paths list
      pathsList[name] = path;
    },
    getPaths: () => {
      // Sorting assets
      sortList(Object.keys(assetsList));

      return sortedList.map(asset => ( {
        name: asset,
        path: pathsList[asset]
      } ) );
    }
  }
}
