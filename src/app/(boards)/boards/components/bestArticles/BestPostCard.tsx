"use client";

import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import NextImage from "next/image";
import useImageLoad from "@/hooks/useImageLoad";
import LikeIcon from "public/icons/like.svg";
import CameraIcon from "public/icons/camera.svg";
import { IPostProps } from "../allArticles/PostList";

function BestPostCard({ post }: IPostProps) {
  const { id, title, image, createdAt, writer, likeCount } = post;
  const { name } = writer;
  const imageError = useImageLoad(image);
  const formattedDate = dayjs(createdAt).format("YYYY.MM.DD.");

  return (
    <Link
      href={`/boards/${id}`}
      className="block h-[200px] w-[250px] sm:aspect-[1/0.73] sm:h-auto sm:w-full lg:aspect-[1/0.88]"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[10px] shadow-custom-shadow">
        <div className="flex-1">
          {imageError === false && image ? (
            <div className="relative flex h-full items-center justify-center">
              <NextImage src={image} alt={title} fill sizes="max-width:100%" priority style={{ objectFit: "cover" }} />
            </div>
          ) : (
            imageError === true && (
              <div className="flex h-full items-center justify-center rounded-t-[10px] bg-primary-gray-100">
                <CameraIcon />
              </div>
            )
          )}
        </div>
        <div className="grid px-5 pb-[15px] pt-[10px] sm:gap-[6px] sm:pb-[14px] sm:pt-5">
          <h3 className="w-full truncate font-semibold leading-[1.6] sm:text-lg sm:leading-[1.4]">{title}</h3>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 sm:gap-[10px] lg:gap-2">
              <p className="text-xs leading-[1.5] text-primary-gray-400 sm:text-sm sm:leading-[1.7]">{name}</p>
              <p className="text-xs leading-[1.5] text-primary-gray-400 sm:text-sm sm:leading-[1.7]">{formattedDate}</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex h-4 w-4 items-center justify-center px-[2px] py-[2px] sm:h-[18px] sm:w-[18px]">
                <LikeIcon fill="#8f95b2" />
              </div>
              <span className="text-xs text-primary-gray-400 sm:text-sm">{likeCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BestPostCard;
