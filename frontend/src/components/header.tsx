import React from "react";

import Logo from "./logo";

const Header = () => {
  return (
    <div className="px-10 py-6 flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-8">
        <Logo className="w-7 h-w-7" />
        <div className="flex flex-row items-center gap-6">
          <button className="cursor-pointer">
            <p>About me</p>
          </button>
          <button className="cursor-pointer">
            <p>Portfolio</p>
          </button>
        </div>
      </div>
      <button className="flex flex-row items-center gap-2 cursor-pointer">
        <p className="underline">Book A Call</p>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="fill-stone-700 dark:fill-stone-50" d="M11.0025 2.55961L1.66972 11.8829C1.53122 12.0212 1.35722 12.0888 1.14772 12.0856C0.938052 12.0824 0.763969 12.0116 0.625469 11.8731C0.487135 11.7346 0.417969 11.5622 0.417969 11.3559C0.417969 11.1495 0.487135 10.9771 0.625469 10.8386L9.94872 1.50586H1.75247C1.53997 1.50586 1.3618 1.43394 1.21797 1.29011C1.0743 1.14628 1.00247 0.968109 1.00247 0.755609C1.00247 0.542942 1.0743 0.364859 1.21797 0.221359C1.3618 0.0776926 1.53997 0.00585938 1.75247 0.00585938H11.5985C11.8546 0.00585938 12.0693 0.0924431 12.2425 0.26561C12.4158 0.438943 12.5025 0.65361 12.5025 0.90961V10.7559C12.5025 10.9684 12.4306 11.1464 12.2867 11.2901C12.1429 11.4339 11.9647 11.5059 11.7522 11.5059C11.5396 11.5059 11.3614 11.4339 11.2177 11.2901C11.0742 11.1464 11.0025 10.9684 11.0025 10.7559V2.55961Z" />
        </svg>
      </button>
    </div>
  );
};

export default Header;