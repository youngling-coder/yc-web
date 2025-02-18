from pydantic import BaseModel, EmailStr


class Email(BaseModel):
    name_from: str
    email_from: EmailStr
    content: str
