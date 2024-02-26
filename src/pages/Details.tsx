// アニメ一つのデータ (1 anime data)
// https://api.jikan.moe/v4/anime/1

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// -1 back button
import { useNavigate } from "react-router-dom";

// Type
type AnimeTypes = {
  data: {
    title: string;
    title_japanese: string;
    images: {
      webp: {
        image_url: string;
      };
    };
    trailer: {
      url: string;
      images: {
        image_url: string;
      };
    };
    year: string;
    synopsis: string;
  };
};

import { css } from "@emotion/react";
import { min, max } from "../styles/mediaQuery";

const DetailsCSS = css`
  padding: 7rem 1rem 3rem 1rem;
  max-width: 1080px;
  margin: 0 auto;

  // 1px〜519px
  ${min[0] + max[0]} {
    padding: 6rem 0.5rem 0 0.5rem;
  }

  .backBtn {
    margin-bottom: 2rem;
    color: var(--white);
    padding: 0.8rem 1.4rem;
    background-color: var(--font);
    text-decoration: none;
    border-radius: 8px;
    letter-spacing: 1px;
    border: 1px solid transparent;
    cursor: pointer;

    // 1px〜519px
    ${min[0] + max[0]} {
      margin-bottom: 1rem;
      padding: 0.6rem 1.2rem;
    }

    &:hover {
      background-color: var(--bg);
      color: var(--font);
      transition: 0.3s all;
      border: 1px solid var(--font);
    }
  }

  .title {
    font-size: 19rem;
    color: rgba(244, 148, 173, 0.1);
    font-weight: bold;
    position: absolute;
    top: 30%;
    left: 1%;
    user-select: none;
    overflow: hidden;

    // 1px〜519px
    ${min[0] + max[0]} {
      font-size: 5rem;
      max-width: 340px;
      top: 40%;
    }
    // 520px〜767px
    ${min[1] + max[1]} {
      font-size: 8rem;
    }
    // 768px 〜 989px
    ${min[2] + max[2]} {
      font-size: 12rem;
    }
    // 990px〜1200px
    ${min[3] + max[3]} {
      font-size: 16rem;
    }
  }

  h1 {
    font-size: 2.4rem;
    margin-bottom: 3rem;
    text-align: center;
    line-height: 1.5;
    margin-top: 2rem;

    // 1px〜519px
    ${min[0] + max[0]} {
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }
  }

  img {
    width: 30%;
    height: auto;
    margin-bottom: 3rem;
    text-align: center;
    margin: 0 auto;
    display: block;

    // 1px〜519px
    ${min[0] + max[0]} {
      width: 70%;
      margin-bottom: 2rem;
    }
    // 520px〜767px
    ${min[1] + max[1]} {
      width: 50%;
    }
  }

  .year {
    font-weight: bold;
  }

  .synopsis {
    max-width: 960px;
    padding: 0 1rem;
    margin: 1rem auto 2rem auto;
    color: var(--font_dark);
    font-size: 1.2rem;
    line-height: 1.5;
  }

  .youtube {
    text-align: center;
    margin: 0 auto;
    display: block;
    height: auto;
    margin-top: 4rem;

    // 1px〜519px
    ${min[0] + max[0]} {
      margin-top: 3rem;
    }

    &__title {
      font-size: 2.4rem;
      margin-bottom: 1rem;
    }

    a {
      display: inline-block;
      text-align: center;
      margin: 0 auto;
      margin-bottom: 3rem;
    }

    img {
      width: 300px;
      height: auto;
      max-width: 100%;
      position: relative;

      &:hover {
        transform: scale(1.1);
        transition: 0.3s all;
        opacity: 0.8;
      }
    }
  }

  // 1px〜519px
  ${min[0] + max[0]} {
  }
  // 520px〜767px
  ${min[1] + max[1]} {
  }
  // 768px 〜 989px
  ${min[2] + max[2]} {
  }
`;

export default function Details() {
  const navigate = useNavigate();
  const [results, setResults] = useState<AnimeTypes | null>(null); // object

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    getData();
    scrollTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // URL tabの中身が入っている
  const params = useParams(); // 例 {id: '8'}

  async function getData() {
    try {
      // アニメ一つだけのデータ取得
      const res = await fetch(`https://api.jikan.moe/v4/anime/${params.id}`);

      const json = await res.json();
      setResults(json);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main css={DetailsCSS}>
      <button className="backBtn" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="title">DETAILS</div>

      {results ? (
        <>
          <h1>{results.data.title}</h1>
          {/* <h1>{ results.data.title_japanese}</h1> */}
          <img
            src={results?.data.images.webp.image_url}
            alt={results?.data.title}
          />

          <div>
            <h3 className="year">
              {results?.data?.year ? `Year: ${results.data.year}` : ""}
            </h3>
            {/* あらすじのこと */}
            <p className="synopsis">{results.data.synopsis}</p>
          </div>

          {results?.data.trailer.url && (
            <div className="youtube">
              <h2 className="youtube__title">YouTube</h2>
              <a
                href={results.data.trailer.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={results?.data.trailer.images.image_url}
                  alt={results?.data.title}
                />
              </a>
            </div>
          )}
        </>
      ) : (
        "Loading..."
      )}
      {/* <p className="cardResult__status">{anime.title_japanese}</p> */}
      <button className="backBtn" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </main>
  );
}
