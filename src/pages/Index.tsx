import Layout from '@/components/Layout';
import { useFeaturedPlaylists } from '@/services/musicService';
import { useRadioStations } from '@/services/radioService';
import { useToast } from '@/hooks/use-toast';
import { usePlayer } from '@/contexts/PlayerContext';

const Index = () => {
  const { toast } = useToast();
  const { setCurrentTrack } = usePlayer();
  const { data: playlists, isLoading: playlistsLoading, error: playlistsError } = useFeaturedPlaylists();
  const { data: radioStations, isLoading: radioLoading, error: radioError } = useRadioStations();

  if (playlistsError) {
    const errorMessage = playlistsError instanceof Error ? playlistsError.message : "Failed to load playlists. Please try again later.";
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
  }

  if (radioError) {
    toast({
      title: "Error",
      description: "Failed to load radio stations. Please try again later.",
      variant: "destructive",
    });
  }

  const handleRadioSelect = (station: any) => {
    setCurrentTrack({
      title: station.name,
      artist: station.country,
      imageUrl: station.favicon || '/placeholder.svg',
      audioUrl: station.url,
      type: 'radio'
    });
  };

  const handlePlaylistSelect = (playlist: any) => {
    setCurrentTrack({
      title: playlist.title,
      artist: 'Various Artists',
      imageUrl: playlist.picture_medium || '/placeholder.svg',
      audioUrl: '', // You'd need to fetch the actual track URL from the Deezer API
      type: 'music'
    });
  };

  return (
    <Layout>
      <div className="space-y-6 md:space-y-8">
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-4">Live Radio Stations</h2>
          {radioLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-900 p-4 rounded-lg animate-pulse">
                  <div className="w-full aspect-square bg-gray-800 rounded-md mb-4"></div>
                  <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(radioStations || []).slice(0, 6).map((station: any) => (
                <div
                  key={station.id}
                  className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                  onClick={() => handleRadioSelect(station)}
                >
                  <img
                    src={station.favicon || '/placeholder.svg'}
                    alt={station.name}
                    className="w-full aspect-square object-cover rounded-md mb-4"
                  />
                  <h3 className="font-semibold truncate">{station.name}</h3>
                  <p className="text-sm text-gray-400 truncate">
                    {station.country} • {station.tags.split(',')[0]}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-4">Featured Music Playlists</h2>
          {playlistsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-900 p-4 rounded-lg animate-pulse">
                  <div className="w-full aspect-square bg-gray-800 rounded-md mb-4"></div>
                  <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(playlists || []).slice(0, 6).map((playlist: any) => (
                <div
                  key={playlist.id}
                  className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                  onClick={() => handlePlaylistSelect(playlist)}
                >
                  <img
                    src={playlist.picture_medium || '/placeholder.svg'}
                    alt={playlist.title}
                    className="w-full aspect-square object-cover rounded-md mb-4"
                  />
                  <h3 className="font-semibold truncate">{playlist.title}</h3>
                  <p className="text-sm text-gray-400 truncate">
                    {playlist.nb_tracks} tracks
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Index;