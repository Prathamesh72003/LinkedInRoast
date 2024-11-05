import os
import sys
from linkedin_api import Linkedin
import json

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from config.config import LINKEDIN_USERNAME, LINKEDIN_PASSWORD

try:
    api = Linkedin(LINKEDIN_USERNAME, LINKEDIN_PASSWORD)
except Exception as e:
    print(f"Error: {e}")
    print("Please check your LinkedIn credentials in config/config.py file.")


def get_filtered_profile(username):

    profile = api.get_profile(username)

    def safe_get(data, keys, default=None):
        for key in keys:
            if isinstance(data, dict) and key in data:
                data = data[key]
            else:
                return default
        return data

    filtered_profile = {
        "name": f"{safe_get(profile, ['firstName'], '')} {safe_get(profile, ['lastName'], '')}".strip(),
        "summary": safe_get(profile, ['summary']),
        "headline": safe_get(profile, ['headline']),
        "location": {
            "city": safe_get(profile, ['geoLocationName']),
            "country": safe_get(profile, ['geoCountryName']),
        },
        "education": [
            {
                "schoolName": safe_get(edu, ['schoolName']),
                "degreeName": safe_get(edu, ['degreeName']),
                "fieldOfStudy": safe_get(edu, ['fieldOfStudy']),
                "startYear": safe_get(edu, ['timePeriod','startDate', 'year']),
                "endYear": safe_get(edu, ['timePeriod', 'endDate', 'year']),
            }
            for edu in safe_get(profile, ['education'], [])
        ],
        "experience": [
            {
                "companyName": safe_get(exp, ['companyName']),
                "title": safe_get(exp, ['title']),
                "location": safe_get(exp, ['locationName']),
                "startDate": {
                    "month": safe_get(exp, ['timePeriod', 'startDate', 'month']),
                    "year": safe_get(exp, ['timePeriod', 'startDate', 'year']),
                },
                "endDate": {
                    "month": safe_get(exp, ['timePeriod', 'endDate', 'month']),
                    "year": safe_get(exp, ['timePeriod', 'endDate', 'year']),
                },
                "description": safe_get(exp, ['description']),
            }
            for exp in safe_get(profile, ['experience'], [])
        ],
        "skills": [safe_get(skill, ['name']) for skill in safe_get(profile, ['skills'], [])],
        "languages": [
            {
                "name": safe_get(lang, ['name']),
                "proficiency": safe_get(lang, ['proficiency']),
            }
            for lang in safe_get(profile, ['languages'], [])
        ],
        "certifications": [
            {
                "name": safe_get(cert, ['name']),
                "authority": safe_get(cert, ['authority']),
                "licenseNumber": safe_get(cert, ['licenseNumber']),
                "url": safe_get(cert, ['url']),
                "startDate": {
                    "month": safe_get(cert, ['timePeriod','startDate', 'month']),
                    "year": safe_get(cert, ['timePeriod','startDate', 'year']),
                },
            }
            for cert in safe_get(profile, ['certifications'], [])
        ],
       "volunteer":[
           {
                "organization": safe_get(vol, ['companyName']),
                "role": safe_get(vol, ['role']),
                "startDate": {
                     "month": safe_get(vol, ['timePeriod', 'startDate', 'month']),
                     "year": safe_get(vol, ['timePeriod', 'startDate', 'year']),
                },
                "endDate": {
                     "month": safe_get(vol, ['timePeriod', 'endDate', 'month']),
                     "year": safe_get(vol, ['timePeriod', 'endDate', 'year']),
                },
                "description": safe_get(vol, ['description']),
           }
           for vol in safe_get(profile, ['volunteer'], [])
       ]
    }

    formatted_profile = json.dumps(filtered_profile, indent=4)
    return formatted_profile

def get_linkedin_profile(linkedin_url):
    linkedin_url = str(linkedin_url).strip()
    username = linkedin_url.rstrip('/').split('/')[-1]
    try:
        formatted_profile = get_filtered_profile(username)
        return formatted_profile
    except Exception as e:
        return {"error": str(e)}

