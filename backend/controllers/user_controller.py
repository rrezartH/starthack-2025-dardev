from fastapi import APIRouter, Depends, HTTPException
from database.dtos.clerk.clerk_user_created_dto import ClerkUserCreatedDto
from database.dtos.clerk.clerk_user_updated_dto import ClerkUserUpdatedDto
from database.commands.user.add_user_command import AddUserCommand
from services.user_service import UserService
from .dependencies import allow_anonymous, get_user_service, require_auth

router = APIRouter()


@router.post(
    "/clerk-webhook/create-user/WEBHOOKURL",
    dependencies=[Depends(allow_anonymous)],
)
async def create_user(
    payload: dict, user_service: UserService = Depends(get_user_service)
):
    if "data" not in payload:
        raise HTTPException(
            status_code=400, detail="Invalid payload: 'data' key missing"
        )

    user_data = payload["data"]
    clerk_user = ClerkUserCreatedDto(**user_data)
    return await user_service.create_clerk_user(clerk_user)


@router.post(
    "/clerk-webhook/update-user/WEBHOOKURL",
    dependencies=[Depends(allow_anonymous)],
)
async def update_user(
    payload: dict, user_service: UserService = Depends(get_user_service)
):
    if "data" not in payload:
        raise HTTPException(
            status_code=400, detail="Invalid payload: 'data' key missing"
        )

    user_data = payload["data"]
    clerk_user = ClerkUserUpdatedDto(**user_data)
    return await user_service.update_clerk_user(clerk_user)


@router.get("/users/{user_id}", dependencies=[Depends(require_auth)])
async def get_user(user_id: str, user_service: UserService = Depends(get_user_service)):
    return await user_service.get_user(user_id)


@router.get("/users/", dependencies=[Depends(require_auth)])
async def list_users(user_service: UserService = Depends(get_user_service)):
    return await user_service.list_users()


@router.delete("/users/{user_id}", dependencies=[Depends(require_auth)])
async def delete_user(
    user_id: str, user_service: UserService = Depends(get_user_service)
):
    return await user_service.delete_user(user_id)
