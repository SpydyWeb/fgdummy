import { useQuery } from "@tanstack/react-query";
import apiCalls from "../api/apiCalls";
export const useGetFollowUpsQuery = (payload, options = {}) => {
  return useQuery({
    queryKey: ["ctst-master", payload], //  payload-sensitive cache
    queryFn: () => apiCalls.getDashboardFollowUps(payload),
    enabled: !!payload,
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60,
    select: (data) => {
      return data?.data || [];
    
    },
    retry: 1,
    ...options, // allow overrides
  });
};
