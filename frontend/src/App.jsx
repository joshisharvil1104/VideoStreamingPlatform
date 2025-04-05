import { useEffect, useState } from 'react';
import axios from 'axios';
import VideoCard from './components/VideoCard';

function App() {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({ title: '', thumbnail: '', youtubeUrl: '' });

  useEffect(() => {
    axios.get('http://localhost:3001/videos')
      .then(res => setVideos(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/videos', form);
    const updated = await axios.get('http://localhost:3001/videos');
    setVideos(updated.data);
    setForm({ title: '', thumbnail: '', youtubeUrl: '' });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🎬 TrailerHub</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input className="p-2 border w-full" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
        <input className="p-2 border w-full" placeholder="Thumbnail URL" value={form.thumbnail} onChange={e => setForm({...form, thumbnail: e.target.value})} />
        <input className="p-2 border w-full" placeholder="YouTube URL" value={form.youtubeUrl} onChange={e => setForm({...form, youtubeUrl: e.target.value})} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Video</button>
      </form>
      <div className="grid md:grid-cols-2 gap-4">
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default App;
