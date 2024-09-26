"use client";

import React from "react";
import LikeIcon from "public/icons/like.svg";

import Link from "next/link";
import dayjs from "dayjs";
import { ArticleList } from "@/types/articles.type";

export interface IPostProps {
  post: ArticleList;
}

function PostList({ post }: IPostProps) {
  const { id, title, createdAt, writer, likeCount } = post;
  const { name } = writer;

  const formattedDate = dayjs(createdAt).format("YYYY.MM.DD.");

  return (
    <li className="board-tr w-full overflow-hidden border-b border-solid border-primary-gray-200 pb-[10px]">
      <p className="hidden justify-center text-center leading-[1.7] text-primary-gray-500 sm:block sm:text-center">
        {id}
      </p>
      <Link href={`/boards/${id}`} className="w-full truncate leading-[1.7] text-primary-gray-500 sm:text-center">
        {title}
      </Link>
      <div className="flex items-center justify-between sm:gap-[50px] lg:gap-20">
        <div className="board-td-info items-center">
          <p className="break-keep leading-[1.7] text-primary-gray-400 sm:truncate sm:text-center sm:text-primary-gray-500">
            {name}
          </p>
          <p className="hidden leading-[1.7] text-primary-gray-500 sm:block sm:truncate sm:text-center">{likeCount}</p>
          <p className="leading-[1.7] text-primary-gray-400 sm:truncate sm:text-center sm:text-primary-gray-500">
            {formattedDate}
          </p>
        </div>
        <div className="flex items-center gap-[7px] sm:hidden">
          <LikeIcon width="14.25" height="12.42" fill="#8f95b2" />
          <span className="leading-[1.7] text-primary-gray-400 sm:text-primary-gray-500">{likeCount}</span>
        </div>
      </div>
    </li>
  );
}

export default PostList;
