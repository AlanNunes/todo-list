interface Props {
  id: number;
  desc: string;
  completed: boolean;
  onToggleCompleted: (id: number) => void;
  onDeleted: (id: number) => void;
}

function TodoItem({
  id,
  desc,
  completed,
  onToggleCompleted,
  onDeleted,
}: Props) {
  return (
    <li className="list-group-item">
      <div className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col col-10" onClick={() => onToggleCompleted(id)}>
            <input
              className="form-check-input me-1"
              type="checkbox"
              checked={completed}
              onClick={(e) => e.stopPropagation()}
              onChange={() => onToggleCompleted(id)}
            />
            <label className="form-check-label">
              {completed ? <del>{desc}</del> : desc}
            </label>
          </div>
          <div className="col">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDeleted(id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default TodoItem;
