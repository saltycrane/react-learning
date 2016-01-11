import React, { Component } from "react";
import { Router, Route, Link, History, IndexRedirect } from "react-router";

import CommentDetailContainer from "./CommentDetailContainer";
import CommentsContainer from "./CommentsContainer";
import EditCommentContainer from "./EditCommentContainer";
import LastCommentContainer from "./LastCommentContainer";
import About from "../components/About";
import history from "../history";


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

export default class AppWithRouter extends Component {
    render() {
        return (
            <Router history={history}>
                <Route path="/" component={App}>
                    <Route path="about" component={About} />
                    <Route path="comments/:id/edit" component={EditCommentContainer} />
                    <Route path="comments/:id" component={CommentDetailContainer} />
                    <Route path="comments" component={CommentsContainer} />
                    <Route path="last" component={LastCommentContainer} />
                    <IndexRedirect to="comments" />
                </Route>
            </Router>
        );
    }
}
