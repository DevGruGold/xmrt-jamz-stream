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

// Define 1.fm's top 10 stations
const TOP_1FM_STATIONS: RadioStation[] = [
  {
    id: "1fm-top40",
    name: "1.FM - Top 40",
    url: "https://strm112.1.fm/top40_mobile_mp3",
    favicon: "https://1.fm/assets/images/logo.png",
    tags: "pop,top40,hits",
    country: "Switzerland",
    language: "English",
    codec: "MP3",
    bitrate: 128,
    votes: 1000,
    homepage: "https://1.fm"
  },
  {
    id: "1fm-60s",
    name: "1.FM - 60s Hits",
    url: "https://strm112.1.fm/60s_70s_mobile_mp3",
    favicon: "https://1.fm/assets/images/logo.png",
    tags: "60s,oldies",
    country: "Switzerland",
    language: "English",
    codec: "MP3",
    bitrate: 128,
    votes: 950,
    homepage: "https://1.fm"
  },
  {
    id: "1fm-blues",
    name: "1.FM - Blues",
    url: "https://strm112.1.fm/blues_mobile_mp3",
    favicon: "https://1.fm/assets/images/logo.png",
    tags: "blues",
    country: "Switzerland",
    language: "English",
    codec: "MP3",
    bitrate: 128,
    votes: 900,
    homepage: "https://1.fm"
  },
  {
    id: "1fm-rock",
    name: "1.FM - Rock Classics",
    url: "https://strm112.1.fm/rockclassics_mobile_mp3",
    favicon: "https://1.fm/assets/images/logo.png",
    tags: "rock,classic",
    country: "Switzerland",
    language: "English",
    codec: "MP3",
    bitrate: 128,
    votes: 850,
    homepage: "https://1.fm"
  },
  {
    id: "1fm-dance",
    name: "1.FM - Dance One",
    url: "https://strm112.1.fm/dance_mobile_mp3",
    favicon: "https://1.fm/assets/images/logo.png",
    tags: "dance,electronic",
    country: "Switzerland",
    language: "English",
    codec: "MP3",
    bitrate: 128,
    votes: 800,
    homepage: "https://1.fm"
  },
  {
    id: "1fm-reggae",
    name: "1.FM - Reggae Trade",
    url: "https://strm112.1.fm/reggae_mobile_mp3",
    favicon: "https://1.fm/assets/images/logo.png",
    tags: "reggae",
    country: "Switzerland",
    language: "English",
    codec: "MP3",
    bitrate: 128,
    votes: 750,
    homepage: "https://1.fm"
  },
  {
    id: "1fm-classical",
    name: "1.FM - Classical",
    url: "https://strm112.1.fm/classical_mobile_mp3",
    favicon: "https://1.fm/assets/images/logo.png",
    tags: "classical",
    country: "Switzerland",
    language: "English",
    codec: "MP3",
    bitrate: 128,
    votes: 700,
    homepage: "https://1.fm"
  },
  {
    id: "1fm-chillout",
    name: "1.FM - Chillout Lounge",
    url: "https://strm112.1.fm/chilloutlounge_mobile_mp3",
    favicon: "https://1.fm/assets/images/logo.png",
    tags: "chillout,lounge",
    country: "Switzerland",
    language: "English",
    codec: "MP3",
    bitrate: 128,
    votes: 650,
    homepage: "https://1.fm"
  },
  {
    id: "1fm-jazz",
    name: "1.FM - Jazz",
    url: "https://strm112.1.fm/jazz_mobile_mp3",
    favicon: "https://1.fm/assets/images/logo.png",
    tags: "jazz",
    country: "Switzerland",
    language: "English",
    codec: "MP3",
    bitrate: 128,
    votes: 600,
    homepage: "https://1.fm"
  },
  {
    id: "1fm-country",
    name: "1.FM - Country",
    url: "https://strm112.1.fm/country_mobile_mp3",
    favicon: "https://1.fm/assets/images/logo.png",
    tags: "country",
    country: "Switzerland",
    language: "English",
    codec: "MP3",
    bitrate: 128,
    votes: 550,
    homepage: "https://1.fm"
  }
];

// Simplified search function that only returns 1.fm stations
export const searchRadioStations = async (
  searchTerm: string = "",
  options: {
    limit?: number;
    offset?: number;
    tagList?: string[];
  } = {}
): Promise<RadioStation[]> => {
  let stations = [...TOP_1FM_STATIONS];
  
  // Filter by tags if provided
  if (options.tagList?.length) {
    stations = stations.filter(station => 
      options.tagList?.some(tag => station.tags.toLowerCase().includes(tag.toLowerCase()))
    );
  }

  // Filter by search term if provided
  if (searchTerm) {
    stations = stations.filter(station => 
      station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.tags.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply limit and offset
  const start = options.offset || 0;
  const end = options.limit ? start + options.limit : undefined;
  return stations.slice(start, end);
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