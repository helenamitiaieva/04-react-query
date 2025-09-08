import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from './MovieModal.module.css';
import type { Movie } from "../../types/movie";
import { makeImgUrl } from "../../services/movieService";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({movie, onClose}: MovieModalProps) => {
  const modalRoot = document.getElementById("modal-root")!;
useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const img = makeImgUrl(movie.backdrop_path ?? movie.poster_path, "original");

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onBackdropClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>

        {img && (
          <img src={img} alt={movie.title} className={css.image} />
        )}

        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
export default MovieModal;
