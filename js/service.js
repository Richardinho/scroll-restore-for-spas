var service = function () {
  return {
    getData: () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(); 
        }, 400);
      });
    } 
  }
}
