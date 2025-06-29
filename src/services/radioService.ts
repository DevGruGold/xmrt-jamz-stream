import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getDeviceId } from "@/utils/deviceId";

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
    url: "https://strm112.1.fm/atr_mobile_mp3",
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
    id: "1fm-00s-hiphop",
    name: "1.FM - 00's Hip Hop",
    url: "https://strm112.1.fm/club_mobile_mp3",
    favicon: "/placeholder.svg",
    tags: "hiphop,rap,00s",
    country: "United States",
    language: "English",
    codec: "MP3",
    bitrate: 128,
    votes: 9500,
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

export const useStationsByTag = (tag: string, limit: number = 12) => {
  return useQuery({
    queryKey: ['stationsByTag', tag, limit],
    queryFn: () => getStationsByTag(tag, limit),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export const usePopularStations = (limit: number = 12) => {
  const { data: preferences } = useStationPreferences();
  
  return useQuery({
    queryKey: ['popularStations', limit, preferences],
    queryFn: async () => {
      const stations = await getPopularStations(limit);
      
      if (!preferences?.length) return stations;
      
      // Sort stations based on user preferences
      return stations.sort((a, b) => {
        const prefA = preferences.find(p => p.station_id === a.id);
        const prefB = preferences.find(p => p.station_id === b.id);
        
        if (prefA && !prefB) return -1;
        if (!prefA && prefB) return 1;
        if (prefA && prefB) {
          return prefB.play_count - prefA.play_count;
        }
        return 0;
      });
    },
  });
};

export const updateStationPreference = async (stationId: string) => {
  const { error } = await supabase
    .from('station_preferences')
    .upsert({
      device_id: getDeviceId(),
      station_id: stationId,
      last_played: new Date().toISOString(),
    }, {
      onConflict: 'device_id,station_id',
    });

  if (error) throw error;
};

export const useStationPreferences = () => {
  return useQuery({
    queryKey: ['stationPreferences'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('station_preferences')
        .select('*')
        .eq('device_id', getDeviceId())
        .order('play_count', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};