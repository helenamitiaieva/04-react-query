import { useState } from 'react';
import styles from './App.module.css';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import Loader from '../Loader/Loader';
import MovieGrid from '../MovieGrid/MovieGrid';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import {MovieModal} from '../MovieModal/MovieModal';

function App() {
const [movies, setMovies] = useState<Movie[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);
const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

const handleSearch = async (query: string) => {
  setLoading(true);
  setMovies([]);

  try {
    setError(false);
    setLoading(true);
    const data = await fetchMovies(query);
    if(!data.results.length) {
      toast.error('No movies found for your request.');
      return;
    }
    setMovies(data.results);
  } catch {
    setError(true);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      {loading &&  <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && (
        <MovieGrid 
  movies={movies}
  onSelect={(movie) => setSelectedMovie(movie)}
/>)}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      
      <Toaster position="top-right" />
    </div>
  )
}

export default App
