# SoundGrooveAPI

│
├── app.js
├── server.js
├── database.js
│
├── models/
│   ├── index.js
│   ├── User.js
│   ├── Artist.js
│   └── Track.js
│
├── controllers/
│   ├── user.controller.js
│   ├── artist.controller.js
│   └── track.controller.js
│
├── routes/
│   ├── userroutes.js
│   ├── artistroutes.js
│   ├── trackroutes.js
│   └── protected.routes.js
│
├── middleware/
│   ├── authentication.js
│   ├── authenticateArtist.js
│   ├── authenticateAdmin.js
│   └── Authorization.js
│
└── tests/
    ├── user.test.js
    ├── artist.test.js
    └── track.test.js
