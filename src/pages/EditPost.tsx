import { useEffect, useState } from "react";

// FBのデータを表示するファイル
import { doc, getDoc, updateDoc } from "firebase/firestore";
// ===========================================================
// ログインしてるか見極めるために必要
// to check if the user is logged in
import { db } from "../service/firebase";

// useParamsフックを使ってidを取得することが可能
// you can get the id using the useParams hook
import { useParams } from "react-router-dom";

// リダイレクトできる
import { useNavigate } from "react-router-dom";

// CSS FIle
import { crudPageCSS } from "../styles/crudPageCSS";

function EditPost() {
  // useState
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  // ========================================================
  // URL tabの中身が入っている
  const params = useParams();
  console.log(params.id); // 例 ImxDD7HxJlHTBEkemSkL
  // ========================================================

  // ========================================================
  // useEffect (DBから一件だけ、読み込み)
  // ページ読み込み時に一度だけ発火して欲しいので useEffect()を使う。
  // useEffectの中で asyncを使う場合,もう一度関数を作らなあかん
  // ========================================================
  useEffect(() => {
    const getPosts = async () => {
      // get values from DB このIDの投稿データを取得
      const q = doc(db, "news", `${params.id}`);

      //  1件だけなので、 getDoc()  getDocsではない
      // not only get 1 document, but also get all documents so you need to use getDocs()
      const gotOnePost = await getDoc(q);

      // fbでは data()メソッドで取り出さないとjsで使えない
      const aaa = gotOnePost.data();

      if (aaa) {
        setTitle(aaa.title);
        setPostText(aaa.postsText);
      }
    };
    getPosts();
    // eslint-disable-next-line
  }, []);

  // ============================
  // Update values in DB
  // ============================
  const updateDocument = async () => {
    // get values from DB
    const q = doc(db, "news", `${params.id}`);

    // これを使い、投稿を投稿順にできる
    const now = new Date(); // 現在時刻を取得
    const timeStamp = now.getTime(); // Timestamp ex) 1681113204545

    // 投稿時間を変更
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month_name = months[now.getMonth()];
    const postCreated = `Updated :   ${now.getHours()}:${
      now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()
    } ${now.getFullYear()}/${month_name}/${now.getDate()} `;
    // Updated : 2023/April/10

    // update values in DB (fbの関数)
    await updateDoc(q, {
      title: title,
      postsText: postText,
      timeStamp: timeStamp,
      postCreated: postCreated,
    });
    // console.log(title);
    // console.log(postText);
    alert("Your Post has been updated!!");
    navigate("/");
  };
  // ============================
  // ページジャンプ
  // ============================
  const navigate = useNavigate();

  return (
    <>
      <main css={crudPageCSS}>
        <div className="postContainer">
          <h1 className="title">EDIT POST</h1>

          <div className="inputPost">
            <div className="inputPost__title">Title</div>
            <input
              className="inputPost__input--small"
              onChange={(e) => setTitle(e.target.value)}
              // DB内タイトルを表示
              defaultValue={title}
              type="text"
              placeholder="type the title"
            />
          </div>

          <div className="inputPost second">
            <div className="inputPost__title">Body</div>
            <textarea
              className="inputPost__input"
              // DB内テキストを表示
              defaultValue={postText}
              onChange={(e) => setPostText(e.target.value)}
              rows={10}
              placeholder="body"
            ></textarea>
          </div>

          {/* Update Button (Fire the function) */}
          <button onClick={updateDocument} className="postButton">
            UPDATE
          </button>
        </div>
      </main>
    </>
  );
}

export default EditPost;
