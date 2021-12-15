import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoSelector, cateList, toDoState, IToDo } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";

const CategoryContainer = styled.div`
	display:flex;
`;

interface IForm {
	title: string;
}

function ToDoList() {
	const toDos = useRecoilValue(toDoSelector);
	const [category, setCategory] = useRecoilState(categoryState);
	const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
		setCategory(event.currentTarget.value as string);
	};
	const [list, setList] = useRecoilState(cateList);
	const { register, handleSubmit, setValue } = useForm<IForm>();
	const handleValid = ({ title }: IForm) => {
		setList((oldToDos) => {
			const result = [...oldToDos, { id: Date.now(), title: title }];
			localStorage.setItem("categorys", JSON.stringify(result));
			return result;
		});
		setValue("title", "");
	};
	const setToDos = useSetRecoilState(toDoState);
	useEffect(() => {
		const savedToDos = localStorage.getItem("todos");
		if (savedToDos !== null) {
			const parsedToDos = JSON.parse(savedToDos);
			setToDos(parsedToDos);
		}
		const savedCategorys = localStorage.getItem("categorys");
		if (savedCategorys !== null) {
			const parsedToDos = JSON.parse(savedCategorys);
			setList(parsedToDos);
		}
	}, [])
	return (
		<div>
			<h1>To Dos</h1>
			<CategoryContainer>
				<select value={category} onInput={onInput}>
					{list.map((item) =>
						<option value={item.title} key={item.id}>{item.title}</option>
					)}
				</select>
				<form onSubmit={handleSubmit(handleValid)}>
					<input
						{...register("title", {
							required: "Please write a Category",
						})}
						placeholder="Write a Category"
					/>
					<button>Add</button>
				</form>
			</CategoryContainer>
			<CreateToDo />
			{toDos?.map((toDo) => (
				<ToDo key={toDo.id} {...toDo} />
			))}
		</div>
	);
}

export default ToDoList;