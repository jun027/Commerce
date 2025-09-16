"use server";

import { IAttributes } from "oneentry/dist/base/utils";

import { fetchApiClient } from "@/lib/oneentry";

import { ISignUpData } from "oneentry/dist/auth-provider/authProvidersInterfaces";

function toErrorInfo(err: unknown): { message: string; statusCode?: number } {
  if (err instanceof Error) return { message: err.message };
  if (typeof err === "object" && err !== null) {
    const e = err as { message?: string; statusCode?: number };
    return { message: e.message ?? "Unknown error", statusCode: e.statusCode };
  }
  return { message: String(err) };
}

export const getSignupFormData = async (): Promise<IAttributes[]> => {
  try {
    const apiClient = await fetchApiClient();
    const response = await apiClient?.Forms.getFormByMarker("sign_up", "en_US");
    return (response?.attributes ?? []) as IAttributes[];
  } catch (error) {
    const { message } = toErrorInfo(error);
    console.error(message);
    throw new Error("Fetching form data failed.");
  }
};

export const handleSignupSubmit = async (inputValues: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const apiClient = await fetchApiClient();

    const data: ISignUpData = {
      formIdentifier: "sign_up",
      authData: [
        { marker: "email", value: inputValues.email },
        { marker: "password", value: inputValues.password },
      ],
      formData: [{ marker: "name", type: "string", value: inputValues.name }],
      notificationData: {
        email: inputValues.email,
        phonePush: ["+1234567890"],
        phoneSMS: "+1234567890",
      },
    };

    const value = await apiClient?.AuthProvider.signUp("email", data);
    return value;
  } catch (error) {
    const { message, statusCode } = toErrorInfo(error);
    console.error(message);

    if (statusCode === 400) {
      return { message };
    }

    throw new Error("Account Creation failed. Please try again later.");
  }
};
