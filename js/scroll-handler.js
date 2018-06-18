var scrollHandler = function () {
  var timerId;

  function replaceState() {
    let scrollTop = window.pageYOffset;
    history.replaceState(
      _.extend(history.state || {}, {
        scrollTop: scrollTop 
      }),
      document.title,
      window.location
    );
  }

  return function () {
    window.addEventListener('scroll', function () {
      //clearTimeout(timerId);

      //     timerId = setTimeout(replaceState, 50);
    });
  }
}
