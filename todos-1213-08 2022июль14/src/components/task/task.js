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
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("Вы вызвали функцию onLabelChange");
    console.log(event.target.value);
    console.log(
      "Новое значение this.state.label: 7777777777777777777777777777777777777777 "
    );
    this.newValue = event.target.value;
    console.log(event.target.value);
    this.setState({ label: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onEdit(this.props.id, this.state.label);
    //this.props.onItemAdded(this.state.label);
    this.editing = false;
    this.setState({
      label: this.state.label
    });
  };

  componentDidMount() {
    document.getElementById("edit").focus();
  }

  render() {
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
        <li id={this.props.id} className={this.classNames}>
          <div className={this.taskClassName}>
            <input
              className="toggle"
              type="checkbox"
              onChange={this.props.onToggleDone}
              checked={this.checked}
            ></input>
            <label>
              <span className="description" onClick={this.props.onToggleDone}>
                {this.state.label}
              </span>
              <span className="created">{this.props.string}</span>
            </label>
            <button
              className="icon icon-edit"
              onClick={() => {
                console.log("22222222222222222222222222222222222");
                console.log(this.state.label);
                this.editing = true;
                console.log(this.editing);
                this.props.onEdit(this.props.id, this.newValue);
              }}
              //onEdit={() => onEdit(id, itemProps.label)}
            ></button>
            <button
              className="icon icon-destroy"
              onClick={this.props.onDeleted}
            ></button>
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
