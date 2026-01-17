import { useDispatch } from "react-redux";
import { addProject } from "../../../features/project/projectThunk";

export default function ProjectForm() {
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();

    const data = {
      project_code: e.target.code.value,
      project_name: e.target.name.value
    };

    dispatch(addProject(data));
    e.target.reset();
  };

  return (
    <form onSubmit={submit}>
      <input name="code" placeholder="Project Code" />
      <input name="name" placeholder="Project Name" />
      <button>Add</button>
    </form>
  );
}
