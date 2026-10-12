export const projectMedia: Record<
  string,
  {
    heading: string;
    description: string;
    items: { src: string; alt: string; width: number; height: number; caption: string }[];
    video?: {
      src: string;
      poster: string;
      captions: string;
      width: number;
      height: number;
      alt: string;
      caption: string;
    };
  }
> = {
  ara: {
    heading: "대화의 다음 단계도 같은 공간에서",
    description:
      "결과를 보고 끝내는 대신, 직접 편집하고 다음 작업으로 이어가는 경험을 함께 만듭니다.",
    items: [
      {
        caption: "원본 앱을 가상 데이터로 실행한 화면",
        src: "/images/ara-editor.webp",
        alt: "원본 ara 앱에서 가상 문서를 편집하는 도화지 화면",
        width: 1440,
        height: 900,
      },
    ],
  },
  dipull: {
    heading: "학교의 하루에 가까운 화면",
    description: "기상송부터 세탁 예약까지, 학생이 직접 겪는 일상의 불편을 하나씩 연결했습니다.",
    items: [
      {
        caption: "원본 앱을 가상 데이터로 실행한 화면",
        src: "/images/dipull-home.webp",
        alt: "가상 생활 정보를 넣어 실행한 원본 Dipull 홈 화면",
        width: 390,
        height: 844,
      },
      {
        caption: "원본 앱을 가상 데이터로 실행한 화면",
        src: "/images/dipull-laundry.webp",
        alt: "가상 기기와 예약 정보를 넣어 실행한 원본 Dipull 세탁 예약 화면",
        width: 390,
        height: 844,
      },
      {
        caption: "원본 앱을 가상 데이터로 실행한 화면",
        src: "/images/dipull-wakeup.webp",
        alt: "가상 노래와 투표 정보를 넣어 실행한 원본 Dipull 기상송 신청 화면",
        width: 390,
        height: 844,
      },
    ],
  },
};
