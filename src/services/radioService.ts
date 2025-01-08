import { useQuery } from "@tanstack/react-query";

interface RadioStation {
  id: string;
  name: string;
  url: string;
  favicon: string;
  tags: string;
  country: string;
  language: string;
  codec: string;
  bitrate: number;
  votes: number;
  homepage: string;
}

const RADIO_API_BASE = "https://de1.api.radio-browser.info/json/stations";

const validateStreamUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('content-type');
    return contentType?.includes('audio') || contentType?.includes('stream') || false;
  } catch {
    return false;
  }
};

export const searchRadioStations = async (
  searchTerm: string = "",
  options: {
    limit?: number;
    offset?: number;
    tagList?: string[];
  } = {}
): Promise<RadioStation[]> => {
  const params = new URLSearchParams({
    limit: (options.limit || 50).toString(),
    offset: (options.offset || 0).toString(),
    hidebroken: "true",
    order: "votes",
    reverse: "true",
    codec: "MP3",
    has_extended_info: "true",
  });

  if (searchTerm) {
    params.append("name", searchTerm);
  }

  if (options.tagList?.length) {
    params.append("tagList", options.tagList.join(','));
  }

  const response = await fetch(`${RADIO_API_BASE}/search?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch radio stations");
  }
  
  const stations = await response.json();
  
  // Filter stations to include only those with valid URLs and sufficient votes
  const validStations = await Promise.all(
    stations
      .filter((station: RadioStation) => 
        station.url && 
        station.bitrate >= 64 && // Ensure minimum audio quality
        station.votes > 0 // Ensure some popularity/validity
      )
      .map(async (station: RadioStation) => {
        const isValid = await validateStreamUrl(station.url);
        return isValid ? station : null;
      })
  );

  return validStations.filter(Boolean);
};

export const getPopularStations = (limit: number = 12) => {
  return searchRadioStations("", { limit });
};

export const getStationsByTag = (tag: string, limit: number = 12) => {
  return searchRadioStations("", { tagList: [tag], limit });
};

export const useRadioStations = (searchTerm?: string, options = {}) => {
  return useQuery({
    queryKey: ["radioStations", searchTerm, options],
    queryFn: () => searchRadioStations(searchTerm, options),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 2,
  });
};

export const usePopularStations = (limit: number = 12) => {
  return useQuery({
    queryKey: ["popularStations", limit],
    queryFn: () => getPopularStations(limit),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export const useStationsByTag = (tag: string, limit: number = 12) => {
  return useQuery({
    queryKey: ["stationsByTag", tag, limit],
    queryFn: () => getStationsByTag(tag, limit),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};