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
  preview: string; // 30-second preview URL
}

interface DeezerResponse {
  data: Track[];
}

const DEEZER_API_BASE = "https://api.deezer.com";
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

export const searchTracks = async (query: string): Promise<Track[]> => {
  const response = await fetch(
    `${CORS_PROXY}${DEEZER_API_BASE}/search?q=${encodeURIComponent(query)}`
  );
  const data: DeezerResponse = await response.json();
  return data.data;
};

export const useSearchTracks = (query: string) => {
  return useQuery({
    queryKey: ["tracks", query],
    queryFn: () => searchTracks(query),
    enabled: !!query,
  });
};

export const getFeaturedPlaylists = async (): Promise<any[]> => {
  const response = await fetch(
    `${CORS_PROXY}${DEEZER_API_BASE}/editorial/0/charts`
  );
  const data = await response.json();
  return data.playlists?.data || [];
};

export const useFeaturedPlaylists = () => {
  return useQuery({
    queryKey: ["featuredPlaylists"],
    queryFn: getFeaturedPlaylists,
  });
};