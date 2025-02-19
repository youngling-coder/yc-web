from typing import Annotated

from fastapi import FastAPI, Body, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles


from . import smtp
from .settings import application_settings
from . import schemas

app = FastAPI()
app.mount("/static", StaticFiles(directory="static/"), "static")

templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def root(request: Request):

    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/contact")
async def contact(email_scheme: Annotated[schemas.Email, Body()]):

    await smtp.send_email(
        to=application_settings.owner_email,
        subject="Reply To Your Portfolio",
        content=email_scheme.content,
        from_=f"{email_scheme.name_from} ({email_scheme.email_from}) <hello@demomailtrap.com>",
    )
