// zod を操作するファイル
// バリデーションの条件をここに記載し、フォームのあるページをスッキリさせる
// to control zod
// to write validation conditions to this file

import { z } from "zod";

export const validationSchema = z.object({
  name: z.string().nonempty("Name is required").min(4, "more than 4!!"),

  email: z
    .string()
    .nonempty("Email is required")
    .email("type correct Email address"),

  subject: z.string().nonempty("Subject is required"),

  message: z.string().nonempty("Message is required"),
});
