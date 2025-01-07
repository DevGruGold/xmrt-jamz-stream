import Layout from '@/components/Layout';
import { useFeaturedPlaylists } from '@/services/musicService';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const { data: playlists, isLoading, error } = useFeaturedPlaylists();

  if (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to load playlists. Please try again later.";
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
  }

  return (
    <Layout>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Featured Playlists</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-900 p-4 rounded-lg animate-pulse">
                  <div className="w-full aspect-square bg-gray-800 rounded-md mb-4"></div>
                  <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(playlists || []).slice(0, 6).map((playlist: any) => (
                <div
                  key={playlist.id}
                  className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                >
                  <img
                    src={playlist.picture_medium || '/placeholder.svg'}
                    alt={playlist.title}
                    className="w-full aspect-square object-cover rounded-md mb-4"
                  />
                  <h3 className="font-semibold">{playlist.title}</h3>
                  <p className="text-sm text-gray-400">
                    {playlist.nb_tracks} tracks
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
          <div className="bg-gray-900 rounded-lg p-4">
            <p className="text-gray-400">
              Your listening history will appear here
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;