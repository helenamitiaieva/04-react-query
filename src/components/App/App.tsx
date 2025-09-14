import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import styles from './App.module.css';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies, type TMDBSearchResponse } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import Loader from '../Loader/Loader';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage  from '../ErrorMessage/ErrorMessage';
import ReactPaginate from 'react-paginate';
import MovieModal from '../MovieModal/MovieModal';

function App() {
const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
const [query, setQuery] = useState('');
const [page, setPage] = useState(1);

const { data, isLoading, isError, isFetching, isSuccess } = useQuery<TMDBSearchResponse>({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== '',                  
    placeholderData: keepPreviousData,  
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  const handleSearch = (newQuery: string) => {
    setSelectedMovie(null);
    setQuery(newQuery);
    setPage(1);                            
  };

  if (query && isSuccess && movies.length === 0) {
    toast.error('No movies found for your request.');
  }

  return (
    <div className={styles.app}>
        <SearchBar onSubmit={handleSearch} />

        {(isLoading || isFetching) && <Loader />}
        {isError && <ErrorMessage />}

        {!isLoading && !isError && movies.length > 0 && (
        <>
          <MovieGrid movies={movies} onSelect={(m) => setSelectedMovie(m)} />

          {totalPages > 1 && (
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => setPage(selected + 1)}
              forcePage={page - 1}
              containerClassName={styles.pagination}
              activeClassName={styles.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}

      <Toaster position="top-right" />
    </div>
  )
}

export default App
