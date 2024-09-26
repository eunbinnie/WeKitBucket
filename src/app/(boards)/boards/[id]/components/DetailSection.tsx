"use client";

/* eslint-disable no-alert */
/* eslint-disable react/no-danger */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from "react";
import Link from "next/link";
import EditIcon from "public/icons/pencilIcon.svg";
import DeleteIcon from "public/icons/trashIcon.svg";
import LikeIcon from "public/icons/like.svg";
import postArticlesLike from "@/apis/article/postArticlesLike";
import deleteArticlesLike, { ArticleDetail } from "@/apis/article/deleteArticlesLike";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import deleteArticlesId from "@/apis/article/deleteArticlesId";
import CommonModal from "@/components/modal/CommonModal";
import DeleteModal from "./DeleteModal";
import Content from "./Content";

interface IArticleDetailProps {
  article: ArticleDetail;
  articleId: number;
  content: string | Promise<string>;
  myId: number | undefined;
}

function DetailSection({ article, articleId, content, myId }: IArticleDetailProps) {
  const router = useRouter();
  const [options, setOptions] = useState<ArticleDetail>(article);
  const [viewModal, setViewModal] = useState(false);
  const formattedDate = dayjs(options.createdAt).format("YYYY.MM.DD.");
  const isMyPost = options.writer.id === myId;

  const handleViewModal = () => {
    setViewModal(!viewModal);
  };

  const handleClickDeleteButton = async () => {
    try {
      await deleteArticlesId(options.id);
      router.push("/boards");
    } catch (error) {
      if (error instanceof Error) {
        if (error?.message === "Error: 게시글을 찾을 수 없습니다.") {
          router.push("/boards");
        } else {
          console.error("Failed to fetch Delete Articles: ", error);
        }
      }
    }
    handleViewModal();
  };

  const handleClickLikeButton = async () => {
    try {
      if (!myId) {
        throw new Error("User is not authenticated");
      }
      let res;
      if (options.isLiked) {
        res = await deleteArticlesLike(articleId);
      } else {
        res = await postArticlesLike(articleId);
      }
      setOptions(prev => ({
        ...prev,
        ...res,
      }));
    } catch (error) {
      if (error instanceof Error) {
        if (error?.message === "User is not authenticated") {
          alert("로그인이 필요합니다.");
          router.push("/login");
        } else {
          console.error("Failed to fetch articles like: ", error);
        }
      }
    }
  };

  return (
    <>
      <section className="rounded-[10px] px-5 pb-[14px] pt-5 shadow-custom-shadow sm:px-[30px] sm:py-10">
        <div className="grid gap-[14px] border-b-[1px] border-solid border-primary-gray-200 pb-[10px] sm:gap-[31.5px] sm:pb-2 lg:gap-[30px] lg:border-none">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h1 className="break-words text-2xl font-semibold leading-[1.3] text-primary-gray-500 sm:text-[32px] sm:leading-[1.3]">
              {options.title}
            </h1>
            {isMyPost && (
              <div className="ml-auto flex items-center justify-between gap-[12px] lg:gap-[14px]">
                <Link href={`/addboard/${articleId}`}>
                  <button className="flex h-[22px] w-[22px] items-center justify-center px-[3.21px] py-[3.21px] sm:hidden">
                    <EditIcon />
                  </button>
                </Link>
                <button
                  onClick={handleViewModal}
                  className="flex h-6 w-6 items-center justify-center px-[4.5px] py-[3.5px] sm:hidden"
                >
                  <DeleteIcon />
                </button>
                <Link href={`/addboard/${articleId}`}>
                  <button className="hidden h-[45px] w-[120px] items-center justify-center rounded-[10px] bg-primary-green-200 text-sm font-semibold text-white sm:flex lg:w-[140px]">
                    수정하기
                  </button>
                </Link>
                <button
                  onClick={handleViewModal}
                  className="hidden h-[45px] w-[120px] items-center justify-center rounded-[10px] bg-primary-green-200 text-sm font-semibold text-white sm:flex lg:w-[140px]"
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-[10px]">
              <span className="text-xs leading-[1.5] text-primary-gray-400 sm:text-sm sm:leading-[1.7]">
                {options.writer.name}
              </span>
              <span className="text-xs leading-[1.5] text-primary-gray-400 sm:text-sm sm:leading-[1.7]">
                {formattedDate}
              </span>
            </div>
            <button onClick={handleClickLikeButton} className="flex items-center gap-1">
              <div className="flex h-4 w-4 items-center justify-center px-[1.5px] py-[2.5px] sm:h-[18px] sm:w-[18px] sm:px-[1.87px] sm:pb-[3.22px] sm:pt-[2.36px]">
                {options.isLiked ? (
                  <LikeIcon width="100%" height="100%" fill="#4cbfa4" />
                ) : (
                  <LikeIcon width="100%" height="100%" fill="#8f95b2" />
                )}
              </div>
              <p className="text-xs leading-[1.5] text-primary-gray-400 sm:text-sm sm:leading-[1.7]">
                {options.likeCount}
              </p>
            </button>
          </div>
        </div>
        <div className="grid gap-[15px] pt-[15px] sm:gap-5 sm:pt-[30px]">
          <div className="text-sm leading-[1.7] text-primary-gray-500 sm:text-base">
            <Content content={content} />
          </div>
        </div>
      </section>
      <CommonModal active={viewModal} close={handleViewModal}>
        <DeleteModal onClick={handleClickDeleteButton} />
      </CommonModal>
    </>
  );
}

export default DetailSection;
