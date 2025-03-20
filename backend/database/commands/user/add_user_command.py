from datetime import datetime
from pydantic import BaseModel


class AddUserCommand(BaseModel):
    id: str
    email: str
    name: str
    gender: bool
    birth_date: datetime
    activation_date: datetime
    location: str
