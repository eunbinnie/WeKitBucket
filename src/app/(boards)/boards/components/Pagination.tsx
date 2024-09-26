"use client";

/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from "react";
import PrevIcon from "public/icons/prev.svg";
import NextIcon from "public/icons/next.svg";

interface IPaginationProps {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onClick: (number: number) => void;
  groupSize: number;
}

/**
 * pagination 컴포넌트
 * @totalCount 전체 게시글 수 (api: totalCount)
 * @currentPage 현재 페이지 (api: page)
 * @pageSize 한 페이지에 보이는 게시글 수 (api: pageSize)
 * @onClick 버튼 클릭 이벤트 핸들 함수 (콜백으로 숫자 전달)
 * @groupSize 한 화면에 보이는 최대 페이지 버튼 수
 */
function Pagination({ totalCount, currentPage, pageSize, onClick, groupSize }: IPaginationProps) {
  const [pageGroup, setPageGroup] = useState(Math.ceil(currentPage / groupSize));
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const totalPage =
    totalCount % pageSize > 0 ? Math.floor(totalCount / pageSize) + 1 : Math.floor(totalCount / pageSize);
  const isFirstNumber = currentPage === 1;
  const isLastNumber = currentPage === totalPage;

  let lastNum = pageGroup * groupSize;
  if (lastNum > totalPage) {
    lastNum = totalPage;
  }
  let firstNum = groupSize >= lastNum ? 1 : groupSize * (pageGroup - 1) + 1;

  const onClickNumberBtn: (number: number) => void = value => {
    onClick(value);
  };

  const onClickPrevBtn = () => {
    if (currentPage === firstNum) {
      setPageGroup(pageGroup - 1);
    }
    onClick(currentPage - 1);
  };

  const onClickNextBtn = () => {
    if (currentPage === lastNum) {
      setPageGroup(pageGroup + 1);
    }
    onClick(currentPage + 1);
  };

  useEffect(() => {
    setPageGroup(Math.ceil(currentPage / groupSize));
  }, [currentPage, groupSize]);

  useEffect(() => {
    const newPageNumbers = Array.from({ length: lastNum - firstNum + 1 }, (_, index) => firstNum + index);
    setPageNumbers(newPageNumbers);
  }, [pageGroup, firstNum, lastNum]);

  return (
    <div className="flex items-center justify-center gap-[10px] sm:mt-[30px] sm:gap-[15px]">
      {isFirstNumber ? (
        <div className="aspect-square max-h-10 w-[12%] max-w-10 sm:h-[45px] sm:w-[45px]" />
      ) : (
        <button
          type="button"
          onClick={onClickPrevBtn}
          className="flex aspect-square max-h-10 w-[12%] max-w-10 items-center justify-center rounded-[10px] shadow-custom-shadow sm:h-[45px] sm:w-[45px]"
        >
          <div className="flex h-2 w-[6px] items-center justify-center sm:h-[10px] sm:w-[6px]">
            <PrevIcon />
          </div>
        </button>
      )}

      {pageNumbers.map(num => (
        <button
          key={num}
          type="button"
          onClick={() => onClickNumberBtn(num)}
          className="flex aspect-square max-h-10 w-[12%] max-w-10 items-center justify-center rounded-[10px] shadow-custom-shadow sm:h-[45px] sm:w-[45px]"
        >
          <span
            className={`text-xs sm:text-lg ${currentPage === num ? "text-primary-green-200" : "text-primary-gray-400"}`}
          >
            {num}
          </span>
        </button>
      ))}
      {isLastNumber ? (
        <div className="aspect-square max-h-10 w-[12%] max-w-10" />
      ) : (
        <button
          type="button"
          onClick={onClickNextBtn}
          className="flex aspect-square max-h-10 w-[12%] max-w-10 items-center justify-center rounded-[10px] shadow-custom-shadow sm:h-[45px] sm:w-[45px]"
        >
          <div className="flex h-2 w-[6px] items-center justify-center sm:h-[10px] sm:w-[6px]">
            <NextIcon />
          </div>
        </button>
      )}
    </div>
  );
}

export default Pagination;
