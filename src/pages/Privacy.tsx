import { css } from "@emotion/react";
import { min, max } from "../styles/mediaQuery";

function Privacy() {
  const privacy = css`
    max-width: 800px;
    margin: 0 auto;
    padding: 60px 28px;

    // 1px〜480px
    ${min[0] + max[0]} {
      padding: 28px 12px;
      margin: 0 auto 160px auto;
    }

    .privacy {
      &__title {
        font-size: 2.5rem;
        margin-bottom: 28px;

        // 1px〜480px
        ${min[0] + max[0]} {
          font-size: 2rem;
        }

        &--small {
          font-size: 1.8rem;
          margin: 40px 0 12px 0;

          // 1px〜480px
          ${min[0] + max[0]} {
            font-size: 1.5rem;
          }
        }
      }

      &__text {
        font-size: 1.2rem;
        letter-spacing: 0.4px;
        line-height: 1.5;

        // 1px〜480px
        ${min[0] + max[0]} {
          font-size: 1.1rem;
        }
      }

      &__ul {
        list-style: underline;
        font-size: 1.2rem;

        // 1px〜480px
        ${min[0] + max[0]} {
          font-size: 1.1rem;
        }
      }
    }
    address {
      margin-top: 20px;
      font-size: 1.5rem;
      line-height: 1;
    }
  `;
  return (
    <>
      <article css={privacy} className="privacy">
        <h1 className="privacy__title">Privacy Policy</h1>
        <p className="privacy__text">
          [ KOJIMA-Dev ] is committed to providing quality services to you and
          this policy outlines our ongoing obligations to you in respect of how
          we manage your Personal Information. We have adopted the Australian
          Privacy Principles (APPs) contained in the Privacy Act 1988 (Cth) (the
          Privacy Act). The NPPs govern the way in which we collect, use,
          disclose, store, secure and dispose of your Personal Information. A
          copy of the Australian Privacy Principles may be obtained from the
          website of The Office of the Australian Information Commissioner at
          www.aoic.gov.au
        </p>
        <h2 className="privacy__title--small">
          What is Personal Information and why do we collect it?
        </h2>

        <p className="privacy__text">
          Personal Information is information or an opinion that identifies an
          individual. Examples of Personal Information we collect include:
          names, addresses, email addresses, phone and facsimile numbers. This
          Personal Information is obtained in many ways including [interviews,
          correspondence, by telephone and facsimile, by email, via our website
          https://com, from RK WebDesign, from media and publications, from
          other publicly available sources, from cookies- delete all that aren’t
          applicable] and from third parties. We don’t guarantee website links
          or policy of authorised third parties. We collect your Personal
          Information for the primary purpose of providing our services to you,
          providing information to our clients and marketing. We may also use
          your Personal Information for secondary purposes closely related to
          the primary purpose, in circumstances where you would reasonably
          expect such use or disclosure. You may unsubscribe from our
          mailing/marketing lists at any time by contacting us in writing. When
          we collect Personal Information we will, where appropriate and where
          possible, explain to you why we are collecting the information and how
          we plan to use it.
        </p>

        <div className="">
          <h2 className="privacy__title--small">Sensitive Information</h2>

          <p className="privacy__text">
            Sensitive information is defined in the Privacy Act to include
            information or opinion about such things as an individual's racial
            or ethnic origin, political opinions, membership of a political
            association, religious or philosophical beliefs, membership of a
            trade union or other professional body, criminal record or health
            information. Sensitive information will be used by us only:
          </p>
          <ul className="privacy__ul">
            <li className="">
              For the primary purpose for which it was obtained
            </li>
            <li className="privacy__li">
              For a secondary purpose that is directly related to the primary
              purpose
            </li>
            <li className="privacy__li">
              With your consent; or where required or authorised by law.
            </li>
          </ul>
        </div>

        <h2 className="privacy__title--small">Third Parties</h2>
        <p className="privacy__text">
          Where reasonable and practicable to do so, we will collect your
          Personal Information only from you. However, in some circumstances we
          may be provided with information by third parties. In such a case we
          will take reasonable steps to ensure that you are made aware of the
          information provided to us by the third party.
        </p>

        <div className="">
          <h3 className="privacy__title--small">Third Parties</h3>
          <p className="privacy__text">
            Your Personal Information may be disclosed in a number of
            circumstances including the following:
          </p>
          <ul className="privacy__ul">
            <li className="privacy__li">
              Third parties where you consent to the use or disclosure; and
            </li>
            <li className="">Where required or authorised by law.</li>
          </ul>
        </div>

        <div className="">
          <h2 className="privacy__title--small">
            Access to your Personal Information
          </h2>
          <p className="privacy__text">
            You may access the Personal Information we hold about you and to
            update and/or correct it, subject to certain exceptions. If you wish
            to access your Personal Information, please contact us in writing.
          </p>
          <p className="privacy__text">
            [RK WebDesign] will not charge any fee for your access request, but
            may charge an administrative fee for providing a copy of your
            Personal Information. In order to protect your Personal Information
            we may require identification from you before releasing the
            requested information.
          </p>
        </div>

        <div className="">
          <h2 className="privacy__title--small">
            Maintaining the Quality of your Personal Information
          </h2>
          <p className="privacy__text">
            It is an important to us that your Personal Information is up to
            date. We will take reasonable steps to make sure that your Personal
            Information is accurate, complete and up-to-date. If you find that
            the information we have is not up to date or is inaccurate, please
            advise us as soon as practicable so we can update our records and
            ensure we can continue to provide quality services to you.
          </p>
        </div>

        <div className="">
          <h2 className="privacy__title--small">Policy Updates</h2>
          <p className="privacy__text">
            This Policy may change from time to time and is available on our
            website.
          </p>
        </div>

        <div className="">
          <h2 className="privacy__title--small last">
            Privacy Policy Complaints and Enquiries
          </h2>
          <p className="privacy__text">
            If you have any queries or complaints about our Privacy Policy
            please contact us at:
          </p>
        </div>

        <h3 className="">Victoria Australia</h3>

        <address>kojima.website@gmail.com</address>
        <address>0435-023-894</address>
      </article>
    </>
  );
}

export default Privacy;
