"use client";

import { useAtomValue } from "jotai";
import React from "react";

import { dynamicSizeAtom, headerHeightAtom } from "@front/utils/states";

const greetings = [
  "안녕하세요!",      // 한국어
  "Hello!",          // 영어
  "こんにちは！",       // 일본어
  "你好！",           // 중국어 (간체)
  "您好！",           // 중국어 (정체)
  "Hola!",           // 스페인어
  "Bonjour !",       // 프랑스어
  "Hallo!",          // 독일어
  "Ciao!",           // 이탈리아어
  "Olá!",            // 포르투갈어
  "Здравствуйте!",   // 러시아어
  "नमस्ते!",         // 힌디어
  "سلام!",           // 아랍어
  "Merhaba!",        // 터키어
  "Xin chào!",       // 베트남어
  "Sawubona!",       // 줄루어
  "Halo!",           // 인도네시아어
  "Hej!",            // 스웨덴어
  "Selam!",          // 암하라어
  "Shalom!",         // 히브리어
  "Szia!",           // 헝가리어
  "Hallo!",          // 네덜란드어
  "Kamusta!",        // 타갈로그어 (필리핀)
  "Sawa dee!",       // 태국어
  "Salve!",          // 라틴어
  "Habari!",         // 스와힐리어
];

const Home = () => {
  const dynamicSize = useAtomValue(dynamicSizeAtom);
  const headerHeight = useAtomValue(headerHeightAtom);
  const [greetId, setGreetId] = React.useState(0);

  React.useEffect(() => {
    let interval = setInterval(() => {
      setGreetId((prev) => (prev + 1) % greetings.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div
        className="px-10 relative flex flex-col items-start justify-start"
        style={{ ...dynamicSize }}
      >
        <div className="h-full w-full flex flex-col items-start justify-between gap-16 py-20">
          <div />
          <div />
          <div className="flex flex-row items-center gap-10">
            <button>
              <div className="flex flex-col items-start gap-1">
                <p className="text-5xl font-extralight">+200</p>
                <p>프로젝트 서비스</p>
              </div>
            </button>
            <button>
              <div className="flex flex-col items-start gap-1">
                <p className="text-5xl font-extralight">+5</p>
                <p>관련 활동 경험</p>
              </div>
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-9xl font-extralight">{greetings[greetId]}</p>
            <p className="text-2xl">— 행복한 개발자, 최재민입니다!</p>
          </div>
          <div />
          <div />
          <button
            className="flex flex-row items-center justify-center gap-2"
            onClick={() => {
              const _this = document.getElementById("about");
              if (!_this) return;
              window.scrollTo({
                top: _this.offsetTop - headerHeight,
                behavior: "smooth",
              });
            }}
          >
            <p>Scroll Down</p>
            <svg className="w-3 h-3" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="fill-stone-700 dark:fill-stone-50" d="M6.50201 12.4747V1.09766C6.50201 0.884823 6.57384 0.706656 6.71751 0.563156C6.86101 0.419489 7.03917 0.347656 7.25201 0.347656C7.46484 0.347656 7.64301 0.419489 7.78651 0.563156C7.93017 0.706656 8.00201 0.884823 8.00201 1.09766V12.4747L13.1713 7.30541C13.3199 7.15674 13.4939 7.08332 13.6933 7.08516C13.8926 7.08716 14.0698 7.16566 14.225 7.32066C14.3698 7.47582 14.4448 7.65149 14.45 7.84766C14.4552 8.04382 14.3802 8.21949 14.225 8.37466L7.88476 14.7149C7.79109 14.8086 7.69234 14.8746 7.58851 14.9129C7.48467 14.9514 7.37251 14.9707 7.25201 14.9707C7.13151 14.9707 7.01934 14.9514 6.91551 14.9129C6.81167 14.8746 6.71293 14.8086 6.61926 14.7149L0.279008 8.37466C0.140508 8.23616 0.0696745 8.06466 0.0665079 7.86016C0.0633412 7.65566 0.134175 7.47582 0.279008 7.32066C0.434175 7.16566 0.612341 7.08816 0.813508 7.08816C1.01484 7.08816 1.19309 7.16566 1.34826 7.32066L6.50201 12.4747Z" />
            </svg>
          </button>
        </div>
        <img
          src="/jeamxn.png"
          alt="Jeamxn Logo"
          className="grayscale-100 w-4xl absolute bottom-0 right-0"
        />
      </div>
      
      <div
        className="w-full bg-stone-200 dark:bg-stone-300 py-20 px-12 flex flex-col gap-2 items-start justify-start"
        id="about"
      >
        <p className="text-4xl">About Me</p>
        <p className="text-xl">웹 서비스를 통해 더 많은 사람들을 행복하게 만들고 싶은 개발자</p>
        <p className="break-words">
          기술은 결국 <b>누군가의 불편을 덜어주고, 삶을 조금 더 나아지게 해주는 도구</b>라는 생각이 들어요.<br />
          그래서 저는 친환경 플랫폼 ZERO, 전화 소통 훈련 서비스 띠리링, 그리고 수백 명이 사용하는 교내 인트라넷 Dipull 같은 프로젝트를 만들며, <b>기술이 어떻게 사람을 도울 수 있을까</b>를 계속 고민해왔어요.<br />
          성능 개선, 사용자 경험, 보안, 커뮤니티 운영까지. 결국엔 사람을 위한 기술이어야 의미가 있다고 느껴요.<br />
          앞으로도 <b>조금 더 따뜻한 웹 서비스, 조금 더 웃음이 남는 경험</b>을 만들고 싶어요.
        </p>
      </div>

      
      <div className="px-12 py-20 flex flex-col items-start justify-start gap-12" id="awards">
        <p className="text-4xl text-center w-full">List of Awards</p>
        <div className="flex flex-col gap-8 w-full">

          <div className="w-full flex flex-row items-center justify-between gap-6">
            <div className="flex flex-row items-center justify-start gap-6">
              {/* <img alt="Award Icon" src="/award.png" className="w-14 h-14 bg-stone-200 rounded-2xl" /> */}
              <div className="flex flex-col gap-2">
                <p className="text-xl">제2회 청소년 메이커 경진대회 : YOUTH MAKER 최우수상</p>
                <p className="opacity-65">— 2023. 10. 14.</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-start">
              <div className="flex flex-row gap-2 items-center justify-center">
                <p className="opacity-50">주최</p>
                <p className="">시립수서청소년센터, 서울디지털재단</p>
              </div>
              <div className="flex flex-row gap-2 items-center justify-center">
                <p className="opacity-50">주관</p>
                <p className="">고려대학교 KU-3DS</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-start">
              <p className="opacity-50">Organization</p>
              <button>
                <div className="flex flex-row gap-3 items-center justify-center">
                  <img alt="Award Icon" src="/award.png" className="w-8 h-8 bg-stone-200 rounded-lg" />
                  <p className="">LUNA</p>
                </div>
              </button>
            </div>
            {/* <div /> */}
            <div />
          </div>
        </div>
      </div>


      <div
        className="w-full bg-stone-200 dark:bg-stone-700 py-20 px-12 flex flex-col gap-4 items-start justify-start"
        id="about"
      >
        <div className="flex flex-col gap-2 w-full">
          <p className="text-4xl">Development Philosophy</p>
          <p className="text-xl">저는 이렇게 생각하고 개발해요</p>
        </div>
        <div className="w-full flex flex-col items-start justify-start gap-6">
          <div className="bg-stone-50 dark:bg-stone-900 rounded-2xl p-6 w-full flex flex-col gap-2">
            <p className="text-xl">1. <b>사용자에게 자연스러운 흐름</b>을 추구해요</p>
            <div>
              <p>기능보다 먼저 보는 건, 사용자가 어디서 불편을 느낄지예요.</p>
              <p>디자인 그대로 구현하는 건 기본이고, 그 안에서 복잡함을 걷어내고 누구나 쉽게 쓸 수 있게 만드는 걸 중요하게 생각해요.</p>
              <p>그래서 저는 늘, <b>설명하지 않아도 쓸 수 있는 서비스</b>를 만드는 걸 목표로 해요.</p>
            </div>
          </div>
          <div className="bg-stone-50 dark:bg-stone-900 rounded-2xl p-6 w-full flex flex-col gap-2">
            <p className="text-xl">2. <b>느껴지는 속도</b>를 중요하게 생각해요</p>
            <div>
              <p>기술 스택이나 구조보다 먼저, <b>사용자가 실제로 체감하는 쾌적함</b>에 집중해요.</p>
              <p>그래서 불필요한 API 호출을 줄이고, 캐싱 전략을 조정하고, 페이지 로딩 시간을 직접 줄이는 데 힘을 써요.</p>
              <p>빠른 웹은 단순한 성능이 아니라, <b>유저의 시간에 대한 예의</b>라고 생각해요.</p>
            </div>
          </div>
          <div className="bg-stone-50 dark:bg-stone-900 rounded-2xl p-6 w-full flex flex-col gap-2">
            <p className="text-xl">3. <b>불필요한 고민을 줄이는 구조</b>를 추구해요</p>
            <div>
              <p>Next.js 프로젝트를 짤 때는, <b>읽기 쉽고 확장하기 편한 구조</b>를 먼저 고민해요.</p>
              <p>App Router 도입과 폴더 구조 정리를 통해 컴포넌트 흐름을 명확히 하고, API와 UI 레이어를 구분해 유지보수를 편하게 만들어요.</p>
              <p><b>어디에 코드를 넣을지 고민하지 않아도 되는 구조</b>, 그게 제가 추구하는 편의성이에요.</p>
            </div>
          </div>
        </div>
        
        
      </div>

      <div className="px-12 py-20 flex flex-col items-start justify-start gap-12" id="projects">
        <p className="text-4xl text-center w-full">Lastes Projects</p>

      </div>




    </div>
  );
};

export default Home;