import { css } from "@emotion/react";
import { min, max } from "../styles/mediaQuery";

export const crudPageCSS = css`
  padding: 5rem 3rem;

  // 1px〜520px
  ${min[0] + max[0]} {
    padding: 5rem 1rem;
  }
  // 521px〜767px
  ${min[1] + max[1]} {
    padding: 5rem 1rem;
  }

  .title {
    font-size: 10rem;
    max-width: 1000px;
    margin: 0 auto;
    color: rgba(244, 148, 173, 0.1);
    font-weight: bold;
    margin-bottom: 1.5rem;

    // 1px〜519px
    ${min[0] + max[0]} {
      font-size: 3rem;
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

  .inputPost {
    max-width: 600px;
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
      font-size: 1.4rem;
      margin-bottom: 8px;
      color: var(--font);
      font-weight: bold;
    }

    &__input--small {
      height: 60px;
    }

    // フォーム内の文字
    input[type="text"],
    textarea {
      font-size: 1.4rem;
      letter-spacing: 0.1rem;
      background-color: var(--bg);
      border: 1px solid var(--font);
      width: 100%;
      color: var(--font);

      // フォーカス時
      &:focus {
        box-shadow: 2px 2px 18px white;
        outline: 1px solid var(--font);
      }

      &::placeholder {
        color: var(--font);
        font-size: 1.2rem;
        letter-spacing: 0.1rem;
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
    padding: 1rem 2rem;
    margin-top: 52px;
    color: white;
    background-color: var(--font);
    border: none;
    border-radius: 8px;
    border: 2px solid transparent;
    cursor: pointer;
    box-shadow: 2px 2px 18px white;
    letter-spacing: 0.1rem;
    font-weight: bold;

    &:hover {
      transition: all 0.4s ease;
      transform: translate(0, 4px);
      border: 2px solid var(--font);
      background-color: var(--bg);
      color: var(--font);
    }
  }
`;
