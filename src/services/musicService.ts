import { useQuery } from "@tanstack/react-query";

interface Playlist {
  id: number;
  title: string;
  picture_medium: string;
  nb_tracks: number;
  description: string;
}

const playlists: Playlist[] = [
  {
    id: 1,
    title: "Top Hits 2024",
    picture_medium: "/placeholder.svg",
    nb_tracks: 50,
    description: "The hottest tracks right now"
  },
  {
    id: 2,
    title: "Chill Vibes",
    picture_medium: "/placeholder.svg",
    nb_tracks: 40,
    description: "Relaxing tunes for your day"
  },
  {
    id: 3,
    title: "Workout Essentials",
    picture_medium: "/placeholder.svg",
    nb_tracks: 45,
    description: "High-energy tracks for your workout"
  },
  {
    id: 4,
    title: "Classic Rock Hits",
    picture_medium: "/placeholder.svg",
    nb_tracks: 35,
    description: "Timeless rock classics"
  },
  {
    id: 5,
    title: "Hip Hop Now",
    picture_medium: "/placeholder.svg",
    nb_tracks: 42,
    description: "Latest hip hop tracks"
  }
];

const getFeaturedPlaylists = async (): Promise<Playlist[]> => {
  return Promise.resolve(playlists);
};

export const useFeaturedPlaylists = () => {
  return useQuery({
    queryKey: ["featuredPlaylists"],
    queryFn: getFeaturedPlaylists,
  });
};