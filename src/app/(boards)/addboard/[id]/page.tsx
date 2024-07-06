import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const AddBoardComponent = dynamic(() => import("../AddBoardComponent"), {
  ssr: false,
});

function AddBoardEditPage({ params }: { params: { id: string } }) {
  const articleId = parseInt(params.id, 10);

  return (
    <div className="mx-[20px] mt-[32px] flex flex-col justify-center">
      <main className="md-shadow-custom-all mx-auto w-full gap-3 md:w-[624px] md:gap-5 md:rounded-[10px] md:border-gray-300 md:px-[30px] md:pb-[30px] md:pt-[40px] md:shadow-custom-all xl:w-[1060px]">
        <AddBoardComponent articleId={articleId} />
      </main>
      <div className="center flex justify-center">
        <Link
          href="/boards"
          className="mb-[50px] mt-[32px] rounded-[10px] border border-primary-green-200 px-[45px] py-[10px] text-sm-regular-14 text-primary-green-200"
        >
          목록으로
        </Link>
      </div>
    </div>
  );
}

export default AddBoardEditPage;