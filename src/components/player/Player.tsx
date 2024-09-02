import { usePlayer } from "../../hooks/usePlayer";
import { Maximize, Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import SelectQuality from "./selectQuality/SelectQuality";
import { useState } from "react";
import ProgressBar from "./progressBar/ProgressBar";

const SKIP_TIME_SECOND = 15;

function Player() {
  const {
    playerRef,
    isPlaying,
    quality,
    togglePlayPause,
    skipTime,
    toggleFullScreen,
    changeQuality,
    currentTime,
    videoTime,
    progress,
  } = usePlayer();

  console.log("progrs = ", progress);
  return (
    <div className="max-w-xl mx-auto relative rounded-lg overflow-hidden">
      <video
        ref={playerRef}
        className="w-full h-full aspect-video"
        controls={false}
        src="/gonka.mp4#t=0.9"
        preload="metadata"
      />
      <div className="flex item-center justify-between p-3 bg-dark-700 relative">
        <ProgressBar progress={progress} />
        <div className="flex item-center gap-5">
          <button
            onClick={togglePlayPause}
            className="text-white hover:text-primary"
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <div className="flex item-center gap-2">
            <button
              onClick={() => skipTime("backward")}
              className="text-white hover:text-primary"
            >
              <RotateCcw />
            </button>
            <button
              onClick={() => skipTime("forward")}
              className="text-white hover:text-primary"
            >
              <RotateCw />
            </button>
          </div>
          <div className="flex item-center gap-1 border-l pl-3 border-white text-white">
            <span>
              {Math.floor(currentTime / 60) +
                ":" +
                ("0" + Math.floor(currentTime % 60)).slice(-2)}
            </span>
            <span></span>
            <span>
              {Math.floor(videoTime / 60) +
                ":" +
                ("0" + Math.floor(videoTime % 60)).slice(-2)}
            </span>
          </div>
        </div>
        <div className="flex item-center gap-5">
          <SelectQuality currentValue={quality} onChange={changeQuality} />
          <button
            onClick={toggleFullScreen}
            className="text-white hover:text-primary"
          >
            <Maximize />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
