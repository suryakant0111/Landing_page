import Navbar from "./Navbar";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

type Props = { youtubeId?: string };

export default function VideoSection({ youtubeId = "E1czmX6bjFA" }: Props) {
  const playerRef = useRef<any>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // YouTube API loader
  useEffect(() => {
    const create = () => {
      if (!mountRef.current) return;
      playerRef.current = new window.YT.Player(mountRef.current, {
        videoId: youtubeId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: youtubeId,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          playsinline: 1,
        },
        events: {
          onReady: (e: any) => {
            e.target.mute();
            e.target.playVideo();
            setIsReady(true);
            setIsPlaying(true);
            setIsMuted(true);
            setDuration(e.target.getDuration() || 0);
          },
          onStateChange: (e: any) => {
            if (e.data === 1) setIsPlaying(true);
            if (e.data === 2) setIsPlaying(false);
          },
        },
      });
    };

    if (!window.YT) {
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(s);
      window.onYouTubeIframeAPIReady = create;
    } else {
      create();
    }
  }, [youtubeId]);

  // Progress updater
  useEffect(() => {
    if (!isReady) return;
    const id = setInterval(() => {
      if (!playerRef.current) return;
      setTime(playerRef.current.getCurrentTime() || 0);
      setDuration(playerRef.current.getDuration() || 0);
    }, 250);
    return () => clearInterval(id);
  }, [isReady]);

  const togglePlay = () => {
    if (isPlaying) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
  };

  const toggleMute = () => {
    if (isMuted) playerRef.current.unMute();
    else playerRef.current.mute();
    setIsMuted(!isMuted);
  };

  const fmt = (n: number) => {
    const m = Math.floor(n / 60);
    const s = Math.floor(n % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const progress = duration ? (time / duration) * 100 : 0;

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={mountRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                     h-[100vh] w-[177.78vh] min-w-full min-h-[100%] pointer-events-none"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />

      {/* Navbar */}
      <div className="relative z-30">
        <Navbar />
      </div>

      {/* Sound Toggle */}
      <button
        onClick={toggleMute}
        className="absolute top-20 left-3 md:top-5 md:left-4 z-20
                   inline-flex items-center gap-2 rounded-md bg-white/80 hover:bg-white
                   text-[11px] uppercase tracking-wide px-3 py-2"
      >
        <span className="w-2.5 h-2.5 rounded-[2px] bg-gray-900" />
        {isMuted ? "Sound Off" : "Sound On"}
      </button>

      {/* YouTube Link */}
      <a
        href={`https://www.youtube.com/watch?v=${youtubeId}`}
        target="_blank"
        rel="noreferrer"
        className="absolute top-20 right-3 md:top-5 md:right-4 z-20
                   inline-flex items-center gap-2 rounded-md bg-white/90 hover:bg-white
                   text-[11px] uppercase tracking-wide px-3 py-2"
      >
        Check on YouTube <span className="-mb-[1px]">↗</span>
      </a>

      {/* Play Button */}
      <button
        onClick={togglePlay}
        className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 hover:bg-white
                   shadow-xl flex items-center justify-center"
      >
        {isPlaying ? (
          <span className="flex gap-1.5">
            <span className="w-2 h-5 bg-gray-900" />
            <span className="w-2 h-5 bg-gray-900" />
          </span>
        ) : (
          <span
            className="ml-1 w-0 h-0 border-l-[18px] border-l-blue-600
                       border-y-[12px] border-y-transparent"
          />
        )}
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-4 left-3 right-3 md:left-4 md:right-4 z-20">
        <div className="flex items-center justify-between text-white/70 text-[11px] mb-1">
          <span>{fmt(time)}</span>
          <span>{fmt(duration)}</span>
        </div>
        <div className="h-[3px] rounded-full bg-white/25 overflow-hidden">
          <div
            className="h-full bg-blue-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
