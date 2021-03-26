import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import About from "./components/About";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

const server_url = "http://localhost:5000/tasks";

function App() {
	const [addTaskBtn, setAddTaskBtn] = useState(false);
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const getTasks = async () => {
			setTasks(await fetchTasks());
		};

		getTasks();
	}, []);

	const addTask = async task => {
		// const id = Math.floor(Math.random() * 10000) + 1;
		// const newTask = { id, ...task };
		// setTasks([...tasks, newTask]);

		const response = await fetch(server_url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(task)
		});

		const data = await response.json();

		setTasks([...tasks, data]);
	};

	const deleteTask = async id => {
		await fetch(`${server_url}/${id}`, { method: "DELETE" });

		setTasks(tasks.filter(task => task.id !== id));
	};

	const fetchTasks = async () => {
		const response = await fetch(server_url);
		const data = await response.json();
		console.log(data);
		return data;
	};

	const fetchTask = async id => {
		const response = await fetch(`${server_url}/${id}`);
		const data = await response.json();
		console.log(data);
		return data;
	};

	const toggleReminder = async id => {
		const taskToToggle = await fetchTask(id);

		const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

		const response = await fetch(`${server_url}/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedTask)
		});

		const data = await response.json();

		setTasks(
			tasks.map(task => {
				if (task.id === id) {
					// return { ...task, reminder: !task.reminder };
					return { ...task, reminder: data.reminder };
				} else {
					return task;
				}
			})
		);
	};

	return (
		<BrowserRouter>
			<div className="container">
				<Header showInputForm={() => setAddTaskBtn(!addTaskBtn)} showAddBtn={addTaskBtn} />
				<Route
					path="/"
					exact
					render={props => (
						<>
							{addTaskBtn && <AddTask addNewTask={addTask} />}
							{tasks.length > 0 ? (
								<Tasks tasks={tasks} removeTask={deleteTask} toggleReminder={toggleReminder} />
							) : (
								"No tasks shown"
							)}
						</>
					)}
				/>
				<Route path="/about" component={About} />
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
