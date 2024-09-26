"use client";

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import Caret from "public/icons/caret.svg";

export interface ISortValue {
  text: string;
  id: "recent" | "like";
}

interface IDropdownProps {
  sortValue: ISortValue[];
  onClick: (id: "recent" | "like") => void;
}

function Dropdown({ sortValue, onClick }: IDropdownProps) {
  const [view, setView] = useState(false);
  const [selected, setSelected] = useState(sortValue[0].text);

  const toggleDropdown = () => {
    setView(!view);
  };

  const onClickSort = (id: "recent" | "like") => () => {
    const selectedValue = sortValue.find(value => value.id === id);
    if (selectedValue) {
      setSelected(selectedValue.text);
    }

    toggleDropdown();
    onClick(id);
  };

  return (
    <div className="relative w-full md:w-[120px] lg:w-[140px]">
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex w-full cursor-pointer items-center justify-between rounded-[10px] bg-primary-gray-100 px-5 py-[10.5px]"
      >
        <p className="text-sm leading-[1.7] text-primary-gray-500">{selected}</p>
        <Caret width={7} height={4} />
      </button>
      {view && (
        <>
          <div className="fixed bottom-0 left-0 right-0 top-0" onClick={toggleDropdown} />
          <ul className="absolute mt-2 grid w-full gap-[5px] rounded-[10px] bg-white px-1 py-[6px] shadow-custom-shadow">
            {sortValue.map(sort => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <li
                key={sort.id}
                onClick={onClickSort(sort.id)}
                className="cursor-pointer px-4 py-[6px] text-sm leading-[1.7] text-primary-gray-500 hover:bg-primary-green-100"
              >
                {sort.text}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Dropdown;
