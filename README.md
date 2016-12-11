## Manual scroll restoration for single page applications

### Behaviour of a web page
When a user navigates between pages in their history  using the back and forward buttons, browsers such as Chrome remember the scroll position and restore the page to the position it was in when the user left it.

In my view, the behaviour of this feature is unpredictable and buggy in Chrome. In several tests that I ran I was unable to achieve consistent and reliable results. 

The purpose of this article is to discuss solutions to manually implementing this functionality.

### Implementation

Scroll restoration requires saving the scroll position of the page as the user navigates away from it  via a link or through the back/forward buttons. Then when the user returns to this page by navigating through the history, retrieving this data and resetting the scroll position within the page.

There are three steps to consider: 1. How to detect when the user is navigating away from the page, 2. Where to store the scroll data so that it can be retrieved, and 3. retrieving the value and setting the scroll amount.


#### Where to store the scroll data?
Taking the second step first, the obvious place to store the scroll data is within the history object itself. This means as the user navigates through the history we can always count on the data for the particular page they are on being available. The history object does in fact allow an arbitrary json object to be stored within the history state.

#### How to retrieve the scroll data ?
The third step is made trivial by the solution to the second. When the popstate event is fired, our code has access to the history state object and can read the scroll value for the loaded page from that.

```
function replaceState() {

    history.replaceState(
        _.extend(history.state || {}, { 
            scrollTop: document.body.scrollTop 
        }),
        document.title,
        window.location
    );
}
```

####  When to update the history state?

The trickiest part of the problem turns out to be when to set the history state. Unfortunately the methods and events provided by the history API do not help us: The popstate event is too late for us because at this point the history state represents the incoming page, not the outgoing page who's state we want to amend. pushState() on the other hand is too early because it runs before the user has even begun interacting with the page. 

##### Setting state within a link handler
One idea is to set the scroll position within the function that runs when the user clicks on a link. The problem with this is that the handler will not run when the user navigates away from the page using the back/forward buttons so the scroll position of a page that you leave when you click back will not be recorded.


An example of this approach can be found on this page.
http://blog.nikc.org/2013/12/03/managing-scrolltop-in-your-backbone-single-page-app/

```
// A global a.onclick event handler for all your navigational needs
// see e.g. Backbone Boilerplate for a more complete example
$(document).on("click", "a", function (ev) {
    ev.preventDefault();

    // Replace current state before triggering the next route, 
    // storing the scrollTop in the state object
    
    replaceState();

    Backbone.history.navigate(this.pathname, { trigger: true });
});
```

##### Solution: Setting state within a scroll handler

A better solution is to hook into the scroll event. The idea is that we detect whenever the user has stopped scrolling and update the scroll state then.
The scroll handler sets a timer which on expiration will call our update function. The scroll handler  cancels the current timer so the timer will only reach expiration and run the update function when the user has ceased scrolling after a set period of time.

```

    window.addEventListener('scroll', function () {

        clearTimeout(timerId);

        timerId = setTimeout(replaceState, 50);
    });

```
Clearly this is not a perfect solution. Scroll handlers have a potential performance impact and there is also a small possibility of a race condition where the user navigates away from the page before the timer expires. This is unlikely if the time period is small enough and even if it does happen the consequences are only that the scroll position would be inaccurate. It would be much preferable to have a general event that fired whenever the user navigated away from a page which gave us the option of editing the state of the history item for the outgoing page.

#### conclusion
Emulating normal browser behaviour in a single page app is key to providing a good user experience. Users expect browsers to remember their scroll position when they return to a page using the back/forward buttons. Modern browsers' attempts to do this are less than satisfactory but it is possible for authors to create their own implementation.
