"use client";

import React, { useState } from "react";
import { useSelectedLayoutSegments } from "next/navigation";

import HamburgerMenu from "public/icons/hamburgerMenu.svg";
import Link from "next/link";
import ModalComponent from "./ModalComponent";
import MenuModalHeader from "./MenuModalHeader";

export default function NotUserDropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const segments = useSelectedLayoutSegments();

  const onOpen = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const onClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "scroll";
  };

  return (
    <div>
      <button onClick={onOpen} aria-label="User Profile">
        {/* <Image src={UserProfile} alt="프로필 이미지" /> */}
        <HamburgerMenu width="17" height="11" />
      </button>

      {isOpen && (
        <ModalComponent>
          <MenuModalHeader onClose={onClose} />
          <div className="mt-2.5 flex flex-col items-center gap-y-10 rounded-lg bg-white pb-2.5 pt-2.5">
            {segments.includes("wikilist") ? (
              <Link onClick={onClose} href="/wikilist" className="flex items-center text-primary-green-200">
                위키목록
              </Link>
            ) : (
              <Link onClick={onClose} href="/wikilist" className="flex items-center text-primary-gray-400">
                위키목록
              </Link>
            )}
            {segments.includes("boards") ? (
              <Link onClick={onClose} href="/boards" className="flex items-center text-primary-green-200">
                자유게시판
              </Link>
            ) : (
              <Link onClick={onClose} href="/boards" className="flex items-center text-primary-gray-400">
                자유게시판
              </Link>
            )}
            <hr className="h-[1px] w-[95dvw] px-[3px]" />
            <Link onClick={onClose} href="/login" className="flex items-center text-primary-gray-400">
              로그인
            </Link>
          </div>
        </ModalComponent>
      )}
    </div>
  );
}
