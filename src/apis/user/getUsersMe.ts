"use server";

import { IUser } from "@/types/user.type";
import fetchInstance from "@/utils/fetchInstance";
import { cookies } from "next/headers";

const getUsersMe = async () => {
  try {
    if (!cookies().get("refreshToken")) {
      return null;
    }

    const data = await fetchInstance<IUser>("users/me", {
      method: "GET",
    });
    return data;
  } catch (error) {
    if (cookies().get("refreshToken")) {
      console.log("401 Unauthorized - Refresh token only");
      throw new Error("401 Unauthorized");
    }
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message || "User data load failed");
    } else {
      throw new Error("User data load failed");
    }
  }
};

export default getUsersMe;
