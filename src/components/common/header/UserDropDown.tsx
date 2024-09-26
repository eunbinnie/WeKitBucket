"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";

import postSignout from "@/apis/auth/postSignout";
import { useAuth } from "@/context/AuthContext";

import useToggle from "@/hooks/useToggle";
import HamburgerMenu from "public/icons/hamburgerMenu.svg";
import ModalComponent from "./ModalComponent";
import MenuModalHeader from "./MenuModalHeader";
import AlarmModal from "./AlarmModal";
import UserLocation from "./UserLocation";

export default function UserDropDown() {
  const [isOpen, setIsOpen] = useToggle(false);
  const [alarmToggle, setAlarmToggle] = useToggle(false);
  const { user, getUser } = useAuth();
  const router = useRouter();

  const segments = useSelectedLayoutSegments();

  const onOpen = () => {
    setIsOpen();
    document.body.style.overflow = "hidden";
  };

  const onClose = () => {
    setIsOpen();
    document.body.style.overflow = "scroll";
  };

  const handleLogout = async () => {
    try {
      await postSignout(); // 쿠키 삭제
      await getUser();
    } catch (error) {
      console.error(error);
    } finally {
      if (isOpen) onClose();
      router.push("/");
    }
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
          <div className="flex flex-col items-start justify-center py-[5px]">
            <h3>사용자 정보: {user?.name}</h3>
            <UserLocation />
          </div>
          <hr className="h-[1px] w-[95dvw] px-[3px]" />
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
              <Link onClick={onClose} className="flex items-center text-primary-green-200" href="/boards">
                자유게시판
              </Link>
            ) : (
              <Link onClick={onClose} className="flex items-center text-primary-gray-400" href="/boards">
                자유게시판
              </Link>
            )}
            <hr className="h-[1px] w-[95dvw] px-[3px]" />
            <Link onClick={onClose} href="/changepassword" className="flex items-center text-primary-gray-400">
              비밀번호 변경
            </Link>
            {user?.profile ? (
              <Link
                onClick={onClose}
                href={`/wiki/${user?.profile.code}`}
                className="flex items-center text-primary-gray-400"
              >
                내 위키
              </Link>
            ) : (
              <Link onClick={onClose} href="/makewiki" className="flex items-center text-primary-gray-400">
                위키 생성
              </Link>
            )}
            <button onClick={setAlarmToggle} className="flex items-center text-primary-gray-400">
              알람
            </button>
            <button onClick={handleLogout} className="flex items-center text-primary-gray-400">
              로그아웃
            </button>
          </div>
        </ModalComponent>
      )}
      {alarmToggle && <AlarmModal onClose={setAlarmToggle} />}
    </div>
  );
}
