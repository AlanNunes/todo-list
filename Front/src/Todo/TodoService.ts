
import { IItem } from './TodoList'
const BASE_URL = 'http://localhost:8000'

export const fetchTodos = async () => {
    const res = await fetch(`${BASE_URL}/todos`);
    return await res.json() as IItem[];
}

export const createTodoItem = async (desc: string, completed: boolean) => {
    const res = await fetch(`${BASE_URL}/todos`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({desc, completed})
    });
    return await res.json();
}