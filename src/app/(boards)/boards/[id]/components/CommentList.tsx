"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from "react";
import DefaultProfile from "public/icons/defaultProfile.svg";
import EditIcon from "public/icons/pencilIcon.svg";
import DeleteIcon from "public/icons/trashIcon.svg";
import { ICommentList } from "@/apis/comment/getComment";
import dayjs from "dayjs";
import Image from "next/image";
import useImageLoad from "@/hooks/useImageLoad";
import deleteComment from "@/apis/comment/deleteComment";
import patchComment from "@/apis/comment/patchComment";

import CommonModal from "@/components/modal/CommonModal";
import DeleteModal from "./DeleteModal";
import { LIMIT } from "./CommentForm";

interface ICommentListProps {
  list: ICommentList;
  myId: number | undefined;
  onChangeApi: () => void;
}

function CommentList({ list, myId, onChangeApi }: ICommentListProps) {
  const { id, content, createdAt, writer } = list;
  const { id: writerId, image, name } = writer;
  const [viewModal, setViewModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [commentValue, setCommentValue] = useState(content);
  const [commentCount, setCommentCount] = useState(content.length);
  const isMyComment = writerId === myId;
  const formattedDate = dayjs(createdAt).format("YYYY.MM.DD.");
  const imageError = useImageLoad(image);

  const handleViewModal = () => {
    setViewModal(!viewModal);
  };

  const handleClickDeleteButton = async () => {
    try {
      await deleteComment(id);
      onChangeApi();
    } catch (error) {
      console.error("Failed to fetch Delete Comment: ", error);
    }
    handleViewModal();
  };

  const handleChangeComment: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
    const { value } = e.target;
    setCommentValue(value);
    setCommentCount(value.length);
  };

  const handleCancelEditMode = () => {
    setEditMode(false);
    setCommentValue(content);
  };

  const handleEditComment: React.MouseEventHandler<HTMLButtonElement> = async e => {
    e.preventDefault();
    try {
      await patchComment(id, commentValue);
      setEditMode(false);
      onChangeApi();
    } catch (error) {
      console.error("Failed to fetch Patch Comment: ", error);
    }
  };

  return (
    <>
      <li className="flex gap-[15px] rounded-[10px] px-5 py-4 shadow-custom-shadow sm:gap-5 sm:px-[30px] sm:py-5 lg:py-[22px]">
        <div className="relative flex h-10 w-10 overflow-hidden rounded-full sm:h-[50px] sm:w-[50px]">
          {imageError === false && image ? (
            <Image fill sizes="max-width:100%" src={image} alt={name} style={{ objectFit: "cover" }} />
          ) : (
            imageError === true && <DefaultProfile width="100%" height="100%" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between gap-1">
            <h6 className="font-semibold leading-[1.7] text-primary-gray-500 sm:text-lg sm:leading-[1.4]">{name}</h6>
            {isMyComment && (
              <div className="flex gap-[15px] sm:gap-5">
                <button
                  onClick={() => {
                    setEditMode(true);
                  }}
                  className="flex h-5 w-5 items-center justify-center p-[3px] sm:h-6 sm:w-6 sm:p-[3.5px]"
                >
                  <EditIcon />
                </button>
                <button
                  onClick={handleViewModal}
                  className="flex h-5 w-5 items-center justify-center px-[3.75px] py-[3px] sm:h-6 sm:w-6 sm:px-[4.5px] sm:pb-[3.5px] sm:pt-[3.62px]"
                >
                  <DeleteIcon />
                </button>
              </div>
            )}
          </div>
          {editMode ? (
            <form className="mb-6 mt-2 grid h-[120px] gap-1 rounded-[10px] bg-primary-gray-100 pb-[14px] pl-5 pr-[14px] pt-4 sm:mt-[15px] sm:pt-5 lg:mb-10 lg:px-[15px] lg:py-[13px]">
              <textarea
                value={commentValue}
                maxLength={LIMIT}
                onChange={handleChangeComment}
                placeholder="댓글을 입력해 주세요"
                className="w-full resize-none bg-transparent text-sm leading-[1.7] text-primary-gray-500 outline-none placeholder:text-primary-gray-400"
              />
              <div className="flex flex-wrap items-end justify-between gap-1">
                <p className="text-sm leading-[1.7] text-primary-gray-300">
                  <span>{commentCount}</span> / <span>{LIMIT}</span>
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleEditComment}
                    className="text-xs font-semibold leading-[1.7] text-primary-gray-300"
                  >
                    수정
                  </button>
                  <button
                    onClick={handleCancelEditMode}
                    className="text-xs font-semibold leading-[1.7] text-primary-gray-300"
                  >
                    취소
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <p className="mb-1 whitespace-pre-line text-sm leading-[1.7] text-primary-gray-500 sm:mb-[10px] sm:mt-[6px] sm:text-base">
              {content}
            </p>
          )}

          <span className="text-xs leading-[1.5] text-primary-gray-400 sm:text-sm">{formattedDate}</span>
        </div>
      </li>
      <CommonModal active={viewModal} close={handleViewModal}>
        <DeleteModal onClick={handleClickDeleteButton} />
      </CommonModal>
    </>
  );
}

export default CommentList;
