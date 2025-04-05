import React, { useState, useEffect } from 'react';
import { auth, provider, signInWithPopup, signOut } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';




const videos = [
  // 🎬 Movies
  { id: 1, type: "movie", title: "Inception", url: "https://www.youtube.com/embed/YoHD9XEInc0" },
  { id: 2, type: "movie", title: "Interstellar", url: "https://www.youtube.com/embed/zSWdZVtXT7E" },
  { id: 3, type: "movie", title: "The Batman", url: "https://www.youtube.com/embed/mqqft2x_Aa4" },
  { id: 4, type: "movie", title: "Dune", url: "https://www.youtube.com/embed/n9xhJrPXop4" },
  { id: 5, type: "movie", title: "Avengers: Endgame", url: "https://www.youtube.com/embed/TcMBFSGVi1c" },
  { id: 6, type: "movie", title: "Tenet", url: "https://www.youtube.com/embed/L3pk_TBkihU" },
  { id: 7, type: "movie", title: "Joker", url: "https://www.youtube.com/embed/zAGVQLHvwOY" },
  { id: 8, type: "movie", title: "The Dark Knight", url: "https://www.youtube.com/embed/EXeTwQWrcwY" },
  { id: 9, type: "movie", title: "Oppenheimer", url: "https://www.youtube.com/embed/uYPbbksJxIg" },
  { id: 10, type: "movie", title: "Iron Man", url: "https://www.youtube.com/embed/8hYlB38asDY" },
  { id: 11, type: "movie", title: "Black Panther", url: "https://www.youtube.com/embed/xjDjIWPwcPU" },
  { id: 12, type: "movie", title: "Doctor Strange", url: "https://www.youtube.com/embed/aWzlQ2N6qqg" },
  { id: 13, type: "movie", title: "Guardians of the Galaxy", url: "https://www.youtube.com/embed/d96cjJhvlMA" },
  { id: 14, type: "movie", title: "Avatar: The Way of Water", url: "https://www.youtube.com/embed/d9MyW72ELq0" },
  { id: 15, type: "movie", title: "Fast X", url: "https://www.youtube.com/embed/32RAq6JzY-w" },
  { id: 16, type: "movie", title: "The Flash", url: "https://www.youtube.com/embed/r51cYVZWKdY" },
  { id: 17, type: "movie", title: "Aquaman", url: "https://www.youtube.com/embed/WDkg3h8PCVU" },
  { id: 18, type: "movie", title: "Shazam!", url: "https://www.youtube.com/embed/go6GEIrcvFY" },
  { id: 19, type: "movie", title: "Deadpool", url: "https://www.youtube.com/embed/ONHBaC-pfsk" },
  { id: 20, type: "movie", title: "Captain Marvel", url: "https://www.youtube.com/embed/Z1BCujX3pw8" },
  { id: 21, type: "movie", title: "The Marvels", url: "https://www.youtube.com/embed/I6a_SK3Zl5Q" },
  { id: 22, type: "movie", title: "The Suicide Squad", url: "https://www.youtube.com/embed/JuDLepNa7hw" },
  { id: 23, type: "movie", title: "Transformers: Rise of the Beasts", url: "https://www.youtube.com/embed/itnqEauWQZM" },
  { id: 24, type: "movie", title: "Mission: Impossible – Fallout", url: "https://www.youtube.com/embed/wb49-oV0F78" },
  { id: 25, type: "movie", title: "John Wick 4", url: "https://www.youtube.com/embed/qEVUtrk8_B4" },
  { id: 26, type: "movie", title: "The Matrix Resurrections", url: "https://www.youtube.com/embed/9ix7TUGVYIo" },
  { id: 27, type: "movie", title: "The Hunger Games", url: "https://www.youtube.com/embed/mfmrPu43DF8" },
  { id: 28, type: "movie", title: "The Maze Runner", url: "https://www.youtube.com/embed/AwwbhhjQ9Xk" },
  { id: 29, type: "movie", title: "The Fault in Our Stars", url: "https://www.youtube.com/embed/9ItBvH5J6ss" },
  { id: 30, type: "movie", title: "La La Land", url: "https://www.youtube.com/embed/0pdqf4P9MB8" },

  // 📺 Series
  { id: 31, type: "series", title: "Stranger Things", url: "https://www.youtube.com/embed/b9EkMc79ZSU" },
  { id: 32, type: "series", title: "The Witcher", url: "https://www.youtube.com/embed/ndl1W4ltcmg" },
  { id: 33, type: "series", title: "Wednesday", url: "https://www.youtube.com/embed/Q73UhUTs6y0" },
  { id: 34, type: "series", title: "Breaking Bad", url: "https://www.youtube.com/embed/HhesaQXLuRY" },
  { id: 35, type: "series", title: "The Boys", url: "https://www.youtube.com/embed/MxgnVrt5Thk" },
  { id: 36, type: "series", title: "The Mandalorian", url: "https://www.youtube.com/embed/aOC8E8z_ifw" },
  { id: 37, type: "series", title: "Loki", url: "https://www.youtube.com/embed/nW948Va-l10" },
  { id: 38, type: "series", title: "WandaVision", url: "https://www.youtube.com/embed/sj9J2ecsSpo" },
  { id: 39, type: "series", title: "Moon Knight", url: "https://www.youtube.com/embed/x7Krla_UxRg" },
  { id: 40, type: "series", title: "House of the Dragon", url: "https://www.youtube.com/embed/fNwwt25mheo" },
  { id: 41, type: "series", title: "The Last of Us", url: "https://www.youtube.com/embed/uLtkt8BonwM" },
  { id: 42, type: "series", title: "Money Heist", url: "https://www.youtube.com/embed/_InqQJRqGW4" },
  { id: 43, type: "series", title: "Dark", url: "https://www.youtube.com/embed/cq2iTHoLrt0" },
  { id: 44, type: "series", title: "You", url: "https://www.youtube.com/embed/x2-JqecgR88" },
  { id: 45, type: "series", title: "Peaky Blinders", url: "https://www.youtube.com/embed/oVzVdvGIC7U" },
  { id: 46, type: "series", title: "The Umbrella Academy", url: "https://www.youtube.com/embed/0DAmWHxeoKw" },
  { id: 47, type: "series", title: "The Queen's Gambit", url: "https://www.youtube.com/embed/CDrieqwSdgI" },
  { id: 48, type: "series", title: "Squid Game", url: "https://www.youtube.com/embed/oqxAJKy0ii4" },
  { id: 49, type: "series", title: "The Crown", url: "https://www.youtube.com/embed/uw1j-uRz7UU" },
  { id: 50, type: "series", title: "1899", url: "https://www.youtube.com/embed/p7OUQ9U2qIw" },
];


function App() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("movies");

  // Listen for changes to authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      // Don't manually setUser here – it'll be handled by onAuthStateChanged
    } catch (error) {
      console.error("Google sign-in error:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };
  function isSubstring(query, text) {
    const n = text.length;
    const m = query.length;
  
    if (m === 0) return true;
  
    for (let i = 0; i <= n - m; i++) {
      let j = 0;
      while (j < m && text[i + j] === query[j]) {
        j++;
      }
      if (j === m) return true;
    }
  
    return false;
  }
  
  const filteredVideos = videos.filter(video =>
    isSubstring(searchQuery.toLowerCase(), video.title.toLowerCase())
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-purple-400 animate-pulse">🎬 Welcome to MovieVerse</h1>
        <p className="text-gray-300 text-center max-w-md mb-8">
          Discover and search trailers of your favorite movies in one place.
          Sign in to explore the cinematic universe!
        </p>
        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
        >
          🚀 Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-400">🎬 Movie Trailers</h1>
        <div className="flex items-center gap-4">
          <img src={user.photoURL} alt="profile" className="w-10 h-10 rounded-full border border-gray-700" />
          <span>{user.displayName}</span>
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded-xl hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
  
      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search trailers..."
          className="w-full max-w-md px-4 py-2 rounded-xl border border-gray-600 bg-gray-800 text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
  
      {/* Tabs */}
      <div className="flex justify-center mb-8 space-x-4">
        <button
          onClick={() => setActiveTab("movie")}
          className={`px-4 py-2 rounded-xl font-semibold ${
            activeTab === "movie" ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          🎬 Movies
        </button>
        <button
          onClick={() => setActiveTab("series")}
          className={`px-4 py-2 rounded-xl font-semibold ${
            activeTab === "series" ? "bg-green-600" : "bg-gray-700"
          }`}
        >
          📺 Series
        </button>
      </div>
  
      {/* Trailers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos
          .filter((v) => v.type === activeTab)
          .map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
      </div>
  
      {/* Empty state */}
      {filteredVideos.filter((v) => v.type === activeTab).length === 0 && (
        <p className="text-center text-gray-400 mt-8 col-span-full">No trailers found 😢</p>
      )}
    </div>
  );
}

const VideoCard = ({ video }) => (
  <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
    <iframe
      className="w-full aspect-video"
      src={`${video.url}?rel=0&controls=0&modestbranding=1&autohide=1`}
      title={video.title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
    <div className="p-4">
      <h2 className="text-lg font-semibold">{video.title}</h2>
    </div>
  </div>
);


export default App;
