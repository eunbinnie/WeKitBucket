"use client";

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import CloseBtn from "public/icons/close.svg";
import Modal, { IModal } from "./Modal";

interface ICommonModal extends IModal {
  spacing?: string;
}

/**
 * @active 모달 노출 여부를 결정하는 boolean값 (state로 관리)
 * @close active값을 다루는 함수 (모달 열기 버튼, 닫기 버튼 다루는 함수)
 */
function CommonModal({ children, close, spacing = "40px", ...rest }: ICommonModal) {
  return (
    <Modal close={close} {...rest}>
      <div
        className="mx-auto my-0 flex max-w-[395px] flex-col items-center justify-center gap-[10px] rounded-[10px] bg-white p-5"
        style={{ width: `calc(100% - ${spacing})` }}
      >
        <div onClick={close} className="ml-auto flex h-5 w-5 cursor-pointer items-center justify-center p-[4.71px]">
          <CloseBtn />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </Modal>
  );
}

export default CommonModal;
