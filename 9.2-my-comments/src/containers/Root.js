/* global __DEV__ */
import createHashHistory from "history/lib/createHashHistory";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { Router, Route, Link, History, IndexRedirect } from "react-router";
import { DevTools, DebugPanel, LogMonitor } from "redux-devtools/lib/react";
import { syncReduxAndRouter } from "redux-simple-router";

import configureStore from "../configureStore";
import CommentsContainer from "./CommentsContainer";
import CommentDetailContainer from "./CommentDetailContainer";
import LastCommentContainer from "./LastCommentContainer";
import About from "../components/About";


const store = configureStore();
const history = createHashHistory();

syncReduxAndRouter(history, store);

// oh no, mixins! See here for alternatives:
// https://github.com/rackt/react-router/blob/master/docs/API.md#but-im-using-classes
const Tab = React.createClass({
    mixins: [ History ],
    render() {
        let isActive = this.history.isActive(this.props.to, this.props.query);
        let className = isActive ? "active" : "";

        return (
            <li className={className}><Link {...this.props} /></li>
        );
    }
});

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <div className="navbar-brand">H</div>
                    </div>
                    <ul className="nav navbar-nav">
                        <Tab to="/comments">Comments</Tab>
                        <Tab to="/last">Last Comment</Tab>
                        <Tab to ="/about">About</Tab>
                    </ul>
                </div>
            </nav>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default class Root extends Component {
    render() {
        let devTools = null;

        if (__DEV__) {
            devTools = (
                <DebugPanel top right bottom>
                    <DevTools store={store} monitor={LogMonitor} />
                </DebugPanel>
            );
        }

        return (
            <div>
                <Provider store={store}>
                    <Router history={history}>
                        <Route path="/" component={App}>
                            <Route path="about" component={About} />
                            <Route path="comments/:id" component={CommentDetailContainer} />
                            <Route path="comments" component={CommentsContainer} />
                            <Route path="last" component={LastCommentContainer} />
                            <IndexRedirect to="comments" />
                        </Route>
                    </Router>
                </Provider>
                {devTools}
            </div>
        );
    }
}
