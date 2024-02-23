import { css } from "@emotion/react";
import { min, max } from "../styles/mediaQuery";

// import Bg3d from "./common/Bg3d";

const Hero = () => {
  const heroCSS = css`
    height: 60vh;

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
      <h1>Hero</h1>
      {/* <Bg3d /> */}
    </section>
  );
};

export default Hero;
