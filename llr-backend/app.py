from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from api.ScrapeProfile import get_linkedin_profile
from llm.roasterbot import send_to_llm
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


class LinkedInProfileRequest(BaseModel):
    linkedin_url: str
    brutality_level: int

@app.post('/roast')
async def get_profile(request: LinkedInProfileRequest):
    linkedin_url = request.linkedin_url
    brutality_level = request.brutality_level

    formatted_profile = get_linkedin_profile(linkedin_url)

    if "error" in formatted_profile:
        raise HTTPException(status_code=500, detail=formatted_profile["error"])

    roast_response = send_to_llm(formatted_profile, brutality_level)

    return {"roast": roast_response}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000, log_level='info')
