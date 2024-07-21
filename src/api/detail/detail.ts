import { DayData } from "@/types/detail";

export async function fetchDataFromAPI(date): Promise<DayData> {
  // 실제 API 호출 로직을 여기에 구현
  // 예시:
  // const res = await fetch(`https://your-api.com/meals/${date}`);
  // return res.json();

  // 임시 데이터 반환
  return {
    date,
    meals: [
      {
        name: "샐러드",
        nutrition: { calories: 200, protein: 10, carbs: 20, fat: 5 },
        image: "",
      },
      {
        name: "맥날",
        nutrition: { calories: 500 },
        image: "https://picsum.photos/200/300",
      },
      {
        name: "국밥",
        nutrition: { calories: 500 },
        image: "https://picsum.photos/200/300",
      },
    ],
  };
}
