"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { marked } from "marked";
import { useAuth } from "@/context/AuthContext";
import getArticlesId from "@/apis/article/getArticlesId";
import { ArticleDetail } from "@/apis/article/deleteArticlesLike";
import DetailSection from "./components/DetailSection";
import CommentSection from "./components/CommentSection";

function PostDetail({ params }: { params: { id: number } }) {
  const { id } = params;
  const { user } = useAuth();
  const [articleDetail, setArticleDetail] = useState<ArticleDetail | null>(null);
  const [articleContent, setArticleContent] = useState<string | Promise<string>>("");

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const data = await getArticlesId(id);
        const markedData = marked(data.content);
        setArticleDetail(data);
        setArticleContent(markedData);
      } catch (error) {
        console.error("Failed to fetch Article Detail: ", error);
      }
    };

    fetchArticleDetail();
  }, [id]);

  return (
    <main className="mx-auto grid max-w-[1060px] gap-10 px-5 py-5 sm:px-[60px] sm:pb-[46px] sm:pt-10 lg:gap-[60px] lg:pb-[130px] lg:pt-[60px]">
      {articleDetail && (
        <DetailSection article={articleDetail} content={articleContent} articleId={id} myId={user?.id} />
      )}
      <title>{`WiKitBucket | ${articleDetail?.title || "제목없음"}`}</title>
      <Link href="/boards" className="mx-auto">
        <button className="w-[140px] rounded-[10px] border border-solid border-primary-green-200 py-[10.5px] text-center text-sm font-semibold leading-[1.7] text-primary-green-200">
          목록으로
        </button>
      </Link>
      <CommentSection id={id} user={user} />
    </main>
  );
}

export default PostDetail;
