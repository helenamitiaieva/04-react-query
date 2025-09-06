import css from './MovieGrid.module.css';
import type { Movie } from '../../types/movie';
import { makeImgUrl } from '../../services/movieService';

interface MovieGridProps {
    movies: Movie[];
    onSelect: (movie: Movie) => void;
}

const MovieGrid = ({movies, onSelect}: MovieGridProps) => {
    if(!movies.length) return null;
  return (
<ul className={css.grid}>
    {movies.map((m) => {
    const img = makeImgUrl(m.poster_path, 'w500');
    return (
       <li key={m.id}>
        <div className={css.card} onClick={()=>onSelect(m)}>
        {img ? (
            <img 
		    className={css.image} 
		    src={img} 
		    alt={m.title}  
		    loading="lazy" 
		  />
        ) : (
        <div className={css.placeholder} aria-label="no poster" />
        )} 
	    <h2 className={css.title}>{m.title}</h2>
    </div>
  </li>
    );
  })}
  </ul>
  );
}

export default MovieGrid;