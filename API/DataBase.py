from TodoItem import TodoItem

class DataBase:
    todos: list[TodoItem]

    def __init__(self) -> None:
        self.todos = [
            TodoItem('.NET Aspire', completed=True),
            TodoItem('React interceptor', completed=False),
            TodoItem('Positional Encoding', completed=False),
            TodoItem('Build a sample gRPC project', completed=False),
        ]

    def get_todos(self):
        return self.todos
    