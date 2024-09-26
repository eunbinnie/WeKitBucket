"use client";

import getIP from "@/apis/user/getIP";
import { ipInfo } from "@/types/user.type";
import React, { useEffect, useState } from "react";

export default function UserLocation() {
  const [info, setInfo] = useState<ipInfo | null>(null);
  const getLocale = async () => {
    const data = await getIP();
    setInfo(data);
  };
  useEffect(() => {
    getLocale();
  }, []);

  return (
    <div>
      {info && (
        <h3 className="text-sm font-normal leading-6 text-primary-gray-500">{`현재 접속 IP : ${info?.query}`}</h3>
      )}
    </div>
  );
}
