from pydantic import BaseModel


class AddCompanyCommand(BaseModel):
    name: str
    initiative: str
    challenge: str
    cta: str
    description: str
    country: str
