import getArticles from "@/apis/article/getArticles";
import { Metadata } from "next";
import BestPostList from "./components/bestArticles/BestPostList";
import AllArticleSection, { ArticleOption } from "./components/allArticles/AllArticleSection";
import BestHeader from "./components/bestArticles/BestHeader";

export const dynamic = "force-dynamic";

const allArticlesOption: ArticleOption = {
  page: 1,
  pageSize: 10,
  orderBy: "recent",
};

const bestArticlesOption: ArticleOption = {
  page: 1,
  pageSize: 4,
  orderBy: "like",
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "WeKitBucket | 자유게시판",
  };
}

async function Board() {
  const [allArticles, bestArticles] = await Promise.all([
    getArticles(allArticlesOption),
    getArticles(bestArticlesOption),
  ]);

  return (
    <div className="mx-auto mb-[57px] mt-10 grid gap-5">
      <section className="grid gap-5">
        <BestHeader />
        {bestArticles && <BestPostList article={bestArticles} />}
      </section>
      {allArticles && <AllArticleSection article={allArticles} />}
    </div>
  );
}

export default Board;
