import Layout from '@/components/Layout';
import { useFeaturedPlaylists } from '@/services/musicService';
import { usePopularStations, useStationsByTag } from '@/services/radioService';
import { useToast } from '@/hooks/use-toast';
import { usePlayer } from '@/contexts/PlayerContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const { toast } = useToast();
  const { setCurrentTrack } = usePlayer();
  
  const { data: playlists, isLoading: playlistsLoading, error: playlistsError } = useFeaturedPlaylists();
  const { data: popularStations, isLoading: popularLoading, error: popularError } = usePopularStations(6);
  const { data: newsStations, isLoading: newsLoading } = useStationsByTag('news', 3);
  const { data: talkStations, isLoading: talkLoading } = useStationsByTag('talk', 3);
  const { data: sportsStations, isLoading: sportsLoading } = useStationsByTag('sports', 3);

  if (playlistsError || popularError) {
    toast({
      title: "Error",
      description: "Failed to load content. Please try again later.",
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
      audioUrl: '',
      type: 'music'
    });
  };

  const renderStationGrid = (stations: any[], loading: boolean) => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-900 p-3 rounded-lg animate-pulse">
              <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-800 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-2">
        {(stations || []).map((station: any) => (
          <div
            key={station.id}
            className="bg-gray-900 p-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
            onClick={() => handleRadioSelect(station)}
          >
            <h3 className="font-semibold truncate">{station.name}</h3>
            <p className="text-sm text-gray-400 truncate">
              {station.country} • {station.tags.split(',')[0]}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {station.bitrate}kbps • {station.codec}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="space-y-4">
        <section>
          <h2 className="text-lg font-bold mb-3">Live Radio Stations</h2>
          <Tabs defaultValue="popular" className="w-full">
            <TabsList className="mb-3">
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
              <TabsTrigger value="talk">Talk</TabsTrigger>
              <TabsTrigger value="sports">Sports</TabsTrigger>
            </TabsList>
            <TabsContent value="popular">
              {renderStationGrid(popularStations, popularLoading)}
            </TabsContent>
            <TabsContent value="news">
              {renderStationGrid(newsStations, newsLoading)}
            </TabsContent>
            <TabsContent value="talk">
              {renderStationGrid(talkStations, talkLoading)}
            </TabsContent>
            <TabsContent value="sports">
              {renderStationGrid(sportsStations, sportsLoading)}
            </TabsContent>
          </Tabs>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3">Featured Music Playlists</h2>
          {playlistsLoading ? (
            <div className="grid grid-cols-1 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-900 p-3 rounded-lg animate-pulse">
                  <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {(playlists || []).slice(0, 6).map((playlist) => (
                <div
                  key={playlist.id}
                  className="bg-gray-900 p-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                  onClick={() => handlePlaylistSelect(playlist)}
                >
                  <h3 className="font-semibold truncate">{playlist.title}</h3>
                  <p className="text-sm text-gray-400">
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