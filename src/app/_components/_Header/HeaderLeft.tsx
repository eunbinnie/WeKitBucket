"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import debounce from "@/utils/debounce";

import Logo from "public/icons/logo.svg";
import { useSelectedLayoutSegments } from "next/navigation";

export default function HeaderLeft() {
  const segments = useSelectedLayoutSegments();
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const debouncedHandleResize = debounce(handleResize, 100);

    if (windowWidth === 0) setWindowWidth(window.innerWidth);
    window.addEventListener("resize", debouncedHandleResize);
    window.addEventListener("beforeunload", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      window.removeEventListener("beforeunload", debouncedHandleResize);
    };
  }, [windowWidth]);

  return (
    <div className="flex items-center gap-x-[40px]">
      <Link href="/" className="">
        <Logo width="130" height="23" />
      </Link>

      {/* <button onClick={dummyData}>
          <WikidLogo width="107px" height="30px" />
        </button> */}
      {windowWidth > 450 && (
        <div className="flex-shrink-1 flex items-center gap-x-[40px]">
          {segments.includes("wikilist") ? (
            <Link href="/wikilist" className="text-sm font-normal leading-6 text-primary-green-200">
              위키목록
            </Link>
          ) : (
            <Link href="/wikilist" className="text-sm font-normal leading-6 text-primary-gray-500">
              위키목록
            </Link>
          )}
          {segments.includes("boards") ? (
            <Link href="/boards" className="w-[70px] text-sm font-normal leading-6 text-primary-green-200">
              자유게시판
            </Link>
          ) : (
            <Link href="/boards" className="text-sm font-normal leading-6 text-primary-gray-500">
              자유게시판
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
