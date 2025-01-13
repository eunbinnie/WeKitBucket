import { ArticleData } from "@/types/articles.type";
import fetchInstance from "@/utils/fetchInstance";
import { revalidatePath } from "next/cache";

type getArticlesType = {
  page?: number;
  pageSize?: number;
  orderBy?: "recent" | "like";
  keyword?: string;
};

const getArticles = async (options: getArticlesType) => {
  try {
    const data = await fetchInstance<ArticleData>("articles", {
      method: "GET",
      params: options,
    });

    revalidatePath("/(boards)/boards", "page");
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Article list failed");
    } else {
      throw new Error("Article list failed");
    }
  }
};

export default getArticles;
