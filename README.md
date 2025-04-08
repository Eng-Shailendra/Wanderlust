# 🌍 Wanderlust

Wanderlust is a full-stack web application for exploring, creating, and reviewing travel destinations and stays — inspired by platforms like Airbnb. Built with Node.js, Express, MongoDB, and EJS.

---

## 🚀 Features

- 📝 User authentication and authorization
- 🗺️ Add, edit, and delete travel listings
- 🌟 Review and rate listings
- 📷 Image uploads via Cloudinary
- 📂 Secure file handling with `.env` support
- 🎨 Clean and responsive UI with EJS templating
- 🛡️ Robust server-side validation and error handling

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Frontend:** HTML, CSS, EJS
- **Auth:** Passport.js (Local Strategy)
- **Cloud Storage:** Cloudinary
- **Validation:** JOI
- **Session Management:** express-session, connect-mongo

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/Eng-Shailendra/Wanderlust.git
cd Wanderlust
npm install
```

2. Set your .env file
```CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
DB_URL=your_mongodb_connection_string
SECRET=your_session_secret
 ```
3. Start the development server
   ```
   node app.js
   ```
## 📸 Screenshots
![Homepage](screenshots/screenshots(33).png)


## 📁 Project Structure
```
Wanderlust/
├── controllers/
├── model/
├── public/
├── routers/
├── views/
├── utils/
├── app.js
├── cloudConfig.js
├── schema.js
└── .env (not committed)
```

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

## 📄 License
MIT License

## 👨‍💻 Author
Shailendra Kumar Sahu

```
---

Let me know if you want to include badges, deployment instructions (like Render or Vercel), or anything else. Want me to save it as a file for you?
