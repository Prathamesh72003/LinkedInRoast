import os
import sys
import requests

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


from config.config import API_ENDPOINT, HEADERS

def get_linkedin_profile(linkedin_url):

    params = {
        'linkedin_profile_url': linkedin_url,
        'extra': 'include',
        'skills': 'include',
        'use_cache': 'if-present',
        'fallback_to_cache': 'on-error',
    }
    response = requests.get(API_ENDPOINT, params=params, headers=HEADERS)

    if response.status_code == 200:
        profile_data = response.json()
        formatted_profile = format_profile_for_llm(profile_data)
        return formatted_profile
    else:
        return {"error": f"Failed to fetch profile: {response.status_code}"}

def format_profile_for_llm(profile):
    formatted_data = {
        "full_name": f"{profile.get('first_name')} {profile.get('last_name')}",
        "headline": profile.get('headline'),
        "occupation": profile.get('occupation'),
        "summary": profile.get('summary'),
        "location": f"{profile.get('city')}, {profile.get('state')}, {profile.get('country_full_name')}",
        "connections": profile.get('connections'),
        "profile_pic_url": profile.get('profile_pic_url'),
        "background_cover_image_url": profile.get('background_cover_image_url'),
        "education": [
            {
                "degree": edu.get('degree_name'),
                "field_of_study": edu.get('field_of_study'),
                "school": edu.get('school'),
                "starts_at": edu.get('starts_at'),
                "ends_at": edu.get('ends_at'),
                "school_linkedin_profile_url": edu.get('school_linkedin_profile_url')
            }
            for edu in profile.get('education', [])
        ],
        "experiences": [
            {
                "title": exp.get('title'),
                "company": exp.get('company'),
                "description": exp.get('description'),
                "starts_at": exp.get('starts_at'),
                "ends_at": exp.get('ends_at'),
                "location": exp.get('location'),
                "company_linkedin_profile_url": exp.get('company_linkedin_profile_url')
            }
            for exp in profile.get('experiences', [])
        ],
        "certifications": [
            {
                "name": cert.get('name'),
                "authority": cert.get('authority'),
                "starts_at": cert.get('starts_at'),
                "ends_at": cert.get('ends_at'),
                "url": cert.get('url')
            }
            for cert in profile.get('certifications', [])
        ],
        "projects": [
            {
                "title": proj.get('title'),
                "description": proj.get('description'),
                "url": proj.get('url'),
                "starts_at": proj.get('starts_at'),
                "ends_at": proj.get('ends_at'),
            }
            for proj in profile.get('accomplishment_projects', [])
        ],
        "recommendations": profile.get('recommendations', []),
        "activities": [
            {
                "title": act.get('title'),
                "link": act.get('link'),
                "status": act.get('activity_status'),
            }
            for act in profile.get('activities', [])
        ],
        "similar_profiles": [
            {
                "name": sim.get('name'),
                "link": sim.get('link'),
                "location": sim.get('location'),
                "summary": sim.get('summary'),
            }
            for sim in profile.get('similarly_named_profiles', [])
        ],
        "volunteer_work": profile.get('volunteer_work', [])
    }
    return formatted_data
