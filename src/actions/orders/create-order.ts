"use server";

import { fetchApiClient } from "@/lib/oneentry";

import { cookies } from "next/headers";

import { IOrderData } from "oneentry/dist/orders/ordersInterfaces";

export default async function createOrder(
  orderData: IOrderData
): Promise<string> {
  const apiClient = await fetchApiClient();

  if (!apiClient) {
    throw new Error("Unable to retrieve API instance.");
  }

  const accessToken = (await cookies()).get("access_token")?.value;

  if (!accessToken) {
    throw new Error("Missing access token.");
  }

  try {
    const createOrder = await apiClient.Orders.setAccessToken(
      accessToken
    ).createOrder("orders", orderData);

    if (!createOrder?.id) {
      throw new Error("Order creation was unsuccessful.");
    }

    const paymentSession = await apiClient.Payments.setAccessToken(
      accessToken
    ).createSession(createOrder.id, "session");

    if (!paymentSession?.paymentUrl) {
      throw new Error("Failed to generate payment session URL.");
    }

    return paymentSession.paymentUrl;
  } catch (err) {
    console.error("Error during order and payment processing:", err);

    throw new Error(
      `Order or payment session creation failed. ${
        err instanceof Error ? err.message : "Unknown error occurred."
      }`
    );
  }
}
