import React from "react";
import Link from "next/link";
import LeftArrow from "public/icons/leftArrow.svg";
import RightArrow from "public/icons/rightArrow.svg";
import PageItem from "./PageItem";

type PaginationProps = {
  totalCount: number;
  pageSize: number;
  keyword: string;
  page: number;
};

function Pagination({ totalCount, pageSize, keyword, page = 1 }: PaginationProps) {
  const pageItemCount = Math.ceil(totalCount / pageSize) <= 1 ? 1 : Math.ceil(totalCount / pageSize);
  const pageArray = Array.from({ length: pageItemCount }, (_, index) => Number(index + 1));

  return (
    <div className="mt-14 flex items-center justify-center gap-2 rounded-xl p-2 md:mt-20 xl:mt-[120px]">
      <Link
        href={`/wikilist?${keyword ? `keyword=${keyword}` : ""}&number=${page > 1 ? Number(page) - 1 : 1}`}
        className={`${Number(page) === 1 && "invisible"} flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl text-primary-gray-400 shadow-[0_4px_20px_rgba(0,0,0,0.08)]`}
      >
        <LeftArrow />
      </Link>
      {pageArray.map(item => (
        <PageItem key={item} keyword={keyword} page={page}>
          {item}
        </PageItem>
      ))}
      <Link
        href={`/wikilist?${keyword ? `keyword=${keyword}` : ""}&number=${page < pageItemCount ? Number(page) + 1 : page}`}
        className={`${Number(page) === pageItemCount && "invisible"} flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl text-primary-gray-400 shadow-[0_4px_20px_rgba(0,0,0,0.08)]`}
      >
        <RightArrow />
      </Link>
    </div>
  );
}

export default Pagination;
