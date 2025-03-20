from pydantic import BaseModel


class UserDto(BaseModel):
    id: int
    email: str | None = None
    name: str
    gender_id: int | None = None
    birth_date: str | None = None
