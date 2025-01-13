import Link from "next/link";
import { marked } from "marked";
import getArticlesId from "@/apis/article/getArticlesId";
import DetailSection from "./components/DetailSection";
import CommentSection from "./components/CommentSection";

export const dynamic = "force-dynamic";

async function PostDetail({ params }: { params: { id: number } }) {
  const { id } = params;

  const articleDetail = await getArticlesId(id);
  const articleContent = marked(articleDetail.content);

  return (
    <main className="mx-auto grid max-w-[1060px] gap-10 px-5 py-5 sm:px-[60px] sm:pb-[46px] sm:pt-10 lg:gap-[60px] lg:pb-[130px] lg:pt-[60px]">
      {articleDetail && <DetailSection article={articleDetail} content={articleContent} articleId={id} />}
      <Link href="/boards" className="mx-auto">
        <button className="w-[140px] rounded-[10px] border border-solid border-primary-green-200 py-[10.5px] text-center text-sm font-semibold leading-[1.7] text-primary-green-200">
          목록으로
        </button>
      </Link>
      <CommentSection id={id} />
    </main>
  );
}

export default PostDetail;
