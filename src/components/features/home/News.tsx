// FBのデータを表示するファイル
import { auth, db } from "../../../service/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

// DBのデータを順番通りに並べるモジュール
// to sort the data in DB in order
import { query, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";

import { css } from "@emotion/react";
import { min, max } from "../../../styles/mediaQuery";
const newsCSS = css`
  .news {
    max-width: 1080px;
    margin: 0 auto;
    padding: 100px 0;

    &Contents {
      padding-bottom: 20px;
      padding: 0 8px 20px 8px;
      border-bottom: 1px dashed white;
      margin-top: 20px;
      display: flex;
      align-items: center;

      // 1px〜519px
      ${min[0] + max[0]} {
      }
      // 520px〜767px
      ${min[1] + max[1]} {
      }
      // 768px〜989px
      ${min[2] + max[2]} {
      }
      // 990px〜1200px
      ${min[3] + max[3]} {
      }

      // 1px〜519px
      ${min[0] + max[0]} {
        display: block;
      }

      // 520px〜767px
      ${min[1] + max[1]} {
        display: block;
      }

      &__info {
        width: 8%;

        // 1px〜519px
        ${min[0] + max[0]} {
          display: flex;
          flex-direction: row;
          margin-bottom: 20px;
        }

        // 520px〜767px
        ${min[1] + max[1]} {
          display: flex;
          flex-direction: row;
          margin-bottom: 20px;
        }
      }

      &__body {
        width: 90%;
      }

      &Wrap__userName {
        margin-left: 4px;
        margin-bottom: -10px;
        padding-top: 10px;
        line-height: 1.4;
      }
    }
    .newsContents__body {
      &--created {
        color: red;
      }
      &--title {
        font-size: 1.6rem;
        margin: 4px 0 8px 0;
        line-height: 1.2;
      }
      &--content {
        font-size: 1.1rem;
        line-height: 1.5;
        padding-right: 4px;
      }
    }

    .newsPostBtns {
      display: flex;
      flex-direction: column;
      gap: 30px 0;
      text-align: center;

      // 1px〜519px
      ${min[0] + max[0]} {
        flex-direction: row;
      }

      // 1px〜519px
      ${min[1] + max[1]} {
        flex-direction: row;
      }

      // each  button
      &__edit {
        background-color: rgb(60, 60, 60);
        padding: 20px 10px;
        cursor: pointer;
        color: white;

        &:hover {
          transition: all 0.6s ease;
          transform: translate(0, 4px);
          filter: brightness(1.4);
        }
      }

      &__edit.delete {
        background-color: rgb(176, 60, 60);
        padding: 20px 10px;
        cursor: pointer;
      }
    }
  }

  // 1px〜519px
  ${min[0] + max[0]} {
  }
  // 520px〜767px
  ${min[1] + max[1]} {
  }
  // 768px〜989px
  ${min[2] + max[2]} {
  }
  // 990px〜1200px
  ${min[3] + max[3]} {
  }
`;
// ===========================================================
// Go to the top
function ChangePageTop() {
  window.scroll(0, 0); // ページの一番上に移動
}

type PostItem = {
  id: string;
  title: string;
  postsText: string;
  postCreated: string;
  author: {
    id: string;
    username: string;
    iconImg: string;
  };
};

function News() {
  // ======================================
  // useState
  // ======================================
  // map()で回したやつが返ってくるので、arrayを用意
  const [postList, setPostList] = useState<PostItem[]>([]);

  // ========================================================
  // useEffect
  // ページ読み込み時に一度だけ発火して欲しいので useEffect()を使う。
  // useEffectの中で asyncを使う場合,もう一度関数を作らなあかん
  // ========================================================
  useEffect(() => {
    const getPosts = async () => {
      //DB内の timeStamp を降順に並べる（階層に注意）
      // to sort the timeStamp in DB in descending order
      const q = query(collection(db, "news"), orderBy("timeStamp", "desc"));

      //上記のコードをこれに格納
      const data = await getDocs(q);

      // fb内の全てのDOC、コレクションの中のdbのnews と命名した全てを取得する
      // const data = await getDocs(collection(db, "news"));

      // データが色々返ってきてややこしいので、 docの中のdataをループで取得する
      // fbでは docに対して data()という便利なものが使える(深い階層でも簡単に取得)
      //  ,id: dataとすることで、属性を追加できる
      // to get the data in doc (* koro is my cat's name)
      //  console.log(
      //   data.docs.map((item) => ({ ...item.data(), id: item.id }))
      // );

      // こうすることで、 useStateの、postListの中にこの取り出したデータが入る
      // ここのdocsはfb特別のもの。この中を掘り下げていくと欲しいデータが入ってる
      // to set the data in useState

      setPostList(
        data.docs.map((item) => ({
          id: item.id,
          title: item.data().title,
          postsText: item.data().postsText,
          postCreated: item.data().postCreated,
          author: item.data().author,
        })),
      );

      //  setPostList(
      //   data.docs.map((item) => ({ ...item.data(), id: item.id }))
      // );
    };
    getPosts();
  }, []);

  // ======================================
  // DELETE Function
  // ======================================
  // ループで回した millie.id を引数(id)で受け取る。 deleteDocはfbの関数
  // to receive the millie.id in loop as an argument
  const handleDelete = async (loopedId: string) => {
    if (confirm("Are you sure to Delete this post?")) {
      await deleteDoc(doc(db, "news", loopedId));

      // ページを再読み込みさせる（記事を消した時見た目上何もならんから）
      // to reload the page after deleting the post
      window.location.href = "/";
    } else {
      return;
    }
  };

  // ======================================
  // HTML Display
  // ======================================
  return (
    <section css={newsCSS}>
      <div className="news fadeIn2">
        <h2 className="commonTitle">News Posts</h2>
        {postList.map((millie) => {
          return (
            // mille.id => loopedId Delete functionで使う。
            <div className="newsContents" key={millie.id}>
              {/* User's information */}
              <div className="newsContents__info">
                {/* user's image Icon */}
                <img
                  className="googleIcon"
                  style={{
                    width: 60,
                    borderRadius: "50%",
                  }}
                  // NEWSを残したユーザーのアイコンを表示
                  src={millie.author.iconImg}
                  alt="Google Icon"
                />

                {/* user name */}
                <h3 id="news" className="newsContentsWrap__userName">
                  {millie.author.username}
                </h3>
              </div>

              <div className="newsContents__body">
                {/* 投稿日時 */}
                <div className="newsContents__body--created">
                  {millie.postCreated}
                </div>

                {/* Title */}
                <h1 className="newsContents__body--title">{millie.title}</h1>

                {/* Content */}
                <div className="newsContents__body--content">
                  {millie.postsText}
                </div>
              </div>

              {/* Delete Button 投稿のID 3E〜と今現在ログインしているアカウントのIDが同じならボタンを出力*/}
              {millie.author.id === auth.currentUser?.uid && (
                <div className="newsPostBtns">
                  {/* Edit Button */}
                  <Link
                    to={`/editpost/${millie.id}`}
                    className="newsPostBtns__edit"
                    onClick={() => ChangePageTop()}
                  >
                    EDIT
                  </Link>

                  {/* Delete Button */}
                  <button
                    className="newsPostBtns__edit delete"
                    onClick={() => handleDelete(millie.id)}
                  >
                    DELETE
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default News;
