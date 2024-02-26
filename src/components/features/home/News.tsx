import { useEffect, useState, useCallback } from "react";

// FBのデータを表示するファイル
import { auth, db } from "../../../service/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
// DBのデータを順番通りに並べるモジュール
// to sort the data in DB in order
import { query, orderBy } from "firebase/firestore";

// component
import SliderNews from "./SliderNews";

import { css } from "@emotion/react";
import { min, max } from "../../../styles/mediaQuery";
const newsCSS = css`
  .news {
    max-width: 1280px;
    margin: 0 auto;
    padding: 100px 1rem;
    position: relative;

    &__title {
      font-size: 10rem;
      color: rgba(244, 148, 173, 0.1);
      font-weight: bold;
      position: absolute;
      top: -1rem;
      left: 0;

      // 1px〜519px
      ${min[0] + max[0]} {
        font-size: 6rem;
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

    &Contents {
      display: flex;
      align-items: center;
      height: 290px;
      /* border: 1px solid var(--font); */
      border-radius: 8px;
      background-color: var(--bg);
      box-shadow: 0 2px 1px var(--font);
      width: 90% !important;
      padding: 0.8rem;

      span {
        font-weight: bold;
        margin: 0.5rem 0;
        display: block;
        font-size: 0.9rem;
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
        display: flex;
        margin: 1rem 0;

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
      }
    }
    .newsContents__body {
      &--title {
        font-size: 1.2rem;
        font-weight: bold;
        margin: 4px 0 8px 0;
        line-height: 1.2;
        color: var(--font);
      }

      &--content {
        font-size: 1.1rem;
        line-height: 1.5;
        padding-right: 4px;
        height: 120px;
      }
    }

    .newsPostBtns {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0 1rem;
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
        width: 40%;
        background-color: var(--font_dark);
        padding: 10px 4px;
        cursor: pointer;
        color: white;
        border-radius: 8px;
        border: none;

        &:hover {
          transition: all 0.6s ease;
          transform: translate(0, 4px);
          opacity: 0.8;
        }
      }

      &__edit.delete {
        background-color: var(--font);

        &:hover {
          background-color: var(--error);
        }
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
// function ChangePageTop() {
//   window.scroll(0, 0); // ページの一番上に移動
// }
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
  // Go to the top
  const ChangePageTop = useCallback(() => {
    window.scroll(0, 0);
  }, []);

  // map()で回したやつが返ってくるので、arrayを用意
  const [postList, setPostList] = useState<PostItem[]>([]);

  useEffect(() => {
    try {
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
        // ここのdocsはfb特別のもの。
        setPostList(
          data.docs.map((item) => ({
            id: item.id, // 属性を追加できる
            title: item.data().title,
            postsText: item.data().postsText,
            postCreated: item.data().postCreated,
            author: item.data().author,
          })),
        );
      };
      getPosts();
    } catch (err) {
      console.log(err);
    }
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
      <div className="news">
        <h2 className="news__title">NEWS</h2>
        <SliderNews
          postList={postList}
          auth={auth}
          ChangePageTop={ChangePageTop}
          handleDelete={handleDelete}
        />
      </div>
    </section>
  );
}

export default News;
