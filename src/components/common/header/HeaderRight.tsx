"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import debounce from "@/utils/debounce";

import { useAuth } from "@/context/AuthContext";
// import { useToast } from "@/context/ToastContext";
import { AlarmProvider } from "@/context/AlarmContext";
import useToggle from "@/hooks/useToggle";
import MessageAlarm from "./MessageAlarm";
import UserDropDown from "./UserDropDown";
import NotUserDropDown from "./NotUserDropDown";
import UserProfileDropdown from "./UserProfileDropdown";

export default function HeaderRight() {
  const { user, userProfile, getUser } = useAuth();
  // const { popupToast } = useToast();

  const [windowWidth, setWindowWidth] = useState(0);
  const [alarmToggle, setAlarmToggle] = useToggle(false);
  const [menuToggle, setMenuToggle] = useToggle(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // popupToast({
      //   color: "red",
      //   pos: "top",
      //   message: "다른 친구가 편집하고 있어요. 나중에 다시 시도해 주세요.",
      //   width: 860,
      // });
      // popupToast({ color: "green", pos: "top", message: "내 위키 링크가 복사되었습니다.", width: 860 });
      // popupToast({ color: "gray", pos: "top", message: "앞 사람의 편집이 끝나면 위키 참여가 가능합니다.", width: 860 });
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

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AlarmProvider>
      {user ? (
        <div className="z-3">
          {windowWidth > 450 ? (
            <div className="flex items-center gap-4 text-primary-gray-400">
              <MessageAlarm
                toggle={alarmToggle}
                oppositeToggle={menuToggle}
                setToggle={setAlarmToggle}
                setOppositeToggle={setMenuToggle}
              />
              <UserProfileDropdown
                toggle={menuToggle}
                oppositeToggle={alarmToggle}
                setToggle={setMenuToggle}
                setOppositeToggle={setAlarmToggle}
                code={userProfile?.code}
                profileImage={userProfile?.image}
              />
            </div>
          ) : (
            <UserDropDown />
          )}
        </div>
      ) : (
        <div className="flex items-center">
          {windowWidth > 450 ? (
            <Link href="/login" className="w-[50px] text-sm font-normal leading-6">
              로그인
            </Link>
          ) : (
            <NotUserDropDown />
          )}
        </div>
      )}
    </AlarmProvider>
  );
}
