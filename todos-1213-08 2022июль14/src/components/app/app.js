import React, { Component } from "react";
import { formatDistance } from "date-fns";

import "./app.css";

import TaskList from "../taskList";
import Footer from "../footer/";
import NewTaskForm from "../newTaskForm";

export default class App extends Component {
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
    console.log(`Вы вызвали функцию onEdit!!!!!!!`);
    console.log(`id элемента равен: ${id}`);
    this.setState((edit) => {
      return { edit: true };
    });
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "edit", label)
      };
    });
    console.log(`Новое значение свойства edit: ${this.state.edit}`);

    setTimeout(() => {
      console.log(`todoData ======== `);
      console.log(this.state.todoData);
      console.log(`Новое значение свойства label: `);
      console.log(label);
    }, 1000);
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
    console.log(`this.state.todoData[id]`);
    console.log(this.state.todoData[idx]);
    if (!label) {
      label = this.state.todoData[idx].label;
    }
    console.log(`id  = ${id}`);
    console.log(`Значение label, переданное в toggleProperty: ${label}`);
    console.log(label);

    const oldItem = arr[idx];
    console.log(idx);
    console.log(arr[idx]);
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
    console.log(`Мы внутри функции updateTime`);
    console.log(`Старый массив, который мы модифицируем: `);
    console.log(arr);
    const newArray = arr.map((element, i) => {
      const newItem = element;
      newItem.string = stringArray[i];
      return newItem;
    });
    console.log(`И вот наш новый массив: `);
    console.log(newArray);
    return newArray;
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done")
      };
    });
    console.log(`toggle done ${id}`);
  };

  onToggleFilter = (i, text) => {
    this.setState(({ filter }) => {
      return {
        filter: text
      };
    });
  };

  componentDidMount() {
    this.newTime = setInterval(() => {
      console.log("componentDidMount()");
      const stringArray = this.state.todoData.map((element, i) => {
        console.log("componentDidMount() element::::::::");
        console.log(element.string);
        console.log(`i = ${i}`);
        return formatDistance(new Date(), element.timeStamp, {
          includeSeconds: true
        });
      });
      console.log(`Массив timestampArray == `);
      console.log(stringArray);
      this.setState(() => {
        console.log(`Мы внутри функции SetState!!!`);
        return {
          todoData: this.updateTime(this.state.todoData, stringArray)
        };
      });
    }, 2000);
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
