import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
	toDo: string;
}

function CreateToDo() {
	const [toDos, setToDos] = useRecoilState(toDoState);
	const category = useRecoilValue(categoryState);
	const { register, handleSubmit, setValue } = useForm<IForm>();
	const handleValid = ({ toDo }: IForm) => {
		setToDos((oldToDos) => {
			const result = [{ text: toDo, id: Date.now(), category },
			...oldToDos];
			localStorage.setItem("todos", JSON.stringify(result));
			return result;
		});
		setValue("toDo", "");
	};
	return (
		<form onSubmit={handleSubmit(handleValid)}>
			<input
				{...register("toDo", {
					required: "Please write a To Do",
				})}
				placeholder="Write a to do"
			/>
			<button>Add</button>
		</form>
	);
}

export default CreateToDo;