// アニメ一つのデータ (1 anime data)
// https://api.jikan.moe/v4/anime/1

import { useEffect, useState } from "react";

// useParamsフックを使ってidを取得することが可能(飛ばされた先で必要)
// you can get id by using useParams hook (it's needed in the page you are going to be directed to)
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

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

export default function Details() {
  // useState
  const [results, setResults] = useState<AnimeTypes | null>(null); // object

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // URL tabの中身が入っている
  const params = useParams(); // 例 {id: '8'}

  // console.log(params.id); // 例8

  // ==================================
  // Get API Data when the page loaded
  // ==================================
  async function getData() {
    try {
      // アニメ一つだけのデータ取得。取得方法はDoc確認すること (https://api.jikan.moe/v4/anime/8)
      const res = await fetch(`https://api.jikan.moe/v4/anime/${params.id}`);

      const json = await res.json();

      // useStateに取得したデータをセット
      setResults(json);

      // displayCharacters(json.data);
    } catch (err) {
      // console.log(err);
    }
  }

  return (
    <div>
      {/* APIデータを取得する前に実行したらエラーが出るので、三項演算子 */}
      <h1>{results && results.data.title}</h1>
      <h1>{results && results.data.title_japanese}</h1>
      <img
        src={results?.data.images.webp.image_url}
        alt={results?.data.title}
      />

      {/* Youtube video がある場合は表示 */}
      <a href={results?.data.trailer.url} className="">
        {results && results.data.trailer.url ? "YouTube Video" : ""}
      </a>

      <div>
        <h3>Year: {results && results.data.year}</h3>
        <p>{results && results.data.synopsis}</p>
      </div>

      <img
        src={results?.data.trailer.images.image_url}
        alt={results?.data.title}
      />

      <div></div>

      {/* <p className="cardResult__status">{anime.title_japanese}</p> */}

      <Link to="/" style={{ fontSize: "4rem", color: "red" }}>
        Go Back
      </Link>
    </div>
  );
}
