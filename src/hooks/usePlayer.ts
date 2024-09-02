import { useEffect, useRef, useState } from "react";
import { EnumPlayerQuality, HTMLCustomVideoElement } from "../components/player/player.types";

const SKIP_TIME_SECOND = 15;

export function usePlayer() {
  const playerRef = useRef<HTMLCustomVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [quality, setQuality] = useState(EnumPlayerQuality['1080p']);

  const togglePlayPause = () => {
    if (isPlaying) {
      playerRef.current?.pause();
    } else {
      playerRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  }

  const skipTime = (type?: 'forward' | 'backward') => {
    if (!playerRef.current?.currentTime) return;
    if (type === 'forward') {
      playerRef.current.currentTime += SKIP_TIME_SECOND;
    } else {
      playerRef.current.currentTime -= SKIP_TIME_SECOND;
    }
  }

  const toggleFullScreen = () => {
    if (!playerRef.current) return;

    if (playerRef.current.requestFullscreen) {
      playerRef.current.requestFullscreen();
    } else if (playerRef.current.mozRequestFullScreen) {
      playerRef.current.mozRequestFullScreen();
    } else if (playerRef.current.webkitRequestFullscreen) {
      playerRef.current.webkitRequestFullscreen();
    } else if (playerRef.current.msRequestFullScreen) {
      playerRef.current.msRequestFullScreen();
    }
  }

  const changeQuality = (quality: EnumPlayerQuality) => {
    if (!playerRef.current) return;
    setQuality(quality);
    playerRef.current.src = '/gonka.mp4';
    playerRef.current.currentTime = currentTime;
    playerRef.current.play();
    setIsPlaying(true);
  }

  const [currentTime, setCurrentTime] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const originalTime = playerRef.current?.duration;
    if (originalTime) {
      setVideoTime(originalTime);
      setCurrentTime(playerRef.current.currentTime);
      setProgress((currentTime / originalTime) * 100);
    }
  }, [playerRef.current?.duration])

  useEffect(() => {
    if (!playerRef.current) return;

    const updateProgress = () => {
      if (!playerRef.current) return;

      const currentTime = playerRef.current.currentTime;
      const duration = playerRef.current.duration;

      setCurrentTime(playerRef.current.currentTime);
      setProgress((currentTime / duration) * 100);
    }

    playerRef.current?.addEventListener('timeupdate', updateProgress);
    return () => {
      playerRef.current?.removeEventListener('timeupdate', updateProgress);
    }
  }, [])
  return {
    playerRef,
    isPlaying,
    quality,
    togglePlayPause,
    skipTime,
    toggleFullScreen,
    changeQuality,
    currentTime,
    videoTime,
    progress
  }
}