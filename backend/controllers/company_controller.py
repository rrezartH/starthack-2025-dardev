from typing import List
from fastapi import APIRouter, Depends, HTTPException
from database.commands.company.add_company_command import AddCompanyCommand
from controllers.dependencies import get_company_service
from services.company_service import CompanyService, AnalyzeResponseItem
from prisma import Prisma

router = APIRouter()
prisma = Prisma()

@router.get("/companies", response_model=List[dict])
async def list_companies(company_service: CompanyService = Depends(get_company_service)):
    return await company_service.list_companies()

@router.post("/analyze-relations/{company_id}", response_model=List[AnalyzeResponseItem])
async def analyze_relations(company_id: int, company_service: CompanyService = Depends(get_company_service)):
    return await company_service.analyze_relations(company_id)

@router.post("/companies", response_model=dict)
async def add_company(command: AddCompanyCommand, company_service: CompanyService = Depends(get_company_service)):
    return await company_service.add_company(command)

@router.get("/companies/{company_id}/relations", response_model=List[dict])
async def list_company_relations(company_id: int, company_service: CompanyService = Depends(get_company_service)):
    return await company_service.list_company_relations(company_id)

@router.put("/companies/{company_id}/relations/{relation_id}", response_model=dict)
async def update_company_relation(company_id: int, relation_id: int, relation_data: dict, company_service: CompanyService = Depends(get_company_service)):
    return await company_service.update_company_relation(company_id, relation_id, relation_data)

@router.delete("/companies/{company_id}/relations/{relation_id}", response_model=dict)
async def delete_company_relation(company_id: int, relation_id: int, company_service: CompanyService = Depends(get_company_service)):
    return await company_service.delete_company_relation(company_id, relation_id)