import fetch from "isomorphic-fetch";

export const SELECT_REDDIT = "SELECT_REDDIT";
export const INVALIDATE_REDDIT = "INVALIDATE_REDDIT";
export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";

export function selectReddit(reddit) {
    return {
        type: SELECT_REDDIT,
        reddit
    };
}

export function invalidateReddit(reddit) {
    return {
        type: INVALIDATE_REDDIT,
        reddit
    };
}

export function requestPosts(reddit) {
    return {
        type: REQUEST_POSTS,
        reddit
    };
}

export function receivePosts(reddit, json) {
    return {
        type: RECEIVE_POSTS,
        reddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    };
}

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function fetchPosts(reddit) {

    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.
    return dispatch => {

        // First dispatch: the app state is updated to inform
        // that the API call is starting.
        dispatch(requestPosts(reddit));

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.
        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.
        return fetch(`http://www.reddit.com/r/${reddit}.json`)
            .then(response => response.json())
            .then(json =>

                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.
                dispatch(receivePosts(reddit, json))
            );

        // In a real world app, you also want to
        // catch any error in the network call.
    };
}

function shouldFetchPosts(state, reddit) {
    const posts = state.postsByReddit[reddit];
    if (!posts) {
        return true;
    } else if (posts.isFetching) {
        return false;
    } else {
        return posts.didInvalidate;
    }
}

export function fetchPostsIfNeeded(reddit) {

    // Note that the function also receives getState()
    // which lets you choose what to dispatch next.
    // This is useful for avoiding a network request if
    // a cached value is already available.
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), reddit)) {
            // Dispatch a thunk from thunk!
            return dispatch(fetchPosts(reddit));
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve();
        }
    };
}
