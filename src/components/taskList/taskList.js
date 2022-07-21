import React from "react";

import Task from "../task";

import "./taskList.css";

const TaskList = ({ todos, onDeleted, onEdit, onToggleDone, filter }) => {
  // console.log(`Эту информацию мы передали из App.js
  // в TaskList в качестве todos:`);
  // console.log(todos);

  const elements = todos.map((item) => {
    // console.log(`Элемент массива todos: `);
    // console.log(item);
    const { id, ...itemProps } = item;
    //console.log(itemProps);
    return (
      <Task
        {...item}
        key={id}
        id={id}
        onDeleted={() => onDeleted(id)}
        onEdit={onEdit}
        onToggleDone={() => onToggleDone(id)}
        done={item.done}
        itemProps={itemProps}
      />
    );
  });
  // console.log(`И вот мы создали массив elements`);
  // console.log(elements);

  const elementsDone = elements.filter((element) => {
    if (element) {
      return element.props.done;
    }
  });

  const elementsActive = elements.filter((element) => {
    if (element) {
      return !element.props.done;
    }
  });

  let arrayFiltetered;

  if (filter === "Completed") {
    arrayFiltetered = elementsDone;
  } else if (filter === "Active") {
    arrayFiltetered = elementsActive;
  } else {
    arrayFiltetered = elements;
  }

  return <ul className="todo-list">{arrayFiltetered}</ul>;
};

export default TaskList;
