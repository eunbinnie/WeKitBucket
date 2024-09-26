"use client";

import React from "react";
import SearchIcon from "public/icons/search.svg";

function SearchInput({ onChange, value }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative flex-1">
      <input
        placeholder="제목을 입력해 주세요"
        value={value}
        onChange={onChange}
        className="w-full rounded-[10px] bg-primary-gray-100 py-[7px] pl-[47px] pr-[15px] font-medium leading-[1.7] placeholder:text-primary-gray-400 focus:outline-none"
      />
      <div className="absolute left-[17px] top-1/2 -translate-y-1/2">
        <SearchIcon width={17} height={17} />
      </div>
    </div>
  );
}

export default SearchInput;
