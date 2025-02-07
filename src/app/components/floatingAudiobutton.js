import { useEffect, useRef, useState } from "react";

const FloatingAudioButton = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Menghindari hydration error di Next.js
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!isClient) return null; // Hindari render di server

  return (
    <>
      <audio
        ref={audioRef}
        controls
        src="https://raw.githubusercontent.com/Skuyin/music/main/diskoria.mp3"
        preload="auto"
      />

      {/* Tombol Play/Pause */}
      <button
        onClick={toggleAudio}
        className="fixed bottom-5 left-16 w-5 h-5 bg-red-500 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-all hover:bg-red-600 hover:scale-110"
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25v13.5m-7.5-13.5v13.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
            />
          </svg>
        )}
      </button>
    </>
  );
};

export default FloatingAudioButton;
