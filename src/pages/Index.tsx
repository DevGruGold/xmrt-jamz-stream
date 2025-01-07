import Layout from '@/components/Layout';

const featuredPlaylists = [
  {
    id: 1,
    title: "Today's Top Hits",
    description: "The biggest hits right now",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Discover Weekly",
    description: "Your weekly mixtape of fresh music",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Chill Vibes",
    description: "Lay back and enjoy the music",
    imageUrl: "/placeholder.svg"
  }
];

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Featured Playlists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition cursor-pointer"
              >
                <img
                  src={playlist.imageUrl}
                  alt={playlist.title}
                  className="w-full aspect-square object-cover rounded-md mb-4"
                />
                <h3 className="font-semibold">{playlist.title}</h3>
                <p className="text-sm text-gray-400">{playlist.description}</p>
              </div>
            ))}
          </div>
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