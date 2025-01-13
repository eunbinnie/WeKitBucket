"use server";

import fetchInstance from "@/utils/fetchInstance";
import { ArticleDetail } from "./deleteArticlesLike";

// 자유게시판 페이지
const getArticlesId = async (articleId: number) => {
  try {
    const data = await fetchInstance<ArticleDetail>(`articles/${articleId}`, {
      method: "GET",
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Artist list failed");
    } else {
      throw new Error("Artist list failed");
    }
  }
};

export default getArticlesId;
