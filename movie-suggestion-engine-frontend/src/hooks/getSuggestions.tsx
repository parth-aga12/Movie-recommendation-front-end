import { useQuery } from 'react-query';
import { Movie } from '../components/Suggestions';

const fetchMovieSuggestions = async (username: string): Promise<Movie[]> => {
  const response = await fetch(`http://127.0.0.1:5050/GetMovieRecommendations/${username}`);

  const data = await response.json();
  if (!response.ok) {
    throw new Error('Invalid Username or No Films Reviewed');
  }
  return data;
};

const useSuggestions = (username: string) => {
  return useQuery<Movie[]>({
    queryKey: ['suggestions'],
    queryFn: () => fetchMovieSuggestions(username),
    enabled: false, // Disable automatic fetching
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: false, // Disable automatic retries
  });
};

export default useSuggestions;
