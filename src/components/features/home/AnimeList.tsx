import { Link } from "react-router-dom";

type Anime = {
  index: number;
  anime: {
    mal_id: number;
    title: string;
    images: {
      webp: {
        image_url: string;
      };
    };
  };
};

const AnimeList = ({ index, anime }: Anime) => {
  return (
    <>
      <div key={index} className="cardResult" data-testid={`animeIdx-${index}`}>
        {/*  このURLの中身はクリックしたカードのIDが入ってる*/}
        <Link to={`/${anime.mal_id}`}>
          <img
            src={anime.images.webp.image_url}
            alt={anime.title}
            className="cardResult__img"
          />
        </Link>
        {/* If there's more than 40, add "..." */}
        <p className="cardResult__title">
          {anime.title.length > 40
            ? anime.title.substring(0, 40) + "..."
            : anime.title.substring(0, 40)}
        </p>
      </div>
    </>
  );
};

export default AnimeList;
