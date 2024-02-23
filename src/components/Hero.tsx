import SakuraParticles from "./common/SakuraParticles";

import { css } from "@emotion/react";
import { min, max } from "../styles/mediaQuery";

// import Bg3d from "./common/Bg3d";

const Hero = () => {
  const heroCSS = css`

    .hero {
      position: relative;

      &__box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 1rem 2rem;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 0 0 40px 40px;

        h1 {
          font-size: 3rem;
          color: var(--font);
          text-align: center;
          margin-bottom: 20px;

        }

        /* p {
          font-size: 1.5rem;
          color: var(--font);
          text-align: center;
        } */
      }

      &__img {
          width: 100%;
          height: 80vh;
          object-fit: cover;
          top: 0;
          left: 0;
          z-index: -1;
          border-radius: 0 0 40px 40px;
        }
    }

    // 1px〜519px
    ${min[0] + max[0]} {
    }
    // 520px〜767px
    ${min[1] + max[1]} {
    }
    // 768px〜989px
    ${min[2] + max[2]} {
    }
    // 990px〜1200px
    ${min[3] + max[3]} {
    }
  `;
  return (
    <section css={heroCSS}>
      <div className="hero">

        <div className="hero__box">
          <h1>Find your favorite anime</h1>
          {/* <p>Search for your favorite anime</p> */}
        </div>

        <img className="hero__img" src="/Images/test.jpg" alt="" />
      </div>
      
      <SakuraParticles />
    </section>
  );
};

export default Hero;
