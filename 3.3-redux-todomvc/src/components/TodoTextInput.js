import React, { Component, PropTypes } from "react";
import classnames from "classnames";

class TodoTextInput extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            text: this.props.text || ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleSubmit(e) {
        const { onSave, newTodo } = this.props;
        const text = e.target.value.trim();

        if (e.which === 13) {
            onSave(text);
            if (newTodo) {
                this.setState({ text: "" });
            }
        }
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleBlur(e) {
        const { newTodo, onSave } = this.props;
        if (!newTodo) {
            onSave(e.target.value);
        }
    }

    render() {
        const { editing, newTodo, placeholder } = this.props;
        return (
            <input
                className={
                    classnames({
                        edit: editing,
                        "new-todo": newTodo
                    })
                }
                type="text"
                placeholder={placeholder}
                autoFocus="true"
                value={this.state.text}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onKeyDown={this.handleSubmit}
            />
        );
    }
}

TodoTextInput.propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    newTodo: PropTypes.bool
};

export default TodoTextInput;
