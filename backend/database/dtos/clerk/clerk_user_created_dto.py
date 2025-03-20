from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime


class EmailVerification(BaseModel):
    attempts: int
    expire_at: int
    status: str
    strategy: str


class EmailAddress(BaseModel):
    created_at: int
    email_address: str
    id: str
    linked_to: List[dict]
    matches_sso_connection: bool
    object: str
    reserved: bool
    updated_at: int
    verification: EmailVerification


class ClerkUserCreatedDto(BaseModel):
    backup_code_enabled: Optional[bool] = False
    banned: Optional[bool] = False
    create_organization_enabled: Optional[bool] = False
    created_at: Optional[int] = None  # Unix timestamp in milliseconds
    delete_self_enabled: Optional[bool] = False
    email_addresses: List[EmailAddress] = []
    enterprise_accounts: List[dict] = []
    external_accounts: List[dict] = []
    external_id: Optional[str] = None
    first_name: Optional[str] = None
    has_image: Optional[bool] = False
    id: str
    image_url: Optional[str] = None
    last_active_at: Optional[int] = None  # Unix timestamp in milliseconds
    last_name: Optional[str] = None
    last_sign_in_at: Optional[int] = None  # Unix timestamp in milliseconds
    legal_accepted_at: Optional[int] = None  # Unix timestamp in milliseconds
    locked: Optional[bool] = False
    lockout_expires_in_seconds: Optional[int] = None
    mfa_disabled_at: Optional[int] = None  # Unix timestamp in milliseconds
    mfa_enabled_at: Optional[int] = None  # Unix timestamp in milliseconds
    object: Optional[str] = None
    passkeys: List[dict] = []
    password_enabled: Optional[bool] = False
    phone_numbers: List[dict] = []
    primary_email_address_id: Optional[str] = None
    primary_phone_number_id: Optional[str] = None
    primary_web3_wallet_id: Optional[str] = None
    private_metadata: Dict = {}
    profile_image_url: Optional[str] = None
    public_metadata: Dict = {}
    saml_accounts: List[dict] = []
    totp_enabled: Optional[bool] = False
    two_factor_enabled: Optional[bool] = False
    unsafe_metadata: Dict = {}
    updated_at: Optional[int] = None  # Unix timestamp in milliseconds
    username: Optional[str] = None
    verification_attempts_remaining: Optional[int] = None
    web3_wallets: List[dict] = []

    class Config:
        extra = "ignore"  # Ignore extra fields not explicitly defined
        arbitrary_types_allowed = True  # Allow flexibility if needed
