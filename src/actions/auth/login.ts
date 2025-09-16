"use server";

import { IAttributes } from "oneentry/dist/base/utils";

import { fetchApiClient } from "@/lib/oneentry";

import { cookies } from "next/headers";

import { redirect } from "next/navigation";

interface IErroredResponse {
  statusCode: number;
  message: string;
}

interface IAuthSuccess {
  userIdentifier: string;
  accessToken: string;
  refreshToken: string;
}

type AuthResponse = IAuthSuccess | IErroredResponse;

function getErrorInfo(err: unknown): { message: string; statusCode?: number } {
  if (err instanceof Error) return { message: err.message };
  if (typeof err === "object" && err !== null) {
    const e = err as { message?: string; statusCode?: number };
    return { message: e.message ?? "Unknown error", statusCode: e.statusCode };
  }
  return { message: String(err) };
}

export const getLoginFormData = async (): Promise<IAttributes[]> => {
  try {
    const apiClient = await fetchApiClient();
    const response = await apiClient?.Forms.getFormByMarker("sign_in", "en_US");
    return (response?.attributes ?? []) as IAttributes[];
  } catch (error) {
    const { message } = getErrorInfo(error);
    console.error(message);
    throw new Error("Fetch form data failed.");
  }
};

export const handleLoginSubmit = async (inputValues: {
  email: string;
  password: string;
}) => {
  try {
    const apiClient = await fetchApiClient();

    const data = {
      authData: [
        { marker: "email", value: inputValues.email },
        { marker: "password", value: inputValues.password },
      ],
    };

    const resp = (await apiClient?.AuthProvider.auth("email", data)) as
      | AuthResponse
      | undefined;

    if (!resp || "userIdentifier" in resp === false) {
      const error = (resp ?? { message: "Unknown error" }) as IErroredResponse;
      return { message: error.message };
    }

    await (
      await cookies()
    ).set("access_token", resp.accessToken, {
      maxAge: 60 * 60 * 24,
    });
    await (
      await cookies()
    ).set("refresh_token", resp.refreshToken, {
      maxAge: 60 * 60 * 24 * 7,
    });
  } catch (error) {
    const { message, statusCode } = getErrorInfo(error);
    console.error(message);
    if (statusCode === 401) return { message };
    throw new Error("Failed to login. Please try again");
  }

  redirect("/");
};
