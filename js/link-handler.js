
function linkHandler (options) {

    var router = options.router;

    return function () {
        $(document).on('click', '[data-internal]', function (event) {
            event.preventDefault();
            var url = event.target.getAttribute('href');
            router.navigate(url, { trigger: true });
        });
    }
}
linkHandler.inject = ['router'];