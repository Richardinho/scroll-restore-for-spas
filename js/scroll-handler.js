var scrollHandler = function () {
    var timerId;

    function replaceState() {

        history.replaceState(
            _.extend(history.state || {}, {
                scrollTop: document.body.scrollTop || $(document).scrollTop()
            }),
            document.title,
            window.location
        );
    }

    return function () {

        window.addEventListener('scroll', function () {

            clearTimeout(timerId);

            timerId = setTimeout(replaceState, 50);
        });
    }

}