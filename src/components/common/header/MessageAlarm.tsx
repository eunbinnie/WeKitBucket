"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import useToggle from "@/hooks/useToggle";
import { useAlarm } from "@/context/AlarmContext";
import Alarm from "public/icons/alarmIcon.svg";
import NoAlarmMessage from "./NoAlarmMessage";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function MessageAlarm({
  toggle,
  oppositeToggle,
  setToggle,
  setOppositeToggle,
}: {
  toggle: boolean;
  oppositeToggle: boolean;
  setToggle: () => void;
  setOppositeToggle: () => void;
}) {
  // const { alarmMessages, getAlarmMessages, removeAlarmMessage, removeAllMessages } = useAlarm();

  const { getAlarmMessages, count, alarmMessages, removeAlarmMessage, removeAllMessages } = useAlarm();
  const [isShowCount, setIsShowCount] = useToggle(true);
  const [hasMore, setHasMore] = useToggle(true);
  const { ref, inView } = useInView();

  const closeToggle = () => {
    if (toggle) {
      setToggle();
      if (isShowCount) setIsShowCount();
    }
  };

  const toggleDropdown = () => {
    setToggle();
    if (oppositeToggle) setOppositeToggle();
  };

  useEffect(() => {
    if (alarmMessages.length < 10) getAlarmMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inView) {
      getAlarmMessages();
    } else if (alarmMessages.length === count) setHasMore();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        onBlur={closeToggle}
        aria-label="Alarm Button"
        className="relative flex"
        name="alarmModal"
      >
        {isShowCount && count > 0 && (
          <div className="absolute bottom-auto top-[1%] h-[16px] w-[16px] rounded-[50%] bg-[red] text-center text-[8px] leading-[16px] text-[white]">
            {count}
          </div>
        )}
        <Alarm width={24} height={24} />
      </button>
      {toggle && (
        <ul
          style={{ zIndex: 3 }}
          role="presentation"
          className="absolute right-[-170%] top-[150%] flex w-[368px] max-w-[30em] flex-col gap-y-5 rounded-2xl bg-primary-gray-100 px-[1.5em] py-[1.125em] text-[1.25em] shadow-[0_0.125rem_0.5rem_rgba(0,0,0,0.3),0_0.0625rem_0.125rem_rgba(0,0,0,0.2)] before:absolute before:bottom-full before:right-[60px] before:h-0 before:w-0 before:border-[0.75rem] before:border-solid before:border-transparent before:border-b-primary-gray-100 before:border-t-[none] before:drop-shadow-[0_-0.0625rem_0.0625rem_rgba(0,0,0,0.1)]"
          onMouseDown={e => {
            e.preventDefault();
          }}
        >
          <div className="space-between sticky top-0 flex pb-[10px]">
            {/* <h3 className="flex flex-1 justify-start text-xl font-bold leading-7 text-primary-black-200">{`알림 ${count}개`}</h3> */}
            <h3 className="flex flex-1 justify-start text-xl font-bold leading-7 text-primary-black-200">{`알림 ${count}개`}</h3>
            <button onClickCapture={closeToggle} className="text-xl font-bold leading-7 text-primary-black-200">
              X
            </button>
          </div>
          <div className="flex">
            <button onClick={removeAllMessages}>전체 삭제</button>
          </div>
          {count > 0 ? (
            <div className="[&::-webkit-scrollbar]:none flex max-h-[400px] w-[3] flex-col gap-y-5 overflow-y-scroll scroll-smooth px-[5px] py-[5px]">
              {alarmMessages.map(m => (
                <li
                  key={m.id}
                  className="flex flex-col rounded-[8px] bg-white p-5 shadow-[0_0.125rem_0.5rem_rgba(0,0,0,0.3),0_0.0625rem_0.125rem_rgba(0,0,0,0.2)]"
                >
                  <div className="flex justify-between">
                    <h2 className="relative top-[-4px] items-stretch justify-start text-4xl leading-4 text-primary-red-200">
                      .
                    </h2>
                    <button
                      onClick={async () => {
                        await removeAlarmMessage(m.id);
                      }}
                      className="flex justify-end text-primary-gray-900"
                      name="delete"
                    >
                      X
                    </button>
                  </div>
                  <div className="flex flex-col items-start justify-stretch text-left">
                    <h3 className="flex max-w-[250px] flex-1 text-sm font-normal leading-6 text-primary-black-100">
                      {m.content}
                    </h3>
                    <h3 className="text-sm font-normal leading-6 text-primary-black-100 text-primary-gray-800">
                      {dayjs(m.createdAt).fromNow(false)}
                    </h3>
                  </div>
                </li>
              ))}
              {hasMore && <div ref={ref}>loading ...</div>}
            </div>
          ) : (
            <NoAlarmMessage />
          )}
        </ul>
      )}
    </div>
  );
}
