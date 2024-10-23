from fastapi import FastAPI
from TodoItemPostRequest import TodoItemPostRequest
from TodoItemPutRequest import TodoItemPutRequest
from TodoItem import TodoItem
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

todos = [
    TodoItem('.NET Aspire', completed=True),
    TodoItem('React interceptor', completed=False),
    TodoItem('LLM Positional Encoding', completed=False),
    TodoItem('Build a sample gRPC project', completed=False),
]

@app.get("/todos")
async def get():
    return todos

@app.post("/todos")
async def post(item: TodoItemPostRequest):
    todos.append(TodoItem(desc=item.desc, completed=item.completed))
    return item

@app.patch("/todos/{id}/toggle")
async def post(id: int):
    filtered = list(filter(lambda i: i.id == id, todos))
    if filtered:
        filtered[0].completed = False if filtered[0].completed else True
    return filtered

@app.delete("/todos/{id}")
async def post(id: int):
    global todos
    if id in [todo.id for todo in todos]:
        todos = [todo for todo in todos if todo.id != id]