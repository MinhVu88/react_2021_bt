import React, { useState } from "react";

const AddTask = ({ addNewTask }) => {
	const [text, setText] = useState("");
	const [date, setDate] = useState("");
	const [reminder, setReminder] = useState(false);

	const submitTask = e => {
		e.preventDefault();

		if (!text) {
			alert("plz add a task");
			return;
		}

		addNewTask({ text, date, reminder });

		// clear the form after a new task's saved
		setText("");
		setDate("");
		setReminder(false);
	};

	return (
		<form className="add-form" onSubmit={submitTask}>
			<div className="form-control">
				<label>Task</label>
				<input
					type="text"
					placeholder="Add Task"
					value={text}
					onChange={e => setText(e.target.value)}
				/>
			</div>
			<div className="form-control">
				<label>Date & Time</label>
				<input
					type="text"
					placeholder="Add Date & Time"
					value={date}
					onChange={e => setDate(e.target.value)}
				/>
			</div>
			<div className="form-control form-control-check">
				<label>Set Reminder</label>
				<input
					type="checkbox"
					checked={reminder}
					value={reminder}
					onChange={e => setReminder(e.currentTarget.checked)}
				/>
			</div>
			<input className="btn btn-block" type="submit" value="Save Task" />
		</form>
	);
};

export default AddTask;
