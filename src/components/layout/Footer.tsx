import { Link } from "react-router-dom";

import { css } from "@emotion/react";
import { min, max } from "../../styles/mediaQuery";
// -----------------------------------------
export const Footer = () => {
  const footerCSS = css`
    background-color: var(--complementary);
    padding: 3rem 1rem;
    // 1px〜519px
    ${min[0] + max[0]} {
    }
    // 520px〜767px
    ${min[1] + max[1]} {
    }

    .footer {
      /* position: relative;
      height: 100px;
      color: rgb(212, 212, 212); */

      &Box {
        /* position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, 50%);
        width: 100%; */

        &__title {
          text-align: center;
          font-size: 2rem;
          padding-bottom: 40px;

          /* @include mq(s) {
        font-size: 1.2rem;
      }
    
      @include mq(m) {
        font-size: 1.5rem;
      } */
        }

        &__privacy {
          font-size: 1.4rem;
          color: rgb(212, 212, 212);
          display: block;
          width: fit-content;
          margin: 0 auto;

          /* @include mq(s) {
        font-size: 1.2rem;
      }
    
      @include mq(m) {
        font-size: 1.3rem;
      } */

          &:hover {
            color: rgb(93, 93, 183);
            text-decoration: underline;
          }
        }
      }
    }
  `;
  // Go to the top
  function ChangePageTop() {
    window.scroll(0, 0); // ページの一番上に移動
  }

  return (
    <footer css={footerCSS}>
      <div className="footer">
        <div className="footerBox">
          <h5 className="footerBox__title">©︎Kaz DEV All Rights Reserved</h5>
          <Link
            onClick={ChangePageTop}
            to="/privacy"
            className="footerBox__privacy"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
