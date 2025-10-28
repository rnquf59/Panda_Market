"use client";

import { authAPI } from "@/api/auth";
import Button from "@/components/ui/Button";
import { SignupFormData, signupSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const emailValue = watch("email");
  const nicknameValue = watch("nickname");
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const onSubmit = async (data: SignupFormData) => {
    try {
      await authAPI.signup(data);
      toast.success("회원가입이 완료되었습니다. 로그인해주세요.");
      router.push("/auth/login");
    } catch (error: unknown) {
      console.error("회원가입 실패:", error);
      const errorMessage =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "회원가입 중 오류가 발생했습니다."
          : "회원가입 중 오류가 발생했습니다.";
      toast.error(errorMessage);
    }
  };

  const handleSocialLogin = (provier: "google" | "kakao") => {
    console.log(`${provier} 로그인`);
  };

  return (
    <div className="min-h-screen bg-white px-4 pt-20 md:pt-[190px] lg:pt-[231px]">
      <div className="max-w-[400px] md:max-w-[640px] mx-auto">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo/panda_logo.png"
            alt="판다마켓"
            width={198}
            height={66}
            className="md:w-[396px] md:h-[132px]"
            priority
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 md:gap-6"
        >
          <div>
            <label className="block text-md font-bold text-gray-800 mb-2">
              이메일
            </label>
            <input
              type="email"
              {...register("email")}
              className={`w-full px-6 py-[15px] text-lg font-normal text-gray-800 bg-gray-100 rounded-[12px] focus:outline-none autofill:bg-gray-100 ${
                errors.email
                  ? "border border-error"
                  : emailValue
                  ? "border border-primary-100"
                  : "border-none"
              }`}
              placeholder="이메일을 입력해주세요"
            />
            {errors.email && (
              <p className="text-error text-md mt-2 ml-4">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-md font-bold text-gray-800 mb-2">
              닉네임
            </label>
            <input
              type="text"
              {...register("nickname")}
              className={`w-full px-6 py-[15px] text-lg font-normal text-gray-800 bg-gray-100 rounded-[12px] focus:outline-none autofill:bg-gray-100 ${
                errors.nickname
                  ? "border border-error"
                  : nicknameValue
                  ? "border border-primary-100"
                  : "border-none"
              }`}
              placeholder="닉네임을 입력해주세요"
            />
            {errors.nickname && (
              <p className="text-error text-md mt-2 ml-4">
                {errors.nickname.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-md font-bold text-gray-800 mb-2">
              비밀번호
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`w-full px-6 py-[15px] text-lg font-normal text-gray-800 bg-gray-100 rounded-[12px] focus:outline-none autofill:bg-gray-100 ${
                  errors.password
                    ? "border border-error"
                    : passwordValue
                    ? "border border-primary-100"
                    : "border-none"
                }`}
                placeholder="비밀번호를 입력해주세요"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Image
                  src={
                    showPassword
                      ? "/icon/ic_eyes-open.png"
                      : "/icon/ic_eyes-close.png"
                  }
                  alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                  width={24}
                  height={24}
                />
              </button>
            </div>
            {errors.password && (
              <p className="text-error text-md mt-2 ml-4">
                {errors.password?.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-md font-bold text-gray-800 mb-2">
              비밀번호 확인
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className={`w-full px-6 py-[15px] text-lg font-normal text-gray-800 bg-gray-100 rounded-[12px] focus:outline-none autofill:bg-gray-100 ${
                  errors.confirmPassword
                    ? "border border-error"
                    : confirmPasswordValue
                    ? "border border-primary-100"
                    : "border-none"
                }`}
                placeholder="비밀번호를 입력해주세요"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Image
                  src={
                    showConfirmPassword
                      ? "/icon/ic_eyes-open.png"
                      : "/icon/ic_eyes-close.png"
                  }
                  alt={
                    showConfirmPassword ? "비밀번호 숨기기" : "비밀번호 보기"
                  }
                  width={24}
                  height={24}
                />
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-error text-md mt-2 ml-4">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            disabled={!isValid || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "회원가입중..." : "회원가입"}
          </Button>
        </form>

        <div className="bg-[#E6F2FF] rounded-lg px-[23px] py-4 flex items-center justify-between mt-4 md:mt-6">
          <span className="text-md font-medium text-gray-800">
            간편 로그인하기
          </span>
          <div className="flex gap-4">
            <button
              onClick={() => handleSocialLogin("google")}
              className="cursor-pointer"
            >
              <Image
                src="/icon/ic_google.png"
                alt="Google 로그인"
                width={42}
                height={42}
              />
            </button>
            <button
              onClick={() => handleSocialLogin("google")}
              className="cursor-pointer"
            >
              <Image
                src="/icon/ic_kakao.png"
                alt="Kakao 로그인"
                width={42}
                height={42}
              />
            </button>
          </div>
        </div>

        <div className="text-center mt-4 md:mt-6">
          <p className="text-md font-medium text-gray-800">
            이미 회원이신가요?
            <Link
              href="auth/login"
              className="text-[#3182F6] underline hover:no-underline"
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
