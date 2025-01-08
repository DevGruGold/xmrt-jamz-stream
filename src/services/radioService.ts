import { useQuery } from "@tanstack/react-query";

interface RadioStation {
  id: string;
  name: string;
  url: string;
  favicon: string;
  tags: string;
  country: string;
  language: string;
}

const RADIO_API_BASE = "https://de1.api.radio-browser.info/json/stations";

export const searchRadioStations = async (
  searchTerm: string = ""
): Promise<RadioStation[]> => {
  const params = new URLSearchParams({
    limit: "50",
    hidebroken: "true",
    order: "clickcount",
    reverse: "true",
  });

  if (searchTerm) {
    params.append("name", searchTerm);
  }

  const response = await fetch(`${RADIO_API_BASE}/search?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch radio stations");
  }
  return response.json();
};

export const useRadioStations = (searchTerm?: string) => {
  return useQuery({
    queryKey: ["radioStations", searchTerm],
    queryFn: () => searchRadioStations(searchTerm),
  });
};