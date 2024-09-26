import React from "react";
import WikidMark from "public/images/landingLogo.webp";
import Image from "next/image";

export default function NoAlarmMessage() {
  return (
    <div className="flex flex-col items-center justify-center py-[40px]">
      <div className="relative flex h-[200px] w-[200px] flex-col">
        <Image fill src={WikidMark} alt="위키드 이미지" className="absolute animate-bounce" sizes="max-width:100%" />
      </div>
      <h3 className="flex">알림이 없습니다</h3>
    </div>
  );
}
