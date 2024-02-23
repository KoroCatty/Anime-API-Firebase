import { css } from "@emotion/react";

const fireworksCss = css`
  overflow: hidden;
  overflow-x: hidden;

  @keyframes fireworks-animation {
    0% {
      transform: translate(-50%, 90vh);
      width: 4px;
      opacity: 1;
    }
    50% {
      width: 4px;
      opacity: 1;
    }
    100% {
      width: 600px;
      opacity: 0;
    }
  }

  .c-firework,
  .c-firework::before,
  .c-firework::after {
    overflow: hidden;
    content: "";
    position: absolute;
    position: fixed;
    top: 50%;
    left: 50%;
    aspect-ratio: 1;
    background:
      radial-gradient(circle, yellow 10px, #000 0) 50% 00%,
      radial-gradient(circle, khaki 10px, #000 0) 00% 50%,
      radial-gradient(circle, white 10px, #000 0) 50% 99%,
      radial-gradient(circle, lime 10px, #000 0) 99% 50%,
      radial-gradient(circle, crimson 10px, #000 0) 80% 90%,
      radial-gradient(circle, red 10px, #000 0) 95% 90%,
      radial-gradient(circle, yellow 10px, #000 0) 10% 60%,
      radial-gradient(circle, khaki 10px, #000 0) 31% 80%,
      radial-gradient(circle, white 10px, #000 0) 80% 10%,
      radial-gradient(circle, lime 10px, #000 0) 90% 23%,
      radial-gradient(circle, crimson 10px, #000 0) 45% 20%,
      radial-gradient(circle, red 10px, #000 0) 13% 24%;
    background-size: 8px 8px;
    background-repeat: no-repeat;
    transform: translate(-50%, -50%);
    animation: fireworks-animation 4s infinite;
  }
  .c-firework::before {
    overflow: hidden;
    transform: translate(-50%, -50%) rotate(25deg) !important;
  }
  .c-firework::after {
    overflow: hidden;
    transform: translate(-50%, -50%) rotate(-37deg) !important;
  }

  .c-firework:nth-of-type(2),
  .c-firework:nth-of-type(2)::before,
  .c-firework:nth-of-type(2)::after {
    top: 30%;
    left: 16%;
    animation-duration: 3.8s;
    overflow: hidden;
  }
  .c-firework:nth-of-type(3),
  .c-firework:nth-of-type(3)::before,
  .c-firework:nth-of-type(3)::after {
    top: 10%;
    left: 72%;
    overflow: hidden;
    animation-duration: 4.2s;
  }
  .c-firework:nth-of-type(4),
  .c-firework:nth-of-type(4)::before,
  .c-firework:nth-of-type(4)::after {
    top: 28%;
    left: 32%;
    overflow: hidden;
    animation-duration: 3.6s;
  }
  .c-firework:nth-of-type(5),
  .c-firework:nth-of-type(5)::before,
  .c-firework:nth-of-type(5)::after {
    top: 32%;
    /* left: 84%; */
    overflow: hidden;
    animation-duration: 4.4s;
  }
  .c-firework:nth-of-type(6),
  .c-firework:nth-of-type(6)::before,
  .c-firework:nth-of-type(6)::after {
    top: 38%;
    left: 40%;
    overflow: hidden;
    animation-duration: 4.1s;
  }
  .c-firework:nth-of-type(7),
  .c-firework:nth-of-type(7)::before,
  .c-firework:nth-of-type(7)::after {
    top: 28%;
    left: 64%;
    overflow: hidden;
    animation-duration: 3.9s;
  }
  .c-firework:nth-of-type(8),
  .c-firework:nth-of-type(8)::before,
  .c-firework:nth-of-type(8)::after {
    top: 30%;
    left: 56%;
    overflow: hidden;
    animation-duration: 3.9s;
  }
`;

const Fireworks = () => {
  return (
    <div
      style={{ backgroundColor: "black" }}
      css={fireworksCss}
      className="c-firework"
    >
      <div className="c-firework"></div>
      <div className="c-firework"></div>
      <div className="c-firework"></div>
      <div className="c-firework"></div>
      <div className="c-firework"></div>
      <div className="c-firework"></div>
      <div className="c-firework"></div>
      <div className="c-firework"></div>
    </div>
  );
};

export default Fireworks;
