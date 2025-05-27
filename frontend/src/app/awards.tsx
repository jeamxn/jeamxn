import React from "react";

import { Award } from "@common/types/db";

const Awards = ({
  awards
}: {
  awards: Award[];
}) => { 
  return (
    <div className="px-12 py-20 flex flex-col items-start justify-start gap-12" id="awards">
      <p className="text-4xl text-center w-full">List of Awards</p>
      <table className="w-full border-0 border-separate border-spacing-5">
        <tbody>
          {
            awards.map((award, index) => (
              <tr key={index}>
                <td>
                  <div className="flex flex-col items-start justify-start h-14">
                    <p className="opacity-50">{award.when}</p>
                  </div>
                </td>
                <td>
                  <div className="flex flex-row items-center justify-start gap-5">
                    <img alt="Award Icon" src={award.icon} className="w-14 h-14 bg-stone-200 rounded-2xl grayscale-100" />
                    <div className="flex flex-col gap-2">
                      <p className="text-xl">{award.name}</p>
                      <p className="opacity-65">— {award.period}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col gap-2 items-start">
                    <div className="flex flex-row gap-2 items-center justify-center">
                      <p className="opacity-50">주최</p>
                      <p className="">{award.host}</p>
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-center">
                      <p className="opacity-50">주관</p>
                      <p className="">{award.organizer}</p>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Awards;