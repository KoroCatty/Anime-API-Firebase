import { useRef, useState } from "react";

import { css } from "@emotion/react";
import { min, max } from "../styles/mediaQuery";

// Emailjs
import emailjs from "@emailjs/browser";

// Validation Zod
import { validationSchema } from "../components/features/Contact/validationSchema";

// react hook form (these 2 set)
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// 花火
import Fireworks from "../components/common/Fireworks";

//? ====================================================
//? TYPES (各フォームから送られてくるデータの型)
//? ====================================================
type FormDataTypes = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const contactCSS = css`
    max-width: 1080px;
    margin: 0 auto 0 auto;
    z-index: 2;
    position: relative;
    /* box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5); */
    width: 80%;
    padding: 6rem 2rem;

    // 1px〜519px
    ${min[0] + max[0]} {
      margin-top: 400px;
      padding: 2rem 1rem;
      width: 100%;
      box-shadow: none;
    }
    /* 520px〜767px */
    ${min[1] + max[1]} {
      z-index: 2;
    }
    /* 768px〜989px */
    ${min[2] + max[2]} {
      z-index: 2;
    }
    /* 990px〜1200px */
    ${min[3] + max[3]} {
      z-index: 2;
    }

    .contactTitle {
      font-size: 7rem;
      margin: 0;
      padding: 1rem 0 1rem 2rem;
      text-align: start;

      // 1px〜519px
      ${min[0] + max[0]} {
        font-size: 3.5rem;
        padding-left: 0;
      }
      /* 520px〜767px */
      ${min[1] + max[1]} {
        font-size: 4rem;
      }
      /* 768px〜989px */
      ${min[2] + max[2]} {
        font-size: 5rem;
      }
    }

    form {
      margin: 2rem auto 0 auto;
      width: 90%;
      max-width: 800px;

      // 1px〜480px
      ${min[0] + max[0]} {
        /* width: 80%; */
        margin: 0;
      }
      // 481px〜768px
      ${min[1] + max[1]} {
        width: 80%;
      }

      .inputLabel {
        font-size: 1.2rem;
        margin-top: 16px;
        margin-bottom: 4px;
        display: block;
        border-radius: 8px;
        font-weight: bold;
      }

      input {
        height: 40px;
        width: 100%;
        margin: 0.4rem 0 2rem 0;
        border-radius: 2px;

        // 1px〜480px
        ${min[0] + max[0]} {
          margin: 0.4rem 0 1rem 0;
        }
      }

      // Warning Message
      .warning {
        font-size: 1rem;
        color: red;
        letter-spacing: 0.5px;
      }

      textarea {
        width: 100%;
        min-height: 200px;
        letter-spacing: 1px;
        border-radius: 0;
      }

      // Both
      input,
      textarea {
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 1);
        outline: none;
      }

      // input内フォント
      input[type="text"],
      input[type="email"],
      input[type="password"],
      textarea {
        font-size: 1.4rem;
        letter-spacing: 1px;
        letter-spacing: 1px;
      }

      .contactSubmitBtn {
        display: block;
        margin: 0 auto;
        width: fit-content;
        padding: 1rem 8rem;
        margin-top: 60px;
        cursor: pointer;
        box-shadow: 1px 1px 6px black;
        border-radius: 4px;
        border: none;
        font-size: 1.4rem;
        letter-spacing: 1px;
        font-weight: bold;

        // 1px〜519px
        ${min[0] + max[0]} {
          padding: 0.5rem 4rem;
        }
        // 520px〜768px
        ${min[1] + max[1]} {
          padding: 0.8rem 6rem;
        }

        &:hover {
          transform: translate(0, 4px);
          transition: 0.6s all ease;
          opacity: 0.8;
        }
      }
    }

    // Thanks Message
    h4 {
      text-align: center;
      font-size: 1.8rem !important;
      line-height: 1.4;
      z-index: 1;
      position: absolute;
      color: white;
      top: 20%;
      left: 50%;
      transform: translate(-50%, 20%);
      width: 90%;
      padding: 2rem 2rem;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 8px;

      // 1px〜519px
      ${min[0] + max[0]} {
        font-size: 1.3rem !important;
      }
      // 520px〜768px
      ${min[1] + max[1]} {
        font-size: 1.6rem !important;
      }
    }
  `;

  // HOOKS
  const [showFireworks, setShowFireworks] = useState(false);

  // 全てのフォームの中の情報をobjectで全て取得 (Null も設定しておく)
  const form = useRef<HTMLFormElement | null>(null);
  // console.log(form);
  // 必要なIDをそれぞれ環境変数から取得
  // to use emailjs, you need to set up your own account and get these IDs
  const serviceID = import.meta.env.VITE_PUBLIC_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_PUBLIC_EMAILJS_TEMPLATE_ID;
  const userID = import.meta.env.VITE_PUBLIC_EMAILJS_USER_ID;

  //! ====================================================
  //! react-hook-form
  //! ====================================================
  // onChangeタイプしながら下で設定したValidationを出せるようになる
  // エラーを出したい時はこのformStateのerrorsを使う
  // when you want to show error, use formState.errors

  // registerはinputのname属性に設定, handleSubmitはsubmit時に実行する関数, formStateはエラーを出すため
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataTypes>({
    // modeを切り替えて、いつエラー表示を出すのか変更可能
    // you can change when to show error by changing mode
    mode: "onChange",

    // validationSchema は別ファイルで設定
    resolver: zodResolver(validationSchema), // from validationSchema.ts
  });

  //! ====================================================
  //! Form Submit
  //! ====================================================
  const onSubmit = (formsData: FormDataTypes) => {
    console.log(formsData);

    // Emailjsの関数を実行
    sendEmail();
  };

  //! ====================================================
  //! From Emailjs
  //! ====================================================
  const sendEmail = () => {
    // Check if the variables are defined
    if (!serviceID || !templateID || !userID) {
      throw new Error("EmailJS variables are not set");
    }

    // formオブジェクト内のcurrentを取ってEmailjsへ送る
    if (form.current) {
      emailjs.sendForm(serviceID, templateID, form.current, userID).then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        },
      );

      // フォームを空にする
      // e.target.reset();

      // 成功時のみFireworksコンポーネントを表示 (10秒間)
      setShowFireworks(true);

      // 10秒後にFireworksコンポーネントを非表示にする
      setTimeout(() => {
        setShowFireworks(false);
      }, 10000);

      // Display a Thank you message
      if (form.current) {
        form.current.innerHTML =
          "<h4>Thank you for your message!<p>I will response as soon as possible🫡</p></h4>";
      }
    } else {
      console.log("form.current is null");
    }
  };

  //! ====================================================
  //! JSX
  //! ====================================================
  return (
    <>
      <section css={contactCSS} id="contact">
        <h2 className="contactTitle">CONTACT</h2>
        {/* 送信後に画像を表示 */}
        {showFireworks && <div className="fireworksBgDark"></div>}

        <form ref={form} onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <label htmlFor="inputName" className="inputLabel">
            Name
          </label>
          {/* this show an error when errors.nam.message is not null  */}
          <small className="warning">{errors.name?.message}</small>
          <input
            type="text"
            className="inputNam"
            {...register("name")} // react-hook-form
          />

          {/* Email */}
          <label htmlFor="inputEmail" className="inputLabel">
            Email
          </label>
          <small className="warning">{errors.email?.message}</small>
          <input
            type="email"
            className="inputEmail"
            {...register("email")} // react-hook-form
          />

          {/* Subject */}
          <label htmlFor="inputSub" className="inputLabel">
            Title
          </label>
          <small className="warning">{errors.subject?.message}</small>
          <input
            type="text"
            className="inputSub"
            {...register("subject")} // react-hook-form
          />

          {/* Message */}
          <label htmlFor="inputMes" className="inputLabel">
            Message
          </label>
          <small className="warning">{errors.message?.message}</small>
          <textarea
            {...register("message")} // react-hook-form
          ></textarea>

          {/* Submit Button  */}
          <button className="contactSubmitBtn" type="submit">
            SEND
          </button>
        </form>

        {/* Fireworks COMPONENT */}
        {showFireworks && <Fireworks />}
      </section>
    </>
  );
};

export default Contact;
