const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Get videos
app.get('/videos', (req, res) => {
  const videos = db.prepare('SELECT * FROM videos').all();
  res.json(videos);
});

// Add video
app.post('/videos', (req, res) => {
  const { title, thumbnail, youtubeUrl } = req.body;
  db.prepare('INSERT INTO videos (title, thumbnail, youtubeUrl) VALUES (?, ?, ?)')
    .run(title, thumbnail, youtubeUrl);
  res.json({ success: true });
});

app.listen(3001, () => console.log('Backend running on http://localhost:3001'));
