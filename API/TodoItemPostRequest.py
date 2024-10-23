from pydantic import BaseModel, Field

class TodoItemPostRequest(BaseModel):
    desc: str
    completed: bool = Field(default=False)