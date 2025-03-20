import base64
import json
import os
from fastapi import HTTPException, Request
import jwt
import yaml
import logging
import sys
import pandas as pd
from logging.handlers import RotatingFileHandler


def load_yaml(path):
    with open(path, "r") as file:
        return yaml.safe_load(file)


def get_logger(name):
    logger = logging.getLogger(name)
    if os.getenv("ENVIRONMENT") == "development":
        logger.setLevel(logging.DEBUG)
    else:
        logger.setLevel(logging.INFO)

    # Only add handlers if the logger doesn't already have any
    if not logger.handlers:
        # Create formatter to be used by all handlers
        formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
        
        # Add console handler to output logs to stdout
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setFormatter(formatter)
        logger.addHandler(console_handler)
        
        # Only add file logging in development environment
        if os.getenv("ENVIRONMENT") == "development":
            # Add rotating file handler to write logs to a file, keeping only the most recent 500 lines
            log_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "logs")
            os.makedirs(log_dir, exist_ok=True)
            
            # Estimate bytes per log line (average line length)
            bytes_per_line = 100  # Estimated average bytes per log line
            max_bytes = bytes_per_line * 500  # Set max file size to hold ~500 lines
            
            file_handler = RotatingFileHandler(
                os.path.join(log_dir, f"{name}.log"),
                mode='a',
                maxBytes=max_bytes,
                backupCount=0  # No backup files, just the main log file
            )
            file_handler.setFormatter(formatter)
            logger.addHandler(file_handler)
    
    # Ensure propagation is set to False to avoid duplicate logs
    logger.propagate = False

    return logger


def get_user_id_from_jwt(token: str) -> str:
    base64_url = token.split(".")[1]
    base64_bytes = base64_url.replace("-", "+").replace("_", "/")
    decoded_bytes = base64.b64decode(base64_bytes + "==")
    json_payload = decoded_bytes.decode("utf-8")
    parsed = json.loads(json_payload)
    return parsed["user_id"]


logger = get_logger(__name__)


def retrieve_user_id_from_request(request: Request) -> str:
    try:
        # Skip authentication in development
        if os.getenv("ENVIRONMENT") == "development":
            logger.info(
                "Local development environment detected. Skipping authentication."
            )
            return "user_2sfo8l1blGpo2l7YPOwxVYJNwPK"

        # Get the JWT token from the request headers
        jwt_token = request.headers.get("Authorization").split(" ")[1]

        # Decode the JWT token
        user_id = get_user_id_from_jwt(jwt_token)

        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")

        return user_id

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
