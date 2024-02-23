import { css } from "@emotion/react";
import { min, max } from "../../styles/mediaQuery";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faHouse,
  faFilePen,
  // faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

// firebaseから輸入 (ボタンでログイン・ログアウトできるようにするもの)
// to enable login / logout
import { signInWithPopup } from "firebase/auth";

// ===========================================================
// ログインしてるか見極めるために必要 + これにuseState()もいる
// to check if the user is logged in or not
import { auth, provider } from "../../service/firebase";

// firebaseのフックス(ログイン時でページを変えるstateをコントロールする)
// to control the state of the page when logged in
import { useAuthState } from "react-firebase-hooks/auth";
// ===========================================================

import { Link } from "react-router-dom";

// Go to the top
function ChangePageTop() {
  window.scroll(0, 0); // ページの一番上に移動
}

function Header() {
  const headerCSS = css`
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
      max-width: 1280px;
      width: 100%;
      
      .nav {
        /* background-color: rgba(0, 0, 0, 0.6); */
        margin: 0 auto;
  

      // 1px〜519px
      ${min[0] + max[0]} {
        overflow: scroll;
      }
      // 520px〜767px
      ${min[1] + max[1]} {
        overflow: scroll;
      }
      // 768px〜989px
      ${min[2] + max[2]} {
      }
      // 990px〜1200px
      ${min[3] + max[3]} {
      }

      &Wrap {
        display: flex;
        gap: 20px;
        padding-left: 2%;
        align-items: center;
        margin: 0 auto;
        width: 100%;
      max-width: 1200px;

        // 1px〜519px
        ${min[0] + max[0]} {
          overflow: scroll;
        }
        // 520px〜767px
        ${min[1] + max[1]} {
          overflow: scroll;
        }

        &__item {
          &--link {
            font-size: 1rem;
            color: white;
            

            // 1px〜519px
            ${min[0] + max[0]} {
              font-size: 1rem;
            }
            // 520px〜767px
            ${min[1] + max[1]} {
              font-size: 1.4rem;
            }
          }
        }
      }
    }

    //----------------------------------------
    // Nav
    //----------------------------------------
    .googleIcon .inNav {
    }

    .googleNameInNav {
    }
  `;

  // どのアカウント認証しているのかをここのuserに入れる
  // to check which account is logged in
  const [user] = useAuthState(auth);
  return (
    <header className="header" css={headerCSS}>
      {/* <!-- Navigation --> */}
      <nav className="nav">
        <ul className="navWrap ">
          <Link to="/" className="navWrap__item--link" onClick={ChangePageTop}>
            <h1>アニメ</h1>
          </Link>

          <li className="navWrap__item">
            <Link
              to="/"
              className="navWrap__item--link"
              onClick={ChangePageTop}
            >
              HOME
            </Link>
          </li>

          <li className="navWrap__item">
            <Link
              to="/contact"
              className="navWrap__item--link"
              onClick={ChangePageTop}
            >
              Contact
            </Link>
          </li>

          {/*  ===============*/}
          {/* ログイン時に表示 (show when logged in) */}
          {/* =============== */}
          {user ? (
            <>
              <li className="navWrap__item">
                <Link
                  to="/createpost"
                  className="navWrap__item--link"
                  onClick={ChangePageTop}
                >
                  <FontAwesomeIcon icon={faFilePen} />
                  Post
                </Link>
              </li>

              <li
                className="navWrap__item"
                style={{
                  marginLeft: "auto",
                  marginRight: "4%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <UserInfo />
                  <SignOutButton />
                </div>
              </li>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "flexEnd",
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "4%",
              }}
            >
              <SignInButton />
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
}
export default Header;

// ==========================
// Google button Sign in
// ==========================
function SignInButton() {
  const signInWithGoogle = () => {
    // firebaseを使ってGoogleでsign in
    signInWithPopup(auth, provider);
  };
  return (
    <button className="signInOutBtn" onClick={signInWithGoogle}>
      <p>Sign in with Google</p>
    </button>
  );
}

// ==========================
// Google button Sign Out
// ==========================
function SignOutButton() {
  return (
    // firebaseで用意されてるログアウトボタン
    <button className="signInOutBtn" onClick={() => auth.signOut()}>
      <p>Sign OUT</p>
    </button>
  );
}

// ==========================
// Google Icon Img and Name
// ==========================
function UserInfo() {
  return (
    <>
      <div style={{background:"rgba(241,161,165, 0.9)"}}>
        {/* ログインしてるユーザーのアイコンを表示 */}
        <img
          className="googleIcon inNav"
          style={{
            width: 60,
            borderRadius: "50%",
            filter: "brightness(1.3)",

          }}
          src={auth.currentUser?.photoURL ?? "default_value"} // todo:
          alt="Google Icon"
        />
        {/* <p
          className="googleNameInNav"
          style={{ textAlign: "center", fontSize: "1rem" }}
        >
          {auth.currentUser?.displayName}
        </p> */}
      </div>
    </>
  );
}
