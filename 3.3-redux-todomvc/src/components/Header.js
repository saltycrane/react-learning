import React, { PropTypes, Component } from "react";
import TodoTextInput from "./TodoTextInput";

class Header extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(text) {
        if (text.length !== 0) {
            this.props.addTodo(text);
        }
    }

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <TodoTextInput
                    newTodo
                    onSave={this.handleSave}
                    placeholder="What needs to be done?"
                />
            </header>
        );
    }
}

Header.propTypes = {
    addTodo: PropTypes.func.isRequired
};

export default Header;
