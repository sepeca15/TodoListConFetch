import React, { useState, useEffect } from "react";

const TodoList = () => {
	const [tarea, setTarea] = useState();

	const [TodoList, setTodoList] = useState([]);

	const [mouseover, setMouseover] = useState();

	const [showError, setShowError] = useState(false);

	useEffect(() => {
		createUser();
		getData();
	}, []);

	const AddTask = e => {
		e.preventDefault();
		createUser();
		let TodoListAux = [...TodoList, { label: tarea, done: false }];
		setTodoList(TodoListAux);
		setTarea("");
		subirData(TodoListAux);
	};

	const delet = i => {
		let newTodoList = TodoList.filter((element, index) => {
			if (i != index) return element;
		});
		setTodoList(newTodoList);
		subirData(newTodoList);
		createUser();
	};

	const getData = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/sebastian")
			.then(resp => resp.json())
			.then(data => setTodoList(data))
			.catch(error => setShowError(true));
	};

	const subirData = updatedList => {
		let updatedListToSend = JSON.stringify(updatedList);
		let options = {
			method: "PUT",
			body: updatedListToSend,
			headers: {
				"Content-Type": "application/json"
			}
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/sebastian",
			options
		)
			.then(resp => resp.json())
			.then(data => console.log(data))
			.catch(error => console.log(error));
	};

	const deletData = deletTodoList => {
		let deletTodoListSend = deletTodoList;
		let optionsDelet = {
			method: "DELETE",
			body: deletTodoListSend,
			headers: {
				"Content-Type": "application/json"
			}
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/sebastian",
			optionsDelet
		)
			.then(resp => resp.json())
			.then(data => console.log(data))
			.catch(error => console.log(error));
	};

	const createUser = () => {
		let optionsCreateUser = {
			method: "POST",
			body: []
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/sebastian",
			optionsCreateUser
		)
			.then(resp => resp.json())
			.then(data => console.log(data))
			.catch(error => console.log(error));
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
								<li className="border-bottom border-secondary rounded shadow-sm p-1 m-1 liFlex">
									{showError ? "Cargando..." : element.label}

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
