# 🚀 Running the App Locally

1. **Install dependencies**  
   ```bash
   npm install
   ```

2. **Start the backend server**  
   (in one terminal)
   ```bash
   node server.js
   ```
   The backend will run on http://localhost:3001

3. **Start the frontend (Vite dev server)**  
   (in a separate terminal)
   ```bash
   npm run dev
   ```
   The frontend will run on http://localhost:5173 (or the port Vite chooses).

## 🛠️ Tech Stack

A content remixing tool using React.

## Features

1. Paste in text we want to remix  
2. Click a button to apply the remixing we want for it  
3. Send the request to an AI API endpoint  
4. See the remix in an output box  
5. Add other styling and features that we want as we go  

## Tech Stack

1. React  
2. TailwindCSS  
3. Vercel  
4. Claude API

### Challenges

1. Add in another AI API
2. Add a way to upload audio files to have them transcribed
3. Click to tweet or to schedule a tweet from the output
4. Add a way to save the remixed output to a database
