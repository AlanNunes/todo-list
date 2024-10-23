import random

class TodoItem():
    id: int
    desc: str
    completed: bool

    def __init__(self, desc: str, completed: bool) -> None:
        self.id = random.randint(1, 10000)
        self.desc = desc
        self.completed = completed