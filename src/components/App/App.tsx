import { useState } from 'react';
import styles from './App.module.css';
import './App.css'
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
 import type { Movie } from '../../types/movie';

function App() {
const [movies, setMovies] = useState<Movie[]>([]);
const handleSearch = async (query: string) => {
  setMovies([]);

  try {
    const data = await fetchMovies(query);
    if(!data.results.length) {
      toast.error('No movies found for your request.');
      return;
    }
    setMovies(data.results);
  } catch {
    toast.error('Something went wrong. Try again later.')
  }
};

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
      <Toaster position="top-right" />
    </div>
  )
}

export default App
