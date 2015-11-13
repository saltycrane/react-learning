import React, { Component } from "react";
import { render } from "react-dom";
import { Router, Route, Link, IndexRoute, Redirect } from "react-router";

class About extends Component {
    render() {
        return <div>"About"</div>;
    }
}

class Message extends Component {
    render() {
        return <h3>Message {this.props.params.id}</h3>;
    }
}

class Dashboard extends Component {
    render() {
        return (
            <div>Welcome to the app!</div>
        );
    }
}

class Inbox extends Component {
    render() {
        return (
            <div>
                <h2>Inbox</h2>
                {this.props.children || "Welcome to your Inbox"}
            </div>
        );
    }
}

class Home extends Component {
    render() {
        return <div>"Home"</div>;
    }
}

class App extends Component {
    render() {
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/inbox">Inbox</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

render((
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Dashboard} />
            <Route path="about" component={About} />
            <Route path="inbox" component={Inbox}>
                <Route path="/messages/:id" component={Message} />
                <Redirect from="messages/:id" to="/messages/:id" />
            </Route>
        </Route>
    </Router>
), document.getElementById("root"));
