// ts particle
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


function Particle() {


  const particlesInit = useCallback(async engine => {
    // console.log(engine);

    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
}, []);

const particlesLoaded = useCallback(async container => {
    // await console.log(container);
}, []);

  return (
    <Particles
    id="tsparticles"
    className="ts_particles_css"
    init={particlesInit}
    loaded={particlesLoaded}
    
    // Options
    options={{
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
      },
      particles: {
        color: {
          value: "#ffafc9", // 桜の花びらの色
        },
        move: {
          direction: "bottom", // 花びらが下に落ちるように設定
          enable: true,
          outMode: "out",
          speed: 2, // 落ちる速度
        },
        number: {
          density: {
            enable: true,
            area: 1800, // 1平方ピクセルあたりの花びらの密度
          },
          value: 40, // 画面上の花びらの数
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "image", // 画像として花びらを使用
          image: {
            src: "/Images/sakura_hanabira_pinky.png", // 画像のパスを指定
            width: 120,
            height: 120,
          },
        },
        size: {
          value: { min: 5, max: 10 }, // 花びらのサイズ
          random: true,
        },
      },
      detectRetina: true,
    }}
    
/>
  )
}

export default Particle