import React, { useState } from "react";
import Task from "./Task";

const Tasks = ({ tasks, removeTask, toggleReminder }) => {
	return (
		<>
			{tasks.map(task => (
				<Task key={task.id} task={task} deleteTask={removeTask} onToggle={toggleReminder} />
			))}
		</>
	);
};

export default Tasks;
