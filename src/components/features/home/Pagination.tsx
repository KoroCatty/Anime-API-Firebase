import { css } from "@emotion/react";
import { min, max } from "../../../styles/mediaQuery";

// TYPES
type PropsType = {
  results: boolean;
  pageNumber: number;
  setPageNumber: (page: number) => void;
};

const Pagination = ({ results, pageNumber, setPageNumber }: PropsType) => {
  const paginationCSS = css`
    max-width: 1280px;
    margin: 0 auto;
    margin-top: 2rem;
    padding: 2rem 0 2rem 0;

    // 1px〜519px
    ${min[0] + max[0]} {
      padding: 6rem 0 4rem 0;
      margin-top: 3rem;
    }
    // 520px〜767px
    ${min[1] + max[1]} {
      padding: 8rem 0 4rem 0;
      margin-top: 4rem;
    }
  `;
  return (
    <div css={paginationCSS}>
      <button
        // Math.maxは、oldPage - 1が1より小さい場合は1を返す
        onClick={() => {
          setPageNumber(Math.max(pageNumber - 1, 1));
          window.scroll({
            top: 1400,
            left: 0,
            behavior: "smooth",
          });
        }}
        disabled={pageNumber === 1}
      >
        Previous Page
      </button>

      {/* Current Page */}
      <span>Current Page: {pageNumber}</span>

      <button
        onClick={() => {
          setPageNumber(results ? pageNumber + 1 : pageNumber);
          //! Not working scroll Top properly (when pokemon 2 -> 1 page)
          window.scroll({
            top: 1400,
            left: 0,
            behavior: "smooth",
          });
        }}
        //! How to work Disabled
        disabled={!results}
      >
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
