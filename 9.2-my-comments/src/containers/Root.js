/* global __DEV__ */

import React, { Component } from "react";
import { Provider } from "react-redux";
import { DevTools, DebugPanel, LogMonitor } from "redux-devtools/lib/react";
import { Router, Route, Link, IndexRoute, History } from "react-router";

import configureStore from "../configureStore";
import CommentsContainer from "./CommentsContainer";
import CommentDetailContainer from "./CommentDetailContainer";


const store = configureStore();


class Home extends Component {
    render() {
        return (
            <h3>Home</h3>
        );
    }
}


class About extends Component {
    render() {
        return (
            <h3>About</h3>
        );
    }
}


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
                        <Link className="navbar-brand" to="/">Home</Link>
                    </div>
                    <ul className="nav navbar-nav">
                        <Tab to="/comments">Comments</Tab>
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
                        <div className="col-md-8">
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
                    <Router>
                        <Route path="/" component={App}>
                            <IndexRoute component={Home} />
                            <Route path="about" component={About} />
                            <Route path="comments/:id" component={CommentDetailContainer} />
                            <Route path="comments" component={CommentsContainer} />
                        </Route>
                    </Router>
                </Provider>
                {devTools}
            </div>
        );
    }
}
