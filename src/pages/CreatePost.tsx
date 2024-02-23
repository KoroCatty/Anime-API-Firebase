// firebaseのcollectionにデータをaddしていくために輸入
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";

// ===========================================================
// ログインしてるか見極めるために必要 + これにuseState()もいる
// to check if the user is logged in
import { auth, db } from "../service/firebase";

// firebaseのフックス(ログイン時でページを変えるstateをコントロールする)
// to control the state of the page when logged in
import { useAuthState } from "react-firebase-hooks/auth";
// ===========================================================

// リダイレクトできる
// to redirect
import { useNavigate } from "react-router-dom";

// Emotion sass in component
import { css } from "@emotion/react";
import { min, max } from "../styles/mediaQuery";

// バリデーション ライブラリ
import Joi from "joi";
// ===========================================================
// SCSS Start
// ===========================================================
const createPostScss = css`
  padding-top: 80px;
  height: 840px;

  .inputPost {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 40px;

    // 1px〜480px
    ${min[0] + max[0]} {
      padding: 0 20px;
    }
    // 481px〜768px
    ${min[1] + max[1]} {
    }

    &__title {
      font-size: 2rem;
      margin-bottom: 8px;
    }

    &__input--small {
      height: 60px;
      background-color: #d3d3d3;
    }

    // フォーム内の文字
    input[type="text"],
    textarea {
      font-size: 1.4rem;
      letter-spacing: 1.4px;
      background-color: #d3d3d3;

      // フォーカス時
      &:focus {
        outline: 4px solid blue;
        box-shadow: 2px 2px 18px white;
      }

      // 1px〜480px
      ${min[0] + max[0]} {
        font-size: 1.2rem;
      }
    }

    .errorMes {
      color: var(--error);
      font-size: 1.2rem;
    }
  }

  .inputPost.second {
    margin-top: 40px;
  }

  .postButton {
    margin: 0 auto;
    display: block;
    width: fit-content;
    padding: 20px 30px;
    margin-top: 52px;
    color: white;
    background-color: black;
    cursor: pointer;

    &:hover {
      transition: all 0.4s ease;
      transform: translate(0, 4px);
      /* color: black; */
      background-color: #2842d3;
    }
  }
`;

// ===========================================================
// SCSS End
// ===========================================================
function CreatePost() {
  // Define the type for your form fields and their potential error messages
  type ErrorObject = Record<string, string>;

  // Initialize your state with this type
  const [errors, setErrors] = useState<ErrorObject>({});

  // どのアカウント認証しているのかをここのuserに入れる
  // to check wchich account is logged in
  const [user] = useAuthState(auth);
  // console.log(user);

  // useNaavigate()を使うために必要な定義
  // to use useNavigate()
  const navigate = useNavigate();

  // Redirect to home page if user is not logged in
  // 注意：useEffect()にasyncを使う場合、中にもう一つ関数を作る必要がある
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  // ============================
  // useState
  // ============================
  const [title, setTitle] = useState<string>("");
  const [postText, setPostText] = useState<string>("");

  // joi schema definition
  // Creating a class
  const schema = Joi.object({
    title: Joi.string().alphanum().min(3).max(50).required(),
    postText: Joi.string().alphanum().min(3).max(50).required(),
  });

  // ============================
  // firebase store（DB）にデータを入れる
  // ============================
  const postDb = async () => {
    // Joi validation check
    // エラ〜があれば, errorに入れる
    // 初期化し、エラーがあれば、errorObjectに入れる
    // abortEarly: false で、全てのエラーを表示する (綺麗にするため)
    const errorObject: ErrorObject = {};
    const validationResult = schema.validate(
      { title: title, postText: postText },
      { abortEarly: false },
    );

    // schema.validateは,errorを標準で持っている
    if (validationResult.error) {
      validationResult.error.details.forEach((error) => {
        // console.log(error.path[0])
        errorObject[error.path[0]] = error.message;
      });
    }

    // もしエラーがあれば、useStateの、setErrors()に入れて、他の場所で使える様にする
    setErrors(errorObject);

    // エラーがあれば、ここで止める。これ以下のコードは実行させない
    if (validationResult.error) return;

    // ===============================
    // 投稿時間を作り、DBに挿入する
    // create the time of the post
    const now = new Date();

    // これを使い、投稿を投稿順にできる
    const timeStamp = now.getTime(); // Timestamp ex) 1681113204545

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

    const timeShow = ` ${now.getHours()}:${
      now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()
    }  ${now.getFullYear()}/${month_name}/${now.getDate()} `; // - 20:44 = 2023/April/10
    // ===========================================================
    // Validation check
    // Validation check
    if (title !== "" && postText !== "") {
      // 関数などDOC 参照。 コレクションの news に値を入れる
      await addDoc(collection(db, "news"), {
        title: title,
        postsText: postText,
        postCreated: timeShow,
        timeStamp: timeStamp,

        // ログイン時じゃないとエラー
        // ログインしてる ユーザーの名前＆ID を入れる(fbで用意されてる関数)
        // to get the user name and ID from firebase
        author: {
          username: auth.currentUser?.displayName,
          id: auth.currentUser?.uid,
          iconImg: auth.currentUser?.photoURL,
        },
      });
      alert("Your Post has been added on HOME page!!");
      navigate("/");
    } else {
      alert("Fill out the forms!");
    }
  };

  return (
    <>
      <div css={createPostScss}>
        <div className="postContainer">
          <h2 className="commonTitle API">Post New</h2>

          <div className="inputPost">
            <div className="inputPost__title">Title</div>
            <input
              className="inputPost__input--small"
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="type the title"
            />
            <p className="errorMes">{errors?.title}</p>
          </div>

          <div className="inputPost second">
            <div className="inputPost__title">Body</div>
            <textarea
              className="inputPost__input"
              onChange={(e) => setPostText(e.target.value)}
              cols={30}
              rows={10}
              placeholder="body"
            ></textarea>
            <p className="errorMes"> {errors?.postText}</p>
          </div>

          <button onClick={postDb} className="postButton">
            POST!!!
          </button>
        </div>
      </div>

      <hr />
    </>
  );
}

export default CreatePost;
