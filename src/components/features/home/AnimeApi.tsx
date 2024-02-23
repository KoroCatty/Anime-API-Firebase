// API REFERENCE:  https://docs.api.jikan.moe/

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { css } from "@emotion/react";
import { min, max } from "../../../styles/mediaQuery";

// TYPE
type PropsType = {
  search: string;
  setSearch: (search: string) => void;
};

interface Anime {
  mal_id: number;
  title: string;
  images: {
    webp: {
      image_url: string;
    };
  };
}

interface ApiResponse {
  data: Anime[];
}

const AnimeApi = ({ search, setSearch }: PropsType) => {
  const animeApiCSS = css`
    .animeApi {


      .animes {
        margin: 0 80px;
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
        }

        // inside of the input
        input[type="text"] {
          padding-left: 16px;
          font-size: 1.4rem;
        }

        // Button
        #searchBtn {
          background-color: rgb(255, 255, 255);
          padding: 10px 20px;
          border-radius: 4px;
          border: none;
          box-shadow: 0 0 4px white;
          transform: translate(0, -2px);
          margin-left: 8px;
          cursor: pointer;

          &:hover {
            transition: 0.6s all ease;
            color: white;
            background-color: black;
          }
        }

        &__error {
          font-size: 3rem;
          color: red;
          font-weight: 900;
        }
      }
    }

    // Results cards
    #searchResults {
      max-width: 1080px;
      display: flex;
      justify-content: center;
      // align-items: center;
      margin: 0 auto;
      flex-wrap: wrap;
      text-align: center;
      gap: 20px;

      // 1px〜519px
      ${min[0] + max[0]} {
        width: 100%;
      }
      // 520px〜767px
      ${min[1] + max[1]} {
      }

      .cardResult {
        width: 18%;

        &__img {
          width: 200px;
          height: 300px;

          // 1px〜519px
          ${min[0] + max[0]} {
            width: auto;
            height: auto;
          }
          // 520px〜767px
          ${min[1] + max[1]} {
          }
        }

        &__title {
          text-align: center;
          word-wrap: normal;
        }
      }
    }
  `;

  // const [results, setResults] = useState(); // object
  const [results, setResults] = useState<ApiResponse | null>(null);

  // const animeApi = "https://api.jikan.moe/v4/anime?limit=20"; // 25以上にするとエラー
  const animeApi = "https://api.jikan.moe/v4/anime?page=3";

  // ==========================================================
  // Get API Data when this page loaded
  // ==========================================================

  useEffect(() => {
    // execute the function below when this page loaded
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ==================================
  // Get API Data by Clicking Button
  // ==================================
  async function getData() {
    try {
      const res = await fetch(`${animeApi}&q=${search}`);
      const json = await res.json();
      console.log(json);
      setResults(json);

      // displayCharacters(json.data);
    } catch (err) {
      console.log(err);
    }
  }
  // getData();

  // ==================================
  // Change the state by being changed in an input
  // ==================================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);

    // useStateにuserがタイプした値をセット(入力を見える様にする)
    // to set the value user typed to useState (to make it visible)
    setSearch(e.target.value); // value user typed saves to useState
  };

  // ==================================
  // Change the state by Clicking btn. (e) has a value user typed
  // ==================================
  const handleClick = () => {
    console.log("click");
    getData();
  };

  return (
    <section css={animeApiCSS}>
      <div className="animeApi">
        {/* <h2 className="commonTitle">Animes</h2> */}

        <div className="animes">
          <input
            className="animes__search"
            type="text"
            id="search"
            name="search"
            // (e) には入力された値が入っている
            onChange={(e) => handleChange(e)}
            // defaultValue={(window.localStorage.getItem("search"))}
            value={search}
            placeholder="Type anime name"
          />

          {/* fire the function above with the value? */}
          <button id="searchBtn" onClick={() => handleClick()}>
            {/* <button id="searchBtn" onClick={(e) => handleClick(e)}> */}
            Search
          </button>

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
                  <p className="cardResult__title">{anime.title}</p>
                </div>
              ))}
          </div>
        </div>
        <hr />
      </div>
    </section>
  );
};

export default AnimeApi;
