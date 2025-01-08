import { Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { usePlayer } from '@/contexts/PlayerContext';
import { useEffect, useRef } from 'react';

const Player = () => {
  const { isPlaying, currentTrack, togglePlay } = usePlayer();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.audioUrl;
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      }
    }
  }, [currentTrack]);

  if (!currentTrack) {
    return null;
  }

  return (
    <>
      <audio ref={audioRef} />
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black to-gray-900 p-4">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center space-x-4">
            <img
              src={currentTrack.imageUrl || '/placeholder.svg'}
              alt="Album cover"
              className="w-14 h-14 rounded-md"
            />
            <div>
              <h4 className="text-sm font-medium">{currentTrack.title}</h4>
              <p className="text-xs text-gray-400">{currentTrack.artist}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-2 flex-1 px-8">
            <div className="flex items-center space-x-6">
              <button className="text-gray-400 hover:text-white">
                <SkipBack size={20} />
              </button>
              <button 
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-black hover:scale-105 transition"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button className="text-gray-400 hover:text-white">
                <SkipForward size={20} />
              </button>
            </div>
            <div className="w-full flex items-center space-x-2">
              <span className="text-xs text-gray-400">0:00</span>
              <Slider
                defaultValue={[0]}
                max={100}
                step={1}
                className="w-full"
              />
              <span className="text-xs text-gray-400">3:45</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 min-w-[150px]">
            <Volume2 size={20} className="text-gray-400" />
            <Slider
              defaultValue={[75]}
              max={100}
              step={1}
              className="w-[100px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;