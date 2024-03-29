// Components
import Hero from "../components/Hero";
import AnimeApi from "../components/features/home/AnimeApi";
import News from "../components/features/home/News";

// firebaseのファイル自体を輸入
import { auth } from "../service/firebase";

// firebaseのフックス(ログイン時でページを変えるstateをコントロールする)
import { useAuthState } from "react-firebase-hooks/auth";

// TYPE
type PropsType = {
  search: string;
  setSearch: (search: string) => void;
};

const Home = ({ search, setSearch }: PropsType) => {
  // どのアカウント認証しているのかをここのuserに入れる
  const [user] = useAuthState(auth);
  return (
    <>
      <main className="mainHome">
        {user ? (
          <>
            {/* True (ログイン時)*/}
            <Hero />
            <News />
            <AnimeApi search={search} setSearch={setSearch} />
          </>
        ) : (
          <>
            <Hero />
            <News />
            <AnimeApi search={search} setSearch={setSearch} />
          </>
        )}
      </main>
    </>
  );
};

export default Home;
