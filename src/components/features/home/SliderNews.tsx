import { Link } from "react-router-dom";

// react-slick (3rd party) & its CSSファイル
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { User } from "firebase/auth";

// TYPES
interface ArrowProps {
  className: string;
  style: React.CSSProperties; // CSSのプロパティを受け取る
  onClick: () => void;
}

interface Post {
  id: string;
  title: string;
  postCreated: string;
  postsText: string;
  author: {
    id: string;
    username: string;
    iconImg: string;
  };
}

interface Auth {
  // FBから取得するが null かもしれない
  currentUser: User | null;
}

// SliderNewsProps would use this updated Auth interface
interface SliderNewsProps {
  postList: Post[];
  auth: Auth;
  handleDelete: (id: string) => void;
  ChangePageTop: () => void;
}

function SampleNextArrow(props: ArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: ArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
      }}
      onClick={onClick}
    />
  );
}

function SliderNews({
  postList,
  auth,
  handleDelete,
  ChangePageTop,
}: SliderNewsProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: true,
    nextArrow: (
      <SampleNextArrow
        className="yourClassName"
        style={{}}
        onClick={() => {}}
      />
    ),
    prevArrow: (
      <SamplePrevArrow
        className="yourClassName"
        style={{}}
        onClick={() => {}}
      />
    ),

    // ドットのセッティング
    appendDots: (dots: React.ReactNode) => (
      <div style={{}}>
        <ul style={{ transform: "translateY(2rem)" }}> {dots} </ul>
      </div>
    ),

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {postList.map((millie) => (
          <div className="newsContents" key={millie.id}>
            <h1 className="newsContents__body--title">{millie.title}</h1>
            <div className="newsContents__info">
              <img
                className="googleIcon"
                style={{
                  width: 40,
                  marginRight: 10,
                }}
                src={millie.author.iconImg}
                alt="Google Icon"
              />
              <h3 id="news" className="newsContents__userName">
                {millie.author.username}
              </h3>
            </div>

            <div className="newsContents__body">
              {/* <div className="newsContents__body--created">
                {millie.postCreated}
              </div> */}
              <span>{millie.postCreated}</span>

              <div className="newsContents__body--content">
                {millie.postsText}
              </div>
            </div>

            {millie.author.id === auth.currentUser?.uid && (
              <div className="newsPostBtns">
                <Link
                  to={`/editpost/${millie.id}`}
                  className="newsPostBtns__edit"
                  onClick={ChangePageTop}
                >
                  EDIT
                </Link>

                <button
                  className="newsPostBtns__edit delete"
                  onClick={() => handleDelete(millie.id)}
                >
                  DELETE
                </button>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </>
  );
}
export default SliderNews;
