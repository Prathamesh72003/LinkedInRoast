# LinkBurn 🔥

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

LinkBurn is a roasting app that generates humorous critiques of LinkedIn profiles using AI. It's built with a Python backend for profile scraping and roast generation, and a Next.js frontend for a sleek user interface.

![LinkBurn Hero](https://i.ibb.co/pLHP4X1/image.png?height=400&width=800)

## 🌟 Features

- LinkedIn profile scraping
- AI-powered roast generation using Groq's Llama 3.2 90B model
- Customizable roast intensity
- Modern, responsive UI with animations

## 📸 Screenshots

### Roast Generation
![Roast Generation](https://i.ibb.co/KD8Cjh8/image.png?height=300&width=600)

## 🚀 Getting Started

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Prathamesh72003/LinkedInRoast.git
   cd LinkedInRoast/llr-backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file in the `llr-backend` directory with the following content:
   ```
   GROQ_API_KEY=your_groq_api_key
   LINKEDIN_USERNAME=your_linkedin_email
   LINKEDIN_PASSWORD=your_linkedin_password
   ```

4. Run the backend server:
   ```bash
   uvicorn app:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../linkburn
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Create a `.env` file in the `linkburn` directory with the following content:
   ```
   NEXT_PUBLIC_API_ENDPOINT=http://localhost:8000
   ```

4. Run the frontend development server:
   ```bash
   npm run dev
   ```

## 🎭 Usage

1. Open your browser and go to `http://localhost:3000`
2. Enter a LinkedIn profile URL and select the roast intensity
3. Click "Roast" and enjoy the AI-generated critique!

![Usage Demo](https://i.ibb.co/943Cg9W/image.png?height=400&width=800)

## 🛠️ Technologies Used

- Backend: Python, FastAPI, Groq API
- Frontend: Next.js, Tailwind CSS, Framer Motion, shadcn/ui
- AI: Llama 3.2 90B Text Preview Model

## 📝 Note

This project is intended for entertainment purposes only. Please use responsibly and respect others' privacy and feelings.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/Prathamesh72003/LinkedInRoast/issues).

## 📜 License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
