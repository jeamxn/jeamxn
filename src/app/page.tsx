/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React from "react";

const list = [
  {
    title: "디미고인 풀 서비스",
    description: "개발 및 관리 (2023 ~ )",
    link: "https://github.com/jeamxn/dimigoin-pull-service",
  },
  {
    title: "디미고 통합 로그인",
    description: "개발 및 관리 (2024 ~ )",
    link: "https://github.com/jeamxn/dimigoin-oauth",
  }
];

const links = [
  {
    title: "GitHub",
    link: "https://github.com/jeamxn",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_476_120)">
          <path className="fill-text" d="M6.79297 15.5234C6.79297 15.6016 6.70312 15.6641 6.58984 15.6641C6.46094 15.6758 6.37109 15.6133 6.37109 15.5234C6.37109 15.4453 6.46094 15.3828 6.57422 15.3828C6.69141 15.3711 6.79297 15.4336 6.79297 15.5234ZM5.57813 15.3477C5.55078 15.4258 5.62891 15.5156 5.74609 15.5391C5.84766 15.5781 5.96484 15.5391 5.98828 15.4609C6.01172 15.3828 5.9375 15.293 5.82031 15.2578C5.71875 15.2305 5.60547 15.2695 5.57813 15.3477ZM7.30469 15.2813C7.19141 15.3086 7.11328 15.3828 7.125 15.4727C7.13672 15.5508 7.23828 15.6016 7.35547 15.5742C7.46875 15.5469 7.54687 15.4727 7.53516 15.3945C7.52344 15.3203 7.41797 15.2695 7.30469 15.2813ZM9.875 0.3125C4.45703 0.3125 0.3125 4.42578 0.3125 9.84375C0.3125 14.1758 3.03906 17.8828 6.93359 19.1875C7.43359 19.2773 7.60938 18.9688 7.60938 18.7148C7.60938 18.4727 7.59766 17.1367 7.59766 16.3164C7.59766 16.3164 4.86328 16.9023 4.28906 15.1523C4.28906 15.1523 3.84375 14.0156 3.20312 13.7227C3.20312 13.7227 2.30859 13.1094 3.26562 13.1211C3.26562 13.1211 4.23828 13.1992 4.77344 14.1289C5.62891 15.6367 7.0625 15.2031 7.62109 14.9453C7.71094 14.3203 7.96484 13.8867 8.24609 13.6289C6.0625 13.3867 3.85938 13.0703 3.85938 9.3125C3.85938 8.23828 4.15625 7.69922 4.78125 7.01172C4.67969 6.75781 4.34766 5.71094 4.88281 4.35937C5.69922 4.10547 7.57812 5.41406 7.57812 5.41406C8.35938 5.19531 9.19922 5.08203 10.0313 5.08203C10.8633 5.08203 11.7031 5.19531 12.4844 5.41406C12.4844 5.41406 14.3633 4.10156 15.1797 4.35937C15.7148 5.71484 15.3828 6.75781 15.2813 7.01172C15.9063 7.70313 16.2891 8.24219 16.2891 9.3125C16.2891 13.082 13.9883 13.3828 11.8047 13.6289C12.1641 13.9375 12.4688 14.5234 12.4688 15.4414C12.4688 16.7578 12.457 18.3867 12.457 18.707C12.457 18.9609 12.6367 19.2695 13.1328 19.1797C17.0391 17.8828 19.6875 14.1758 19.6875 9.84375C19.6875 4.42578 15.293 0.3125 9.875 0.3125ZM4.10937 13.7852C4.05859 13.8242 4.07031 13.9141 4.13672 13.9883C4.19922 14.0508 4.28906 14.0781 4.33984 14.0273C4.39062 13.9883 4.37891 13.8984 4.3125 13.8242C4.25 13.7617 4.16016 13.7344 4.10937 13.7852ZM3.6875 13.4687C3.66016 13.5195 3.69922 13.582 3.77734 13.6211C3.83984 13.6602 3.91797 13.6484 3.94531 13.5938C3.97266 13.543 3.93359 13.4805 3.85547 13.4414C3.77734 13.418 3.71484 13.4297 3.6875 13.4687ZM4.95313 14.8594C4.89063 14.9102 4.91406 15.0273 5.00391 15.1016C5.09375 15.1914 5.20703 15.2031 5.25781 15.1406C5.30859 15.0898 5.28516 14.9727 5.20703 14.8984C5.12109 14.8086 5.00391 14.7969 4.95313 14.8594ZM4.50781 14.2852C4.44531 14.3242 4.44531 14.4258 4.50781 14.5156C4.57031 14.6055 4.67578 14.6445 4.72656 14.6055C4.78906 14.5547 4.78906 14.4531 4.72656 14.3633C4.67188 14.2734 4.57031 14.2344 4.50781 14.2852Z" />
        </g>
        <defs>
          <clipPath id="clip0_476_120">
            <rect width="20" height="20" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    )
  },
  {
    title: "Instagram",
    link: "https://www.instagram.com/jeamxn",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="fill-text" d="M10.0039 5.50781C7.51953 5.50781 5.51562 7.51172 5.51562 9.99609C5.51562 12.4805 7.51953 14.4844 10.0039 14.4844C12.4883 14.4844 14.4922 12.4805 14.4922 9.99609C14.4922 7.51172 12.4883 5.50781 10.0039 5.50781ZM10.0039 12.9141C8.39844 12.9141 7.08594 11.6055 7.08594 9.99609C7.08594 8.38672 8.39453 7.07812 10.0039 7.07812C11.6133 7.07812 12.9219 8.38672 12.9219 9.99609C12.9219 11.6055 11.6094 12.9141 10.0039 12.9141ZM15.7227 5.32422C15.7227 5.90625 15.2539 6.37109 14.6758 6.37109C14.0938 6.37109 13.6289 5.90234 13.6289 5.32422C13.6289 4.74609 14.0977 4.27734 14.6758 4.27734C15.2539 4.27734 15.7227 4.74609 15.7227 5.32422ZM18.6953 6.38672C18.6289 4.98438 18.3086 3.74219 17.2813 2.71875C16.2578 1.69531 15.0156 1.375 13.6133 1.30469C12.168 1.22266 7.83594 1.22266 6.39063 1.30469C4.99219 1.37109 3.75 1.69141 2.72266 2.71484C1.69531 3.73828 1.37891 4.98047 1.30859 6.38281C1.22656 7.82812 1.22656 12.1602 1.30859 13.6055C1.375 15.0078 1.69531 16.25 2.72266 17.2734C3.75 18.2969 4.98828 18.6172 6.39063 18.6875C7.83594 18.7695 12.168 18.7695 13.6133 18.6875C15.0156 18.6211 16.2578 18.3008 17.2813 17.2734C18.3047 16.25 18.625 15.0078 18.6953 13.6055C18.7773 12.1602 18.7773 7.83203 18.6953 6.38672ZM16.8281 15.1562C16.5234 15.9219 15.9336 16.5117 15.1641 16.8203C14.0117 17.2773 11.2773 17.1719 10.0039 17.1719C8.73047 17.1719 5.99219 17.2734 4.84375 16.8203C4.07812 16.5156 3.48828 15.9258 3.17969 15.1562C2.72266 14.0039 2.82813 11.2695 2.82813 9.99609C2.82813 8.72266 2.72656 5.98437 3.17969 4.83594C3.48438 4.07031 4.07422 3.48047 4.84375 3.17187C5.99609 2.71484 8.73047 2.82031 10.0039 2.82031C11.2773 2.82031 14.0156 2.71875 15.1641 3.17187C15.9297 3.47656 16.5195 4.06641 16.8281 4.83594C17.2852 5.98828 17.1797 8.72266 17.1797 9.99609C17.1797 11.2695 17.2852 14.0078 16.8281 15.1562Z"/>
      </svg>
    )
  },
  {
    title: "Email",
    link: "mailto:admin@chicken-moo.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_854_17" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
          <rect x="0.447754" y="0.453369" width="24" height="24" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_854_17)">
          <path className="fill-text" d="M13.4728 2.05332L21.4978 6.85332C21.7978 7.03665 22.0311 7.28665 22.1978 7.60332C22.3644 7.91999 22.4478 8.25332 22.4478 8.60332V19.4533C22.4478 20.0033 22.2519 20.4742 21.8603 20.8658C21.4686 21.2575 20.9978 21.4533 20.4478 21.4533H4.44775C3.89775 21.4533 3.42692 21.2575 3.03525 20.8658C2.64359 20.4742 2.44775 20.0033 2.44775 19.4533V8.60332C2.44775 8.25332 2.53109 7.91999 2.69775 7.60332C2.86442 7.28665 3.09775 7.03665 3.39775 6.85332L11.4228 2.05332C11.7394 1.86999 12.0811 1.77832 12.4478 1.77832C12.8144 1.77832 13.1561 1.86999 13.4728 2.05332ZM12.4478 13.1033L20.2478 8.45332L12.4478 3.80332L4.64775 8.45332L12.4478 13.1033ZM11.4228 14.8283L4.44775 10.6533V19.4533H20.4478V10.6533L13.4728 14.8283C13.1561 15.0117 12.8144 15.1033 12.4478 15.1033C12.0811 15.1033 11.7394 15.0117 11.4228 14.8283Z" />
        </g>
      </svg>
    )
  }
];

const Home = () => {
  return (
    <main className="flex flex-row items-center justify-center h-full p-4 w-full z-50">
      <div className="w-full max-w-[40rem] aspect-[2/1] flex flex-col justify-stretch items-start h-max">
        <div className="flex flex-row gap-6 w-full">
          <div className="flex flex-col gap-1 items-start justify-start w-full">
            <p className="text-4xl font-bold">최재민</p>
            <p className="text-2xl text-text/40">Jeamin Choi</p>
            {/* <p className="text-xl text-text/40">It&apos;s fun when you try something that no one can do.</p> */}
            <p className="opacity-0">.</p>
            <p className="text-base text-text/40 font-medium">활동 내역</p>
            {
              list.map((item, index) => (
                <p key={index} className="text-base text-text/80">
                  -&nbsp;
                  <Link href={item.link} className="cursor-pointer underline" target="_blank">{item.title}</Link>
                  &nbsp;{item.description}
                </p>
              ))
            }
          </div>
          <Image src="/IMG_7765.JPG" alt="profile" width={160} height={160} className="rounded-full" />
        </div>
        <div className="h-full" />
        <div className="flex flex-row items-center justify-end w-full gap-2">
          <p className="mr-1">Links</p>
          {
            links.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="cursor-pointer p-2 -mx-2"
                target="_blank"
              >
                {item.icon}
              </Link>
            ))
          }
        </div>
      </div>
    </main>
  );
};

export default Home;