import getArticles from "@/apis/article/getArticles";

import BestPostList from "./components/bestArticles/BestPostList";
import AllArticleSection, { ArticleOption } from "./components/allArticles/AllArticleSection";
import BestHeader from "./components/bestArticles/BestHeader";

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

async function Board() {
  console.log("hi");
  const allArticles = await getArticles(allArticlesOption);
  const bestArticles = await getArticles(bestArticlesOption);

  return (
    <div className="mx-auto mb-[57px] mt-10 grid gap-5">
      <title>WeKitBucket | 자유게시판</title>
      <section className="grid gap-5">
        <BestHeader />
        {bestArticles && <BestPostList article={bestArticles} />}
      </section>
      {allArticles && <AllArticleSection article={allArticles} />}
    </div>
  );
}

export default Board;
