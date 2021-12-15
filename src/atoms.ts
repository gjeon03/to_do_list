import { atom, selector } from "recoil";

export interface IToDo {
	text: string;
	id: number;
	category: string;
}

export interface ICatagoryList {
	id: number;
	title: string;
}

export const categoryState = atom({
	key: "category",
	default: "To Do",
});

export const cateList = atom<ICatagoryList[]>({
	key: "list",
	default: [{id:Date.now(), title:"To Do"}]
});

export const toDoState = atom<IToDo[]>({
	key: "toDo",
	default: [],
});

export const toDoSelector = selector({
	key: "toDoSelector",
	get: ({ get }) => {
		const toDos = get(toDoState);
		const category = get(categoryState);
		return toDos.filter((toDo) => toDo.category === category);
	},
});