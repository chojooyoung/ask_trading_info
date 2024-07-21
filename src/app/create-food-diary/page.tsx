"use client";
import React from "react";
import FoodEntryForm from "@/components/FoodEntryForm";
import { useRouter } from "next/navigation";

const CreateFoodEntryPage = () => {
  const router = useRouter();

  const handleSubmit = async (data) => {
    // 여기에 API 호출 로직을 구현합니다.
    console.log("Creating new food entry:", data);
    // API 호출 성공 후 다이어리 페이지로 리다이렉트
    router.push("/food-diary");
  };

  return (
    <div className="container mx-auto p-4">
      <FoodEntryForm mode="create" onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateFoodEntryPage;
