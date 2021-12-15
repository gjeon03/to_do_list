import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { IToDo, toDoState, cateList } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
	const setToDos = useSetRecoilState(toDoState);
	const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const {
			currentTarget: { name },
		} = event;
		setToDos((oldToDos) => {
			const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
			const newToDo = { text, id, category: name as IToDo["category"] };
			const result = [
				...oldToDos.slice(0, targetIndex),
				newToDo,
				...oldToDos.slice(targetIndex + 1),
			];
			localStorage.setItem("todos", JSON.stringify(result));
			return result;
		});
	};
	const onDelete = () => {
		setToDos((oldToDos) => {
			const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
			const result = [
				...oldToDos.slice(0, targetIndex),
				...oldToDos.slice(targetIndex + 1),
			];
			localStorage.setItem("todos", JSON.stringify(result));
			return result;
		})
	}
	const list = useRecoilValue(cateList);
	return (
		<li>
			<span>{text}</span>
			{list.map((item) => {
				if (category !== item.title) {
					return <button name={item.title} onClick={onClick} key={item.id}>
						{item.title}
					</button>
				}
			})}
			<button onClick={onDelete}>Delete</button>
		</li>
	);
}

export default ToDo;