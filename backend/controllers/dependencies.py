from contextlib import asynccontextmanager
import os
import logging
from fastapi import Depends, FastAPI, HTTPException, Request
from services.company_service import CompanyService
from services.user_service import UserService
from prisma.client import Prisma


db = Prisma()
logger = logging.getLogger(__name__)

# Global shared resources
state = {}
data_path = "data"


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handles startup and shutdown processes"""

    logger.info("Connecting to the database...")
    try:
        await db.connect() 
        logger.info("Startup completed successfully")
        yield  # Application runs here

    finally:
        # Disconnect from Prisma
        logger.info("Disconnecting from the database...")
        await db.disconnect()
        state.clear()


def get_db():
    """Dependency to inject Prisma instance"""
    if not db:
        raise HTTPException(status_code=500, detail="Database is not connected")
    return db


def require_auth(request: Request):
    # Skip authentication in development
    if os.getenv("ENVIRONMENT") == "development":
        logger.info("Local development environment detected. Skipping authentication.")
        return allow_anonymous()

    # Original authentication logic
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        raise HTTPException(
            status_code=401,
            detail="You should provide an authentication token in the header.",
        )


def allow_anonymous():
    # This method allows anonymous access to certain endpoints.
    # It is used as a dependency to bypass the authentication check for specific routes.
    return True


def get_user_service(db: Prisma = Depends(get_db)):
    return UserService(db)

def get_company_service(db: Prisma = Depends(get_db)):
    return CompanyService(db)