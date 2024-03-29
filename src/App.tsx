// API REFERENCE:  https://docs.api.jikan.moe/

// pages
import Home from "./pages/Home";

// components
import Layout from "./components/layout/Layout";
import Privacy from "./pages/Privacy";
import Details from "./pages/Details";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import NotFound from "./pages/NotFound";

// import "./stylesheets/main.scss";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      {/* <Bg3d /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={<Home search={search} setSearch={setSearch} />}
            />
            <Route path="/:id" element={<Details />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/editpost/:id" element={<EditPost />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
