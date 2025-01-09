import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

interface Track {
  id: number;
  title: string;
  artist: {
    name: string;
  };
  album: {
    title: string;
    cover_medium: string;
  };
  preview: string;
}

interface DeezerResponse {
  data: Track[];
}

const DEEZER_API_BASE = "https://api.deezer.com";
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

// Expanded fallback playlists with more realistic data
const fallbackPlaylists = [
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

const handleApiError = (error: any) => {
  if (error?.status === 403 && error?.body?.includes("/corsdemo")) {
    toast({
      title: "CORS Access Required",
      description: "Please visit https://cors-anywhere.herokuapp.com/corsdemo and click 'Request temporary access' to enable playlist fetching.",
      variant: "destructive",
    });
    console.warn('CORS proxy access not enabled:', error);
    return fallbackPlaylists;
  }
  console.warn('Failed to fetch playlists from Deezer:', error);
  return fallbackPlaylists;
};

export const searchTracks = async (query: string): Promise<Track[]> => {
  try {
    const response = await fetch(
      `${CORS_PROXY}${DEEZER_API_BASE}/search?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw {
        status: response.status,
        body: await response.text(),
      };
    }
    const data: DeezerResponse = await response.json();
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getFeaturedPlaylists = async () => {
  try {
    const response = await fetch(
      `${CORS_PROXY}${DEEZER_API_BASE}/editorial/0/charts`
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw {
        status: response.status,
        body: errorText,
      };
    }
    const data = await response.json();
    return data.playlists?.data || fallbackPlaylists;
  } catch (error) {
    return handleApiError(error);
  }
};

export const useSearchTracks = (query: string) => {
  return useQuery({
    queryKey: ["tracks", query],
    queryFn: () => searchTracks(query),
    enabled: !!query,
  });
};

export const useFeaturedPlaylists = () => {
  return useQuery({
    queryKey: ["featuredPlaylists"],
    queryFn: getFeaturedPlaylists,
  });
};