export const projectMedia: Record<
  string,
  {
    heading: string;
    description: string;
    items: { src: string; alt: string; width: number; height: number }[];
  }
> = {
  ara: {
    heading: "대화의 다음 단계도 같은 공간에서",
    description:
      "결과를 보고 끝내는 대신, 직접 편집하고 다음 작업으로 이어가는 경험을 함께 만듭니다.",
    items: [
      {
        src: "/images/ara-editor.webp",
        alt: "가상 문서를 편집하는 ara 제품 예시",
        width: 1308,
        height: 1086,
      },
    ],
  },
  dipull: {
    heading: "학교의 하루에 가까운 화면",
    description: "기상송부터 세탁 예약까지, 학생이 직접 겪는 일상의 불편을 하나씩 연결했습니다.",
    items: [
      {
        src: "/images/dipull-home.webp",
        alt: "가상 학교의 Dipull 홈 예시",
        width: 390,
        height: 790,
      },
      {
        src: "/images/dipull-laundry.webp",
        alt: "가상 학교의 세탁 예약 화면 예시",
        width: 390,
        height: 790,
      },
      {
        src: "/images/dipull-wakeup.webp",
        alt: "가상 학교의 기상송 신청 화면 예시",
        width: 390,
        height: 790,
      },
    ],
  },
};
