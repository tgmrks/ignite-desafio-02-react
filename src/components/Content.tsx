import { useState } from "react";
import { MovieCard } from "./MovieCard";

import { api } from '../services/api';
import { useEffect } from "react";
import { Header } from "./Header";

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface SelectedGenreProps {
  selectedGenre: {
    id: number;
    name: string;
    title: string;
  }
}
interface ContentProps{
  selectedGenreId: number;
}

export function Content({ selectedGenreId }: ContentProps) {

  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);
  return (
    <>
      <Header selectedGenre={selectedGenre} />
      <main>

        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />))
          }
        </div>

      </main>
    </>
  )
}