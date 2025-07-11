# NAAI Chatbot

NAAI is your personal AI assistant chatbot, powered by Google Gemini API (backend only, not user-facing). This project includes a React frontend and a Node.js/Express backend.

## Features
- Conversational AI assistant (NAAI)
- Modern React UI
- Node.js backend proxying requests to Gemini API

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/nitin3590/naai-chatbot.git
   cd chatbot
   ```
2. **Install dependencies:**
   ```sh
   cd client && npm install
   cd ../server && npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the `server/` directory:
     ```env
     GEMINI_API_KEY=your_gemini_api_key_here
     ```
   - **Do NOT commit your `.env` file.**

4. **Run the servers:**
   - In one terminal:
     ```sh
     cd server
     node index.js
     ```
   - In another terminal:
     ```sh
     cd client
     npm run dev
     ```

5. **Access the chatbot:**
   - Open [http://localhost:5173](http://localhost:5173) in your browser.

## Notes
- The backend is configured for local development (`localhost`). For production, update the URLs as needed.
- Never share your API key or commit `.env` files.

## License
MIT 