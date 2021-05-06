import React, { useState } from "react";

const TodoList = () => {
	const [tarea, setTarea] = useState("");

	const [TodoList, setTodoList] = useState([]);

	const [mouseover, setMouseover] = useState();

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
					<div className="col-9">
						<input
							type="text"
							className="form-control mb-2"
							id="inlineFormInput"
							placeholder="Añadir tarea"
							onChange={e => setTarea(e.target.value)}
							value={tarea}
						/>
					</div>
					<div className="col-3">
						<button type="submit" className="btn btn-primary mb-2">
							Agregar tarea
						</button>
					</div>
				</div>
			</form>
			<div className="list">
				<ul className="col-9 p-1 border border-dark rounded shadow-lg">
					<li></li>
					{TodoList.map((element, index) => {
						return (
							<div
								key={index}
								onMouseOver={() => {
									setMouseover(index);
								}}
								onMouseOut={() => {
									setMouseover();
								}}>
								<li className="border border-secondary rounded shadow-sm p-1 m-1 liFlex">
									{element}

									<button
										type="button"
										className={
											"btn btn-outline-danger noBoton" +
											(mouseover == index ? " Boton" : "")
										}
										onClick={() => {
											delet(index);
										}}>
										X
									</button>
								</li>
							</div>
						);
					})}
					<li className="p-1 m-1">
						<p>
							{TodoList.length == 0
								? "No hay Tareas, agrega una"
								: TodoList.length + " Tareas Restantes"}
						</p>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default TodoList;
