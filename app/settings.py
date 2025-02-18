from pydantic_settings import BaseSettings


class ApplicationSettings(BaseSettings):

    smtp_server_host: str
    smtp_server_port: str
    smtp_server_login: str
    smtp_server_password: str
    owner_email: str

    class Config:
        env_file = ".env"


application_settings = ApplicationSettings()
