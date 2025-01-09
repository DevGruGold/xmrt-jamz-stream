import { useQuery } from "@tanstack/react-query";

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

// Fallback playlists in case the API fails
const fallbackPlaylists = [
  {
    id: 1,
    title: "Top Hits 2024",
    picture_medium: "/placeholder.svg",
    nb_tracks: 50
  },
  {
    id: 2,
    title: "Chill Vibes",
    picture_medium: "/placeholder.svg",
    nb_tracks: 40
  },
  {
    id: 3,
    title: "Workout Essentials",
    picture_medium: "/placeholder.svg",
    nb_tracks: 45
  }
];

const handleApiError = (error: any) => {
  if (error?.status === 403 && error?.body?.includes("/corsdemo")) {
    throw new Error(
      "CORS Proxy access not enabled. Please visit https://cors-anywhere.herokuapp.com/corsdemo and click 'Request temporary access'"
    );
  }
  throw error;
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
    handleApiError(error);
    throw error;
  }
};

export const getFeaturedPlaylists = async (): Promise<any[]> => {
  try {
    const response = await fetch(
      `${CORS_PROXY}${DEEZER_API_BASE}/editorial/0/charts`
    );
    if (!response.ok) {
      throw {
        status: response.status,
        body: await response.text(),
      };
    }
    const data = await response.json();
    return data.playlists?.data || [];
  } catch (error) {
    console.warn('Failed to fetch playlists from Deezer, using fallback data:', error);
    return fallbackPlaylists;
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