import React, { Component } from "react";

import "./task.css";

export default class Task extends Component {
  state = {
    label: this.props.itemProps.label
  };

  newValue = "";
  editing = false;
  taskClassName = "view";
  editClassName = "view";

  onLabelChange = (event) => {
    this.newValue = event.target.value;
    this.setState({ label: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onEdit(this.props.id, this.state.label);
    this.editing = false;
    this.setState({
      label: this.state.label
    });
  };

  componentDidMount() {
    document.getElementById("edit").focus();
  }

  render() {
    // console.log(`Это параметры, переданные в Task.js в качестве this.props`)
    // console.log(this.props)

    const { id, onToggleDone, onDeleted, string } = this.props;
    // console.log(`id = ${id}`);
    // console.log(`onToggleDone = ${onToggleDone}`);
    // console.log(`string = ${string}`);
    // console.log(`onDeleted = ${onDeleted}`);

    if (this.props.done) {
      this.classNames = "completed";
      this.checked = true;
    } else {
      this.checked = false;
      this.classNames = "";
    }

    if (this.editing === true) {
      this.taskClassName += " hidden";
      this.editClassName = "view";
    } else {
      this.taskClassName = "view";
      this.editClassName += " hidden";
    }

    return (
      <div>
        <li id={id} className={this.classNames}>
          <div className={this.taskClassName}>
            <input
              className="toggle"
              type="checkbox"
              onChange={onToggleDone}
              checked={this.checked}
            ></input>
            <label>
              <span className="description" onClick={onToggleDone}>
                {this.state.label}
              </span>
              <span className="created">{string}</span>
            </label>
            <button
              className="icon icon-edit"
              onClick={() => {
                // console.log(this.state.label);
                this.editing = true;
                // console.log(this.editing);
                this.props.onEdit(id, this.newValue);
              }}
            ></button>
            <button className="icon icon-destroy" onClick={onDeleted}></button>
          </div>
        </li>
        <li className="editing">
          <div className={this.editClassName}>
            <form onSubmit={this.onSubmit}>
              <input
                id="edit"
                className="edit"
                type="text"
                onChange={this.onLabelChange}
                value={this.state.label}
                ref={(input) => input && input.focus()}
                autoFocus
              ></input>
            </form>
          </div>
        </li>
      </div>
    );
  }
}
