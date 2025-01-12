"use server";

import type { Metadata } from "next";
import getProfiles from "@/apis/profile/getProfiles";
import Input from "./_components/Input";
import ProfileList from "./_components/ProfileList";
import Pagination from "./_components/Pagination";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "WeKitBucket | 위키리스트",
  };
}

async function WikiList({ searchParams }: { searchParams: { keyword: string; number: number } }) {
  const { keyword, number } = searchParams;
  const pageSize = 3;
  const { list, totalCount } = await getProfiles({ page: number, name: keyword, pageSize });

  return (
    <div className="mx-auto max-w-[900px] px-5 py-20">
      <Input />
      <p className="mb-10 mt-4 h-[18.4px] text-sm-regular-14 font-medium text-primary-gray-400 md:mb-24 md:text-sm-regular xl:mb-14">
        {!keyword ? (
          ""
        ) : (
          <span>
            ”{keyword}”님을 총 <span className="text-primary-green-200">{totalCount}</span>명 찾았습니다.
          </span>
        )}
      </p>
      <ProfileList list={list} />
      <Pagination totalCount={totalCount} pageSize={pageSize} keyword={keyword} page={number} />
    </div>
  );
}

export default WikiList;
