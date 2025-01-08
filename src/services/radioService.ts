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
    const response = await fetch(url, { 
      method: 'HEAD',
      mode: 'no-cors' // Add no-cors mode to handle CORS issues
    });
    return true; // If we get here with no-cors, assume it's valid
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
  try {
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

    // Use a random mirror from the available ones
    const mirrors = [
      "de1.api.radio-browser.info",
      "fr1.api.radio-browser.info",
      "nl1.api.radio-browser.info"
    ];
    const randomMirror = mirrors[Math.floor(Math.random() * mirrors.length)];
    
    const response = await fetch(`https://${randomMirror}/json/stations/search?${params.toString()}`);
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
  } catch (error) {
    console.error("Error fetching radio stations:", error);
    return []; // Return empty array instead of throwing
  }
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
