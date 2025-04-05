function VideoCard({ video }) {
    return (
      <div className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition">
        <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="font-bold text-lg mb-2">{video.title}</h2>
          <a href={video.youtubeUrl} target="_blank" className="text-blue-600 underline">Watch on YouTube</a>
        </div>
      </div>
    );
  }
  
  export default VideoCard;
  