import Link from "next/link";
import React from "react";
import WikidLogo from "public/icons/wikidLogo.svg";

export default function MenuModalHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex justify-between px-[20px] py-[20px] text-xl font-bold leading-7 text-primary-gray-400 shadow-[0px_4px_20px_-24px_black]">
      <Link href="/" onClick={onClose}>
        <WikidLogo width="107px" height="30px" />
      </Link>
      <button onClick={onClose}>X</button>
    </div>
  );
}
