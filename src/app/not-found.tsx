import React from "react";
import Link from "next/link";
import Empty from "public/icons/questionMark.svg";

function NotFound() {
  return (
    <div className="flex min-h-[calc(100dvh-60px)] items-center justify-center px-5 py-5 xl:min-h-[calc(100dvh-80px)]">
      <div className="flex flex-col items-center gap-5">
        <div className="w-full max-w-[100px]">
          <Empty width="100%" height="100%" />
        </div>
        <p className="break-keep text-center text-lg font-semibold text-primary-gray-500">
          죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
        </p>
        <Link
          href="/"
          className="rounded-[10px] bg-primary-green-200 px-5 py-2 text-sm font-semibold leading-[1.7] text-white"
        >
          메인으로
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
