import { css } from "@emotion/react";
import { min, max } from "../../styles/mediaQuery";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";

// firebaseから輸入 (ボタンでログイン・ログアウトできるようにするもの)
import { signInWithPopup } from "firebase/auth";

// ログインしてるか見極めるために必要 + これにuseState()もいる
// to check if the user is logged in or not
import { auth, provider } from "../../service/firebase";

// firebaseのフックス(ログイン時でページを変えるstateをコントロールする)
// to control the state of the page when logged in
import { useAuthState } from "react-firebase-hooks/auth";
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
    width: 100%;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(241, 161, 165, 0.3);
      z-index: -1;
    }

    .nav {
      margin: 0 auto;
      max-width: 1280px;

      // 1px〜519px
      ${min[0] + max[0]} {
        padding: 0 1rem;
      }

      &Wrap {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding-left: 2%;
        margin: 0 auto;
        width: 100%;
        max-width: 1200px;
        height: 60px;

        // 1px〜519px
        ${min[0] + max[0]} {
          gap: 0.8rem;
        }

        &__item {
          &--logo {
            font-size: 1.5rem;
            color: white;
            font-weight: bold;
            text-decoration: none;
            margin-right: 3rem;
            text-shadow: 0 3px 20px #ff7d83;

            // 1px〜519px
            ${min[0] + max[0]} {
              font-size: 1rem;
              margin-right: 1rem;
            }
            // 520px〜767px
            ${min[1] + max[1]} {
              font-size: 1.1rem;
              margin-right: 1rem;
            }

            &:hover {
              transition: 0.3s all ease;
              transform: scale(1.2);
            }
          }

          &--link {
            font-size: 1rem;
            color: var(--white);
            font-weight: bold;
            text-shadow: 0 3px 20px #ff7d83;

            // 1px〜519px
            ${min[0] + max[0]} {
              font-size: 0.9rem;
            }
            // 520px〜767px
            ${min[1] + max[1]} {
              font-size: 1rem;
            }
            @media (max-width: 350px) {
              font-size: 0.7rem;
            }

            &:hover {
              transition: 0.3s all ease;
              font-weight: bold;
              transform: scale(1.2);
              text-decoration: underline;
            }
          }
        }
      }
      .signInOutBtn {
        background: rgba(241, 161, 165, 0.9);
        color: white;
        font-size: 1rem;
        border: none;
        padding: 12px 20px;
        border-radius: 4px;
        cursor: pointer;
        transition: 0.2s all ease;
        text-shadow: 0 3px 20px rgba(241, 161, 165, 1);
        box-shadow: 0 0 4px white;
        font-weight: bold;
        transform: translate(0, -2px);
        margin-left: 8px;

        // 1px〜519px
        ${min[0] + max[0]} {
          font-size: 0.8rem;
          padding: 6px 12px;
        }
        // 520px〜767px
        ${min[1] + max[1]} {
          font-size: 0.9rem;
          padding: 8px 16px;
        }
        @media (max-width: 350px) {
          font-size: 0.8rem;
          padding: 4px 6px;
          margin-left: 0;
        }

        &:hover {
          @media screen and (min-width: 768px) {
            transition: 0.2s all ease;
            opacity: 0.7;
            transform: translate(0, -4px);
          }
        }
      }
    }

    //----------------------------------------
    // Nav
    //----------------------------------------
    .googleIcon.inNav {
      width: 40px;
      border-radius: 50%;
      filter: "brightness(1.3)";

      // 1px〜519px
      ${min[0] + max[0]} {
        width: 36px;
      }
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
          <Link
            to="/"
            className="navWrap__item--logo"
            onClick={() => {
              ChangePageTop();
            }}
          >
            <h1>アニメ</h1>
          </Link>

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
                  NEWS
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
      <p>LOGIN</p>
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
      <p>LOG OUT</p>
    </button>
  );
}

// ==========================
// Google Icon Img and Name
// ==========================
function UserInfo() {
  return (
    <>
      <div>
        {/* ログインしてるユーザーのアイコンを表示 */}
        <img
          className="googleIcon inNav"
          src={auth.currentUser?.photoURL ?? "/Images/default_icon.png"}
          alt="Google Icon"
        />
      </div>
    </>
  );
}
