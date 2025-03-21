from typing import List
from pydantic import BaseModel
import os
import json
import httpx
from fastapi import HTTPException
from prisma import Prisma

from database.commands.company.add_company_command import AddCompanyCommand
import re

class AnalyzeResponseItem(BaseModel):
    companyId1: int
    companyId2: int
    connection_description: str
    relation_percentage: float

class CompanyService:
    def __init__(self, db: Prisma):
        self.db = db


    async def list_companies(self) -> List[dict]:
        companies = await self.db.company.find_many()
        return [company.dict() for company in companies]

    async def analyze_relations(self, company_id: int) -> List[AnalyzeResponseItem]:
        # Fetch the company to analyze from DB
        company = await self.db.company.find_unique(where={"id": company_id})
        if not company:
            raise HTTPException(status_code=404, detail="Company not found")
        
        # Fetch all companies (you might filter out the one to analyze if needed)
        companies = await self.db.company.find_many()
        
        # Construct prompt string with relevant data.
        prompt = (
            f"Based on these companies: {[{'id': c.id, 'initiative': c.initiative, 'challenge': c.challenge, 'cta': c.cta, 'description': c.description} for c in companies]}, "
            f"analyze the relations, initiative, description, challenge and cta they have with the company with ID = {company_id} and description: {company.description}. "
            "You should check what kind of sustainability they could offer to the world, and also how could they work together to achieve a common goal towards a more sustainable world. "
            "You should also explain how they are achieving that sustainability in detail and how they can maybe improve, there should be minimum 800 words and it should be properly formatted"
            "Make sure to return the answer as a JSON array with the following keys: companyId1, companyId2, connection_description, relation_percentage. "
            "The relation_percentage should be a number between 0 and 100. "
            "The relation_percentage should be an approximation of how related the companies are based on your analysis. "
            "The connection_description should be a string describing the connection between the companies. "
            "The companyId1 and companyId2 should be the IDs of the companies being compared. "
            "Your responses should always be in a JSON array of the format i told you. The response shouldn't contain any other data. "
            "Do not include any entries where relation_percentage is less than 30."
        )
  
        relations = await self.call_chatgpt(prompt) 
        
        # Persist the new relations to the database
        for relation in relations:
            await self.db.companyrelation.create(
                data={
                    "company_id1": relation.companyId1,
                    "company_id2": relation.companyId2,
                    "connection_description": relation.connection_description,
                    "relation_percentage": relation.relation_percentage,
                }
            )
        
        return relations

    async def add_company(self, company: AddCompanyCommand) -> dict:
        new_company = await self.db.company.create(data={
            "name": company.name,
            "initiative": company.initiative,
            "challenge": company.challenge,
            "cta": company.cta,
            "description": company.description,
            "country": company.country,
        })
        return new_company.dict()

    async def list_company_relations(self) -> List[dict]:
        relations = await self.db.companyrelation.find_many()
        return [relation.dict() for relation in relations]

    async def update_company_relation(self, relation_id: int, data: dict) -> dict:
        updated_relation = await self.db.companyrelation.update(
            where={"id": relation_id},
            data=data
        )
        return updated_relation.dict()

    async def delete_company_relation(self, relation_id: int) -> dict:
        deleted_relation = await self.db.companyrelation.delete(
            where={"id": relation_id}
        )
        return deleted_relation.dict()

# ---------------------------- ChatGPT API ----------------------------
    async def call_chatgpt(self, prompt: str) -> List[AnalyzeResponseItem]:
        chatgpt_api_url = "https://api.openai.com/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {os.getenv('OPENAI_API_KEY')}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": "gpt-4",
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ]
        }
        
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(chatgpt_api_url, headers=headers, json=payload)
        
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Error calling ChatGPT API")
        
        # Assuming the response contains the JSON array in a message content
        content = response.json()["choices"][0]["message"]["content"]
        
        try:
            match = re.search(r'\[.*\]', content, re.DOTALL)
            if not match:
                raise HTTPException(status_code=500, detail="No JSON array found in ChatGPT API response")
            parsed = json.loads(match.group(0))
        except json.JSONDecodeError:
            raise HTTPException(status_code=500, detail="Invalid JSON returned from ChatGPT API")
        
        # Validate each item using Pydantic model
        results = []
        for item in parsed:
            relation = AnalyzeResponseItem(**item)
            if relation.relation_percentage >= 30:
                results.append(relation)
        return results
