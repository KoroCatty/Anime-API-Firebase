import SakuraParticles from "./common/SakuraParticles";

import { css } from "@emotion/react";
import { min, max } from "../styles/mediaQuery";

const Hero = () => {
  const heroCSS = css`
    background-image: url("/Images/hero_clear.png");
    background-size: cover;
    height: 90vh;
    background-position: bottom;
    position: relative;

    // 1px〜519px
    ${min[0] + max[0]} {
      height: 70vh;
    }
    // 520px〜767px
    ${min[1] + max[1]} {
      height: 70vh;
    }
    // 768px〜989px
    ${min[2] + max[2]} {
      height: 70vh;
    }
    // 990px〜1200px
    ${min[3] + max[3]} {
      height: 90vh;
    }
    @media screen and (min-width: 2300px) {
      height: 130vh;
    }

    .hero {
      &__box {
        position: absolute;
        top: 40%;
        left: 22%;
        transform: translate(-90%, -40%);
        padding: 1rem 1.3rem;
        border-radius: 4px;

        // 1px〜519px
        ${min[0] + max[0]} {
          top: 45%;
          left: 20%;
          padding: 0.7rem 0.7rem;
        }
        // 520px〜767px
        ${min[1] + max[1]} {
          left: 15%;
          padding: 1rem 1rem;
        }
        // 768px〜989px
        ${min[2] + max[2]} {
          left: 22%;
          padding: 1rem 1.2rem;
        }
        // 990px〜1280px
        ${min[3] + max[3]} {
          left: 18%;
        }
        @media screen and (max-width: 350px) {
          top: 47%;
        }

        @media screen and (min-width: 1800px) {
        }

        h1 {
          /* font-family: "Optima", sans-serif; */
          /* font-family: "Roboto", sans-serif; */
          font-size: 1.2rem;
          color: white;
          text-align: center;
          font-weight: 700;
          -ms-writing-mode: tb-rl;
          writing-mode: vertical-rl;
          letter-spacing: 0.5rem;
          /* text-orientation: upright; すべて縦方向に表示 */

          // 1px〜519px
          ${min[0] + max[0]} {
            font-size: 0.68rem;
          }
          // 520px〜767px
          ${min[1] + max[1]} {
            font-size: 0.9rem;
          }
          // 768px〜989px
          ${min[2] + max[2]} {
            font-size: 1rem;
          }
          // 990px〜1280px
          ${min[3] + max[3]} {
          }
          @media screen and (min-width: 400px) and (max-width: 500px) {
            font-size: 0.8rem;
          }

          @media screen and (max-width: 350px) {
            font-size: 0.6rem;
          }
        }
      }
    }
  `;
  return (
    <section css={heroCSS}>
      <div className="hero">
        <div className="hero__box">
          <h1>Find Your Favorite Anime</h1>
        </div>
      </div>

      <SakuraParticles />
    </section>
  );
};

export default Hero;
