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

const TOP_1FM_STATIONS: RadioStation[] = [
  {
    id: "1fm-top40",
    name: "1.FM - America's Top 40",
    url: "https://strm112.1.fm/top40_mobile_mp3",
    favicon: "/placeholder.svg",
    tags: "pop,top40,hits,popular",
    country: "United States",
    language: "English",
    codec: "MP3",
    bitrate: 128,
    votes: 15000,
    homepage: "https://1.fm"
  },
  {
    id: "1fm-alternative",
    name: "1.FM - Alternative Rock",
    url: "https://strm112.1.fm/x_mobile_mp3",
    favicon: "/placeholder.svg",
    tags: "rock,alternative,indie",
    country: "United States",
    language: "English",
    codec: "MP3",
    bitrate: 128,
    votes: 12000,
    homepage: "https://1.fm"
  },
  {
    id: "1fm-country",
    name: "1.FM - Country One",
    url: "https://strm112.1.fm/country_mobile_mp3",
    favicon: "/placeholder.svg",
    tags: "country,americana",
    country: "United States",
    language: "English",
    codec: "MP3",
    bitrate: 128,
    votes: 10000,
    homepage: "https://1.fm"
  },
  {
    id: "1fm-hiphop",
    name: "1.FM - Urban Hip Hop",
    url: "https://strm112.1.fm/jamz_mobile_mp3",
    favicon: "/placeholder.svg",
    tags: "hiphop,rap,urban",
    country: "United States",
    language: "English",
    codec: "MP3",
    bitrate: 128,
    votes: 9500,
    homepage: "https://1.fm"
  },
  {
    id: "1fm-dance",
    name: "1.FM - Dance One",
    url: "https://strm112.1.fm/dance_mobile_mp3",
    favicon: "/placeholder.svg",
    tags: "dance,electronic,edm",
    country: "United States",
    language: "English",
    codec: "MP3",
    bitrate: 128,
    votes: 9000,
    homepage: "https://1.fm"
  },
  {
    id: "1fm-blues",
    name: "1.FM - Blues",
    url: "https://strm112.1.fm/blues_mobile_mp3",
    favicon: "/placeholder.svg",
    tags: "blues,jazz",
    country: "United States",
    language: "English",
    codec: "MP3",
    bitrate: 128,
    votes: 8500,
    homepage: "https://1.fm"
  },
  {
    id: "1fm-classical",
    name: "1.FM - Otto's Classical",
    url: "https://strm112.1.fm/classical_mobile_mp3",
    favicon: "/placeholder.svg",
    tags: "classical,orchestral",
    country: "United States",
    language: "English",
    codec: "MP3",
    bitrate: 128,
    votes: 8000,
    homepage: "https://1.fm"
  },
  {
    id: "1fm-reggae",
    name: "1.FM - ReggaeTrade",
    url: "https://strm112.1.fm/reggae_mobile_mp3",
    favicon: "/placeholder.svg",
    tags: "reggae,caribbean",
    country: "United States",
    language: "English",
    codec: "MP3",
    bitrate: 128,
    votes: 7500,
    homepage: "https://1.fm"
  }
];

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
    staleTime: 5 * 60 * 1000,
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