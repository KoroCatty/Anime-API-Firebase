import { useState, useEffect } from "react";

import { css } from "@emotion/react";
import { min, max } from "../../../styles/mediaQuery";

// TYPES
type PropsType = {
  results: boolean;
  pageNumber: number;
  setPageNumber: (page: number) => void;

  resultsData?: {
    pagination: {
      has_next_page: boolean;
    };
  } | null;
};

const Pagination = ({
  resultsData,
  results,
  pageNumber,
  setPageNumber,
}: PropsType) => {
  // pagination button disabled state
  const [isDisabled, setIsDisabled] = useState(false);

  const paginationCSS = css`
    margin-top: 2rem;
    padding: 2rem 0 2rem 0;

    // 1px〜519px
    ${min[0] + max[0]} {
      padding: 4rem 0 0 0;
      margin-top: 0;
    }
    // 520px〜767px
    ${min[1] + max[1]} {
      padding: 2rem 0 0 0;
    }

    button {
      cursor: pointer;
      padding: 0.3rem 1rem;
      background-color: var(--font);
      border-radius: 8px;
      border: none;
      color: var(--white);
      width: 84px;

      &:hover {
        @media screen and (min-width: 768px) {
          filter: brightness(1.2);
          transition: 0.2s;
        }
      }

      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }

    span {
      margin: 0 1rem;
      color: var(--font_dark);

      strong {
        font-size: 1.5rem;
        margin-left: 0.5rem;
        display: inline-block;

        // 1px〜519px
        ${min[0] + max[0]} {
          font-size: 1.2rem;
        }
      }
    }
  `;

  useEffect(() => {
    window.scroll({
      top: 1300,
      left: 0,
      behavior: "smooth",
    });
  }, [pageNumber]);

  // 1秒後にdisabled状態を更新(when the last page)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDisabled(resultsData?.pagination.has_next_page === false);
    }, 1000);

    // コンポーネントがアンマウントされたときにタイマーをクリア
    return () => clearTimeout(timer);
  }, [resultsData?.pagination.has_next_page]);

  return (
    <div css={paginationCSS}>
      <button
        // Math.maxは、oldPage - 1が1より小さい場合は1を返す
        onClick={() => {
          setPageNumber(Math.max(pageNumber - 1, 1));
          console.log("results", results);
        }}
        disabled={pageNumber === 1}
      >
        Previous
      </button>

      {/* Current Page */}
      <span>
        Current Page:
        <strong>{pageNumber}</strong>
      </span>

      <button
        onClick={() => {
          setPageNumber(results ? pageNumber + 1 : pageNumber);
        }}
        disabled={isDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
