from fastapi import APIRouter, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services.user_service import UserService
from utils.utils import (
    load_yaml,
    get_logger,
    retrieve_user_id_from_request,
)
from fastapi import Depends
from fastapi import Request
from controllers.dependencies import (
    allow_anonymous,
    get_user_service,
    state,
    lifespan,
    require_auth,
)
from controllers.user_controller import router as user_router

logger = get_logger(__name__)

# write logger output to a file
# logger.addHandler(logging.FileHandler("backend.log"))

app = FastAPI(lifespan=lifespan)
router = APIRouter()

app.include_router(user_router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Add a root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to the Axiom API", "status": "running"}



@router.post("/authenticate", dependencies=[Depends(require_auth)])
async def authenticate(
    request: Request, user_service: UserService = Depends(get_user_service)
):
    clerk_user_id = retrieve_user_id_from_request(request)
    if clerk_user_id == "1":
        clerk_user_id = "none"  # in case of development we use a default user id

    user = await user_service.get_user_by_clerk_id(clerk_user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {"status": "authenticated", "user_id": user.id}


@router.post("/authenticate-guest", dependencies=[Depends(allow_anonymous)])
async def authenticate(
    guest_id: str,
    is_first_time_guest: bool = False,
    user_service: UserService = Depends(get_user_service),
):
    user_id = None
    if is_first_time_guest:
        user_id = await user_service.create_guest_user(guest_id)
        if not user_id:
            raise HTTPException(status_code=404, detail="User not found")
    else:
        user = await user_service.get_user_by_guest_id(guest_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        user_id = user.id

    return {"status": "authenticated", "user_id": user_id}

# Add the methods here above the include_router method

app.include_router(router)
