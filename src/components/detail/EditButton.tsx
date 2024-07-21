"use client";

import { useRouter } from "next/navigation";

export default function EditButton({ date }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/edit/${date}`);
  };

  return (
    <button
      onClick={handleEdit}
      className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      수정하기
    </button>
  );
}
