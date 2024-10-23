from pydantic import BaseModel, Field

class TodoItemPutRequest(BaseModel):
    id: int
    desc: str
    completed: bool = Field(default=False)