import React, { useState } from "react";

const TodoList = () => {
	const [tarea, setTarea] = useState("");

	const [TodoList, setTodoList] = useState([]);

	const AddTask = e => {
		e.preventDefault();
		let TodoListAux = [...TodoList, tarea];
		setTodoList(TodoListAux);
		setTarea("");
	};

	const delet = i => {
		let newTodoList = TodoList.filter((element, index) => {
			if (i != index) return element;
		});
		setTodoList(newTodoList);
	};
	return (
		<div className="container">
			<h1> Todo List</h1>
			<form onSubmit={tarea ? AddTask : e => e.preventDefault()}>
				<div className="form-row align-items-center">
					<div className="col-auto">
						<label className="sr-only" htmlFor="inlineFormInput">
							Name
						</label>
						<input
							type="text"
							className="form-control mb-2"
							id="inlineFormInput"
							placeholder="Añadir tarea"
							onChange={e => setTarea(e.target.value)}
							value={tarea}
						/>
					</div>
				</div>

				<div className="col-auto">
					<button type="submit" className="btn btn-primary mb-2">
						Submit
					</button>
				</div>
			</form>
			<div className="list">
				<ul>
					<li></li>
					{TodoList.map((element, index) => {
						return (
							<div key={index}>
								<li>
									{element}
									<button
										onClick={() => {
											delet(index);
										}}>
										delet
									</button>
								</li>
							</div>
						);
					})}
					<li>
						<p>
							{TodoList
								? TodoList.length + " Tareas Restantes"
								: "No hay Tareas, agrega una"}
						</p>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default TodoList;
