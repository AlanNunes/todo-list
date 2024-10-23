import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

interface IItem {
  id: number;
  desc: string;
  completed: boolean;
}

function TodoList() {
  const [items, setItems] = useState<IItem[]>(() => {
    const localItems = localStorage.getItem("items");
    if (localItems == null) return [] as IItem[];
    return JSON.parse(localItems) as IItem[];
  });

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('http://localhost:8000/todos');
      const todos = await res.json() as IItem[];
      setItems(todos);
    }

    fetchTodos();
  }, []);
  
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    console.log("Items updated in local storage successfully")
  }, [items]);
  
  const [desc, setDesc] = useState("");

  async function AddItem(desc: string) {
    if (!desc) return;

    await fetch('http://localhost:8000/todos', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'desc': desc, completed: false})
    })
    .catch(console.error);
      
    setItems((items) => {
      return [...items, { id: Math.random(), desc: desc, completed: false }];
    });
    setDesc("");
  }

  async function ToggleCompleted(id: number) {
    await fetch(`http://localhost:8000/todos/${id}/toggle`, {
      method: 'PATCH'
    }).catch(console.error);

    setItems((items) => {
      return items.map(item => {
        if (item.id === id) return {...item, completed: !item.completed}
        return item
      });
    });
  }

  async function Delete(id: number) {
    await fetch(`http://localhost:8000/todos/${id}`, {
      method: 'DELETE'
    }).catch(console.error);

    setItems((items) => {
      return items.filter((i) => i.id !== id);
    });
  }
  return (
    <>
      <div className="container-sm text-center">
        <div className="row">
          <h1>Personal To-Do List</h1>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col-8">
            <input
              type="text"
              id="desc"
              className="form-control"
              value={desc}
              aria-describedby="descdHelpBlock"
              onChange={(e) => setDesc(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") AddItem(e.currentTarget.value);
              }}
            ></input>
          </div>
          <div className="d-grid col-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => AddItem(desc)}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <p></p>
      <div className="container-sm text-center">
        <div className="row justify-content-center">
          <div className="col col-8">
            <ul className="list-group">
              {items.map((item) => (
                <TodoItem
                  key={item.id}
                  id={item.id}
                  desc={item.desc}
                  completed={item.completed}
                  onToggleCompleted={ToggleCompleted}
                  onDeleted={Delete}
                ></TodoItem>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoList;
