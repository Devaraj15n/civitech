import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../features/project/projectThunk";

export default function ProjectList() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector(state => state.project);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Projects</h2>
      {list.map(p => (
        <div key={p.id}>
          {p.project_code} - {p.project_name}
        </div>
      ))}
    </div>
  );
}
