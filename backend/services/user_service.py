from datetime import datetime
from fastapi import HTTPException
from prisma.client import Prisma
from database.dtos.clerk.clerk_user_created_dto import ClerkUserCreatedDto
from database.dtos.clerk.clerk_user_updated_dto import ClerkUserUpdatedDto
from prisma.models import User


class UserService:
    def __init__(self, db: Prisma):
        self.db = db

    async def create_clerk_user(self, user: ClerkUserCreatedDto) -> User:
        try:
            email = (
                user.email_addresses[0].email_address if user.email_addresses else None
            )
            phone_number = (
                user.phone_numbers[0].get("phone_number")
                if user.phone_numbers
                else None
            )

            return await self.db.user.create(
                data={
                    "clerk_id": user.id,
                    "username": user.username,
                    "email": email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "profile_image_url": user.profile_image_url,
                    "phone_number": phone_number,
                    "created_at": (
                        datetime.fromtimestamp(user.created_at / 1000)
                        if user.created_at
                        else None
                    ),
                    "updated_at": (
                        datetime.fromtimestamp(user.updated_at / 1000)
                        if user.updated_at
                        else None
                    ),
                }
            )
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Database create failed: {str(e)}"
            )

    async def create_guest_user(self, guest_id: str) -> int:
        try:
            user = await self.db.user.create(
                data={
                    "guest_id": guest_id,
                    "username": guest_id,
                }
            )
            return user.id
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Database create failed: {str(e)}"
            )

    async def update_clerk_user(self, user: ClerkUserUpdatedDto) -> User:
        try:
            email = (
                user.email_addresses[0].email_address if user.email_addresses else None
            )
            phone_number = (
                user.phone_numbers[0].get("phone_number")
                if user.phone_numbers
                else None
            )

            return await self.db.user.update(
                where={"clerk_id": user.id},
                data={
                    "username": user.username,
                    "email": email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "profile_image_url": user.profile_image_url,
                    "phone_number": phone_number,
                    "created_at": (
                        datetime.fromtimestamp(user.created_at / 1000)
                        if user.created_at
                        else None
                    ),
                    "updated_at": (
                        datetime.fromtimestamp(user.updated_at / 1000)
                        if user.updated_at
                        else None
                    ),
                },
            )
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Database update failed: {str(e)}"
            )

    async def get_user(self, user_id: int) -> User:
        return await self.db.user.find_unique(where={"id": user_id})

    async def get_user_by_guest_id(self, guest_id: str) -> User:
        return await self.db.user.find_unique(where={"guest_id": guest_id})

    async def get_user_by_clerk_id(self, clerk_id: str) -> User:
        return await self.db.user.find_unique(where={"clerk_id": clerk_id})

    async def list_users(self) -> list[User]:
        return await self.db.user.find_many()

    async def update_user(self, user_id: int, data: dict) -> User:
        return await self.db.user.update(where={"id": user_id}, data=data)

    async def delete_user(self, user_id: int) -> User:
        return await self.db.user.delete(where={"id": user_id})
