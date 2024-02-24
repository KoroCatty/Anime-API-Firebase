import SakuraParticles from "./common/SakuraParticles";

import { css } from "@emotion/react";
import { min, max } from "../styles/mediaQuery";

// import Bg3d from "./common/Bg3d";

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
    @media screen and (min-width: 1800px) {
      height: 70vh;
    }

    .hero {
      &__box {
        position: absolute;
        top: 40%;
        left: 90%;
        transform: translate(-90%, -40%);
        padding: 1rem 1.3rem;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 4px;

        // 1px〜519px
        ${min[0] + max[0]} {
          top: 45%;
          left: 25%;
          padding: 0.7rem 0.7rem;
        }
        // 520px〜767px
        ${min[1] + max[1]} {
          left: 95%;
          padding: 1rem 1rem;
        }
        // 768px〜989px
        ${min[2] + max[2]} {
          left: 95%;
          padding: 1rem 1.2rem;
        }
        // 990px〜1280px
        ${min[3] + max[3]} {
          left: 95%;
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
          color: var(--font);
          text-align: center;
          font-weight: 700;
          -ms-writing-mode: tb-rl;
          writing-mode: vertical-rl;
          text-orientation: upright; /* すべて縦方向に表示 */

          // 1px〜519px
          ${min[0] + max[0]} {
            font-size: 0.7rem;
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
            font-size: 0.95rem;
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
