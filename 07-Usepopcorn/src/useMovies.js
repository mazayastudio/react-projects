import { useEffect, useState } from 'react';

const KEY = 'f1cc5dd0';

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    callback?.();

    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error('Failed to fetch movies');

        const data = await res.json();
        if (data.Response === 'False') throw new Error('No movies found');
        setMovies(data.Search);
        setError('');
      }
      catch (err) {
        console.error(err);

        if (err.name !== 'AbortError')
          setError(err.message);
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
    return () => controller.abort();
  }, [query]);
  return { movies, isLoading, error };
}