"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const router = useRouter();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="flex min-h-screen mt-7">
      <div className="w-full max-w-3xl mx-auto flex flex-col lg:flex-row p-3">
        <div>
          <div
            className="mb-8 lg:mb-12 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <ChevronLeft className="text-gray-500 h-6 w-6 sm:h-8 sm:w-8 border-2 rounded-full p-1" />
          </div>
          <div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6
         bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent pb-3"
            >
              {isSignUp ? "註冊" : "登入"}
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8">
              {isSignUp
                ? "立即加入 DemoStore，探索你最愛商品的獨家優惠！"
                : "歡迎回到 DemoStore！請登入以繼續你的購物旅程。"}
            </p>
          </div>
          <div className="mt-4 sm:mt-5 flex items-center justify-center">
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              {isSignUp ? "已經是會員嗎？" : "還不是會員嗎？"}
            </p>

            <Button
              variant="link"
              className="text-lg sm:text-xl lg:text-2xl text-gray-500 cursor-pointer"
              onClick={toggleForm}
            >
              {isSignUp ? "登入" : "註冊"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
