import React, { Component } from "react";
import { formatDistance } from "date-fns";

import "./app.css"

import TaskList from "../taskList";
import Footer from "../footer/";
import NewTaskForm from "../newTaskForm";

export default class App extends Component {
  static defaultProps = {
    updateInterval: 2500
  };

  static propTypes = {
    updateInterval: (props, propName, componentName) => {
      const value = props[propName];

      if (typeof value === "number" && !isNaN(value)) {
        return null;
      }

      return new TypeError(`${componentName}: ${propName} должно быть числом!`);
    }
  };

  maxId = 0;

  state = {
    todoData: [
      this.createTodoItem("Drink coffee", new Date()),
      this.createTodoItem("Make Awesome App", new Date()),
      this.createTodoItem("Have a lunch", new Date())
    ],
    buttons: ["All", "Active", "Completed"],
    filter: "All",
    edit: false
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text, new Date());
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return { todoData: newArray };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return { todoData: newArray };
    });
  };

  clearCompleted = () => {
    this.state.todoData.forEach((item) => {
      if (item.done) {
        this.deleteItem(item.id);
      }
    });
  };

  editItem = (id, label) => {
    this.setState(() => {
      return { edit: true };
    });
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "edit", label)
      };
    });
  };

  createTodoItem(label, timeStamp) {
    return {
      label,
      done: false,
      edit: false,
      id: this.maxId++,
      timeStamp,
      string: formatDistance(new Date(), timeStamp, {
        includeSeconds: true
      })
    };
  }

  toggleProperty(arr, id, propName, label) {
    const idx = arr.findIndex((el) => el.id === id);
    if (!label) {
      label = this.state.todoData[idx].label;
    }

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
      label: label
    };
    //1. Update object
    //2. Construct newArray
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  updateTime(arr, stringArray) {
    arr = this.state.todoData;
    // console.log(`Старый массив, который мы модифицируем: `);
    // console.log(arr);
    const newArray = arr.map((element, i) => {
      const newItem = element;
      newItem.string = stringArray[i];
      return newItem;
    });
    // console.log(`И вот наш новый массив: `);
    // console.log(newArray);
    return newArray;
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done")
      };
    });
    //console.log(`toggle done ${id}`);
  };

  onToggleFilter = (i, text) => {
    this.setState(() => {
      return {
        filter: text
      };
    });
  };

  componentDidMount() {
    this.newTime = setInterval(() => {
      const stringArray = this.state.todoData.map((element) => {
        return formatDistance(new Date(), element.timeStamp, {
          includeSeconds: true
        });
      });
      this.setState(() => {
        return {
          todoData: this.updateTime(this.state.todoData, stringArray)
        };
      });
    }, this.props.updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.newTime);
  }

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={todoData}
            onDeleted={this.deleteItem}
            onEdit={this.editItem}
            onToggleDone={this.onToggleDone}
            filter={this.state.filter}
          />
          <Footer
            toDo={todoCount}
            onToggleFilter={this.onToggleFilter}
            clearCompleted={this.clearCompleted}
            buttons={this.state.buttons}
            filter={this.state.filter}
          />
        </section>
      </section>
    );
  }
}
