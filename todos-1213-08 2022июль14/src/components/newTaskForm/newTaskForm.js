import React, { Component } from "react";

import "./newTaskForm.css";

export default class NewTaskForm extends Component {
  state = {
    label: ""
  };

  onLabelChange = (event) => {
    console.log("Вы вызвали функцию onLabelChange");
    console.log(event.target.value);
    this.setState({ label: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={this.state.label}
          autoFocus
        ></input>
      </form>
    );
  }
}
