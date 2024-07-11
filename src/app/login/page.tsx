"use client";

import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

const Login = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
    // 여기에 로그인 로직을 추가하세요
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center">로그인</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <div className="mb-4">
              <label className="block mb-2" htmlFor="email">
                이메일
              </label>
              <div className="h-20">
                {" "}
                {/* 입력 필드와 에러 메시지를 위한 고정 높이 컨테이너 */}
                <input
                  type="email"
                  placeholder="이메일"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  {...register("email", {
                    required: "이메일은 필수입니다",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "이메일 형식이 올바르지 않습니다",
                    },
                  })}
                />
                <div className="h-5 mt-1">
                  {" "}
                  {/* 에러 메시지를 위한 고정 높이 공간 */}
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {String(errors.email.message)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="password">
                비밀번호
              </label>
              <div className="h-20">
                {" "}
                {/* 입력 필드와 에러 메시지를 위한 고정 높이 컨테이너 */}
                <input
                  type="password"
                  placeholder="비밀번호"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  {...register("password", {
                    required: "비밀번호는 필수입니다",
                    minLength: {
                      value: 6,
                      message: "비밀번호는 최소 6자 이상이어야 합니다",
                    },
                  })}
                />
                <div className="h-5 mt-1">
                  {" "}
                  {/* 에러 메시지를 위한 고정 높이 공간 */}
                  {errors.password && (
                    <span className="text-red-500 text-sm">
                      {String(errors.password.message)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                로그인
              </button>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                비밀번호를 잊으셨나요?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;