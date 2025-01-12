import { supabase } from "@/integrations/supabase/client";
import { getDeviceId } from "@/utils/deviceId";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Playlist {
  id: string;
  name: string;
  tracks: Array<{
    title: string;
    artist: string;
    audioUrl: string;
    type: 'radio' | 'music';
  }>;
}

export const useUserPlaylists = () => {
  return useQuery({
    queryKey: ['playlists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('anonymous_playlists')
        .select('*')
        .eq('device_id', getDeviceId());
      
      if (error) throw error;
      return data as Playlist[];
    },
  });
};

export const useCreatePlaylist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (name: string) => {
      const { data, error } = await supabase
        .from('anonymous_playlists')
        .insert({
          device_id: getDeviceId(),
          name,
          tracks: [],
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
    },
  });
};

export const useAddToPlaylist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      playlistId, 
      track 
    }: { 
      playlistId: string; 
      track: Playlist['tracks'][0];
    }) => {
      const { data: playlist } = await supabase
        .from('anonymous_playlists')
        .select('tracks')
        .eq('id', playlistId)
        .single();

      const { error } = await supabase
        .from('anonymous_playlists')
        .update({
          tracks: [...(playlist?.tracks || []), track],
          last_played: new Date().toISOString(),
        })
        .eq('id', playlistId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
    },
  });
};