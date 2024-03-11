import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

// component
import AnimeList from "../AnimeList";

import { BrowserRouter } from "react-router-dom";

test("AnimeList component 🎊", async () => {
  const anime = {
    mal_id: 1,
    title: "title",
    images: {
      webp: {
        image_url: "url",
      },
    },
  };

  render(
    <BrowserRouter>
      <AnimeList index={1} anime={anime} />
    </BrowserRouter>,
  );

  // async なので、 findBy を使う
  const animeData = await screen.findByTestId("animeIdx-1");
  screen.debug(); // logout the HTML

  // Basic Vitest assertion for element presence
  expect(animeData).toBeTruthy();
});
