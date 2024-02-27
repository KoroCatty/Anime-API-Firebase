// API REFERENCE:  https://docs.api.jikan.moe/

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { css } from "@emotion/react";
import { min, max } from "../../../styles/mediaQuery";

import Pagination from "./Pagination";

// TYPE
type PropsType = {
  search: string;
  setSearch: (search: string) => void;
};

type Anime = {
  mal_id: number;
  title: string;
  images: {
    webp: {
      image_url: string;
    };
  };
};

type PaginationType = {
  has_next_page: boolean;
};

type ApiResponse = {
  data: Anime[];
  pagination: PaginationType;
};

const AnimeApi = ({ search, setSearch }: PropsType) => {
  const animeApiCSS = css`
    max-width: 1280px;
    margin: 0 auto;

    .animeApi {
      margin-top: 6rem;
      position: relative;
      padding: 12rem 0 4rem 0;

      // 1px〜519px
      ${min[0] + max[0]} {
        padding: 6rem 0 4rem 0;
        margin-top: 3rem;
      }
      // 520px〜767px
      ${min[1] + max[1]} {
        padding: 8rem 0 4rem 0;
        margin-top: 4rem;
      }
      // 768px 〜 989px
      ${min[2] + max[2]} {
        padding: 10rem 0 4rem 0;
        margin-top: 5rem;
      }

      &__title {
        font-size: 10rem;
        color: rgba(244, 148, 173, 0.1);
        font-weight: bold;
        position: absolute;
        top: -1rem;
        left: 0;

        // 1px〜519px
        ${min[0] + max[0]} {
          font-size: 5rem;
        }
        // 520px〜767px
        ${min[1] + max[1]} {
          font-size: 6rem;
        }
        // 768px 〜 989px
        ${min[2] + max[2]} {
          font-size: 8rem;
        }
      }

      .animes {
        text-align: center;
        padding-bottom: 40px;

        // 1px〜519px
        ${min[0] + max[0]} {
          margin: 0 8px;
        }
        // 520px〜767px
        ${min[1] + max[1]} {
          margin: 0 8px;
        }
        // 768px〜989px
        ${min[2] + max[2]} {
        }
        // 990px〜1200px
        ${min[3] + max[3]} {
        }

        label {
          font-size: 2rem;
        }

        &__search {
          width: 60%;
          height: 40px;
          border-radius: 4px;
          margin-bottom: 40px;

          // 1px〜519px
          ${min[0] + max[0]} {
            width: 80%;
          }
        }

        // inside of the input
        input[type="text"] {
          padding-left: 16px;
          font-size: 1.4rem;
          outline: none;
          border: none;
          box-shadow: 0 0 4px var(--font);
          color: var(--font);
          letter-spacing: 1px;
        }

        input[type="text"]::placeholder {
          color: rgba(241, 161, 165, 0.4);
          letter-spacing: 1px;
        }

        // Button
        #searchBtn {
          color: var(--font_dark);
          font-weight: bold;
          border: none;
          box-shadow: 0 0 4px white;
          border-radius: 4px;
          transform: translate(0, -2px);
          margin-left: 8px;
          cursor: pointer;
          padding: 12px 20px;
          text-shadow: 0 3px 20px rgba(241, 161, 165, 1);
          background-color: var(--bg);
          font-size: 1.1rem;

          // 1px〜519px
          ${min[0] + max[0]} {
            width: 50%;
            margin-bottom: 2rem;
          }

          &::before {
            content: "🔍";
            margin-right: 8px;
          }

          &:hover {
            transition: 0.2s all ease;
            font-weight: bold;
            transform: translate(0, -4px);
            transform: scale(1.1);
            color: var(--font);
          }
        }

        &__error {
          font-size: 2rem;
          color: var(--font);
          font-weight: 900;
        }
      }
    }

    // Results cards
    #searchResults {
      display: flex;
      justify-content: center;
      margin: 0 auto;
      flex-wrap: wrap;
      text-align: center;
      gap: 2rem;

      // 1px〜519px
      ${min[0] + max[0]} {
        width: 100%;
        gap: 2rem 0.5rem;
      }
      // 520px〜767px
      ${min[1] + max[1]} {
      }

      .cardResult {
        width: 20%;

        // 1px〜519px
        ${min[0] + max[0]} {
          width: 30%;
        }
        // 520px〜767px
        ${min[1] + max[1]} {
          width: 24%;
        }
        // 768px〜989px
        ${min[2] + max[2]} {
          width: 30%;
        }

        &__img {
          width: 200px;
          height: 240px;
          object-fit: cover;
          border-radius: 4px;
          box-shadow: 0 0 4px var(--font);

          // 1px〜519px
          ${min[0] + max[0]} {
            width: 100%;
            height: 150px;
          }

          // 520px〜767px
          ${min[1] + max[1]} {
            width: 100%;
            height: 220px;
          }
          // 768px〜989px
          ${min[2] + max[2]} {
          }

          &:hover {
            @media screen and (min-width: 768px) {
              transition: 0.3s all ease;
              transform: scale(1.1);
              filter: brightness(0.8);
            }
          }
        }

        &__title {
          text-align: center;
          word-wrap: normal;
          color: var(--font_dark);
          margin-top: 0.4rem;

          // 1px〜519px
          ${min[0] + max[0]} {
            font-size: 0.85rem;
          }
        }
      }
    }
  `;

  // page state
  const [pageNumber, setPageNumber] = useState(1);

  const [results, setResults] = useState<ApiResponse | null>(null);

  // End Point
  const animeApi = `https://api.jikan.moe/v4/anime?page=${pageNumber}`; // &limit=20

  // ==========================================================
  // Get API Data
  // ==========================================================
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animeApi]);

  // ==================================
  // Get API Data 
  // ==================================
  async function getData() {
    try {
      const res = await fetch(`${animeApi}&q=${search}`);
      const json = await res.json();
      setResults(json);
    } catch (err) {
      console.log(err);
    }
  }

  // ===================================================
  // Change the state by being changed in an input
  // ===================================================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // to set the value user typed to useState (to make it visible)
    setSearch(e.target.value); // value user typed saves to useState
    setPageNumber(1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getData();
  };

  return (
    <section css={animeApiCSS}>
      <div className="animeApi">
        <h2 className="animeApi__title">SEARCH</h2>

        <div className="animes">
          <form onSubmit={handleSubmit}>
            <input
              className="animes__search"
              type="text"
              id="search"
              name="search"
              onChange={(e) => handleChange(e)}
              // defaultValue={(window.localStorage.getItem("search"))}
              value={search}
              placeholder="Type anime name"
            />

            <button id="searchBtn" type="submit">
              Search
            </button>
          </form>

          {/* if there's no data found, print out error message */}
          {results && results.data.length > 0 ? (
            ""
          ) : (
            <p className="animes__error">No results found!</p>
          )}

          <div id="searchResults">
            {/* HTML出力。 {}で囲まないといけない resultsに何も入っていないと実行されない*/}
            {results &&
              results.data.map((anime, index) => (
                <div key={index} className="cardResult">
                  {/*  このURLの中身はクリックしたカードのIDが入ってる*/}
                  <Link to={`/${anime.mal_id}`}>
                    <img
                      src={anime.images.webp.image_url}
                      alt=""
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
              ))}
          </div>
          {/* !!results converts results to a boolean. It'll be true if results is not null */}
          {/*  results.data.length > 0 checks if there are any items in the data array. */}
          <Pagination
            results={!!results && results.data.length > 0}
            resultsData={results}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div>
      </div>
    </section>
  );
};

export default AnimeApi;
