import { Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { usePlayer } from '@/contexts/PlayerContext';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

const Player = () => {
  const { isPlaying, currentTrack, togglePlay } = usePlayer();
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          toast({
            title: "Playback Error",
            description: "Unable to play this station. Please try another one.",
            variant: "destructive",
          });
          togglePlay();
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, toast, togglePlay]);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.audioUrl;
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          toast({
            title: "Playback Error",
            description: "Unable to play this station. Please try another one.",
            variant: "destructive",
          });
          togglePlay();
        });
      }
    }
  }, [currentTrack, isPlaying, toast, togglePlay]);

  if (!currentTrack) {
    return null;
  }

  return (
    <>
      <audio ref={audioRef} />
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black to-gray-900 p-2">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium truncate">{currentTrack.title}</h4>
            <p className="text-xs text-gray-400 truncate">{currentTrack.artist}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="text-gray-400 hover:text-white hidden sm:block">
              <SkipBack size={18} />
            </button>
            <button 
              className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-black hover:scale-105 transition"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button className="text-gray-400 hover:text-white hidden sm:block">
              <SkipForward size={18} />
            </button>
          </div>
          
          <div className="hidden sm:flex items-center space-x-2 w-24">
            <Volume2 size={18} className="text-gray-400" />
            <Slider
              defaultValue={[75]}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;