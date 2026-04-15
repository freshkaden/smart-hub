import { useState, useEffect } from 'react';

function TodoList({ searchQuery }) {
	const [items, setItems] = useState(() => {
		const savedTasks = localStorage.getItem('my_tasks');
		return savedTasks ? JSON.parse(savedTasks) : [];
	});

	const [input, setInput] = useState("");

	useEffect(() => {
		localStorage.setItem('my_tasks', JSON.stringify(items));
	}, [items]);

	// add item to my_tasks locally stored task list 
	const addItem = () => {
		if (input.trim()) {
			setItems([...items, input]);
			setInput("");
		}
	};

	// delete item based on its name, also deletes duplicate tasks
	const removeItem = (taskToDelete) => {
		setItems(items.filter((item) => item !== taskToDelete));
	};

	// search for a task, not case sensitive
	const filteredItems = items.filter((item) => {
		if (!searchQuery) return true;
		return item.toLowerCase().includes(searchQuery.toLowerCase());
	});

	return (
		<div className="todo-container">
			<h2 className="todo-header">Today's Task List</h2>
			<div className="todo-inputs">
				<input
					className="todo-input"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Enter new task here"
				/>
				<button className="todo-add-button" onClick={addItem}>Add</button>
			</div>

			<ul className="todo-list">
				{filteredItems.length > 0 ? (
					filteredItems.map((task, index) => (
						<li key={index} className="todo-item">
							<span>{task}</span>
							<button 
								className="todo-delete-button" 
								onClick={() => removeItem(task)}
							>
								Delete
							</button>
						</li>
					))
				) : (
					<p className="todo-empty-state">
						{searchQuery ? "Searching... No matching tasks found." : "No tasks yet!"}
					</p>
				)}
			</ul>
		</div>
	);
}

export default TodoList;