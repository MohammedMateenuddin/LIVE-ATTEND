📍 Live Attend – Geo-Fenced Attendance System

A modern, real-time geo-fenced attendance web app where professors can start a session, and students can mark attendance only if they are physically within a 100-meter radius.

This project solves the problem of proxy attendance and manual roll-call, using location-based verification and a clean, fast UI.

🔗 Live Demo: https://attendance-system-ochre-ten.vercel.app/

🛠 Built With: React + Vite, Tailwind CSS, Supabase, Lucide-React

✨ Features
👨‍🏫 For Professors

Start and stop attendance sessions

Real-time list of students who marked attendance

Secure teacher login with Supabase Auth

🎓 For Students

Mark attendance only when within 100 meters

Automatic location detection

Smooth and minimal interface

⚙️ System Capabilities

Geo-location validation (Haversine formula)

Supabase real-time database

Modern, responsive UI

Works on mobile and desktop

Fully deployed on Vercel

🧰 Tech Stack
Layer	Technology
Frontend	React + Vite
Styling	Tailwind CSS
Backend	Supabase (Auth, DB, Realtime)
Icons	Lucide-React
Geo-Location	Browser Geolocation API
📁 Project Structure
src/
│── components/
│── pages/
│── hooks/
│── utils/
│── supabase/
│── App.jsx
│── main.jsx
index.html

🚀 Getting Started (Local Setup)
1️⃣ Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

2️⃣ Install dependencies
npm install

3️⃣ Set up environment variables

Create a .env file in the root:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

4️⃣ Run the development server
npm run dev

📍 How Geo-Fence Validation Works

User requests attendance marking

Browser fetches current coordinates

App calculates distance from teacher’s session location using the Haversine formula

If within 100 meters, attendance is marked

Supabase updates instantly in real-time ⚡

📈 Future Enhancements

Admin dashboard

Attendance analytics & reports

Role-based login (Admin / Faculty / Student)

QR-code fallback system

Notifications for session start

Mobile app (React Native or Flutter)

🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open an issue or submit a pull request.

📜 License

This project is licensed under the MIT License.

🙌 Acknowledgments

Special thanks to:

Supabase for auth & realtime backend

React + Vite ecosystem

Tailwind CSS for fast UI styling
