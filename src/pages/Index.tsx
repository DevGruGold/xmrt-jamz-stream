import Layout from '@/components/Layout';
import { useFeaturedPlaylists } from '@/services/musicService';
import { usePopularStations, useStationsByTag, updateStationPreference } from '@/services/radioService';
import { useToast } from '@/hooks/use-toast';
import { usePlayer } from '@/contexts/PlayerContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserPlaylists, useCreatePlaylist, useAddToPlaylist } from '@/services/playlistService';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from 'react';

const Index = () => {
  const { toast } = useToast();
  const { setCurrentTrack } = usePlayer();
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { data: playlists, isLoading: playlistsLoading } = useUserPlaylists();
  const { mutate: createPlaylist } = useCreatePlaylist();
  const { mutate: addToPlaylist } = useAddToPlaylist();
  
  const { data: popularStations, isLoading: popularLoading } = usePopularStations(6);
  const { data: newsStations, isLoading: newsLoading } = useStationsByTag('news', 3);
  const { data: talkStations, isLoading: talkLoading } = useStationsByTag('talk', 3);
  const { data: sportsStations, isLoading: sportsLoading } = useStationsByTag('sports', 3);

  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a playlist name",
        variant: "destructive",
      });
      return;
    }

    createPlaylist(newPlaylistName, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Playlist created successfully",
        });
        setNewPlaylistName('');
        setIsDialogOpen(false);
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to create playlist",
          variant: "destructive",
        });
      },
    });
  };

  const handleRadioSelect = async (station: any) => {
    try {
      await updateStationPreference(station.id);
      setCurrentTrack({
        title: station.name,
        artist: station.country,
        imageUrl: station.favicon || '/placeholder.svg',
        audioUrl: station.url,
        type: 'radio'
      });
    } catch (error) {
      console.error('Error updating station preference:', error);
    }
  };

  const handleAddToPlaylist = (playlist: any, track: any) => {
    addToPlaylist({ playlistId: playlist.id, track }, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Added to playlist successfully",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to add to playlist",
          variant: "destructive",
        });
      },
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
          <div key={station.id} className="bg-gray-900 p-3 rounded-lg">
            <div className="flex justify-between items-start">
              <div 
                className="flex-1 cursor-pointer hover:bg-gray-800 p-2 rounded transition"
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add to Playlist</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2">
                    {playlists?.map((playlist) => (
                      <Button
                        key={playlist.id}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleAddToPlaylist(playlist, {
                          title: station.name,
                          artist: station.country,
                          audioUrl: station.url,
                          type: 'radio'
                        })}
                      >
                        {playlist.name}
                      </Button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="space-y-4">
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold">Your Playlists</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Playlist
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Playlist</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Playlist name"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                  />
                  <Button onClick={handleCreatePlaylist}>Create</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          {playlistsLoading ? (
            <div className="grid grid-cols-1 gap-2">
              {[1, 2].map((i) => (
                <div key={i} className="bg-gray-900 p-3 rounded-lg animate-pulse">
                  <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {(playlists || []).map((playlist) => (
                <div
                  key={playlist.id}
                  className="bg-gray-900 p-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                >
                  <h3 className="font-semibold truncate">{playlist.name}</h3>
                  <p className="text-sm text-gray-400">
                    {playlist.tracks.length} tracks
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

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
      </div>
    </Layout>
  );
};

export default Index;