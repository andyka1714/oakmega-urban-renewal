"use client";
import type { UrbanRenewalSite } from "../types/urbanRenewalSite";

const UrbanRenewalSiteList = ({ urbanRenewalSites }: { urbanRenewalSites: UrbanRenewalSite[]} ) => {
  return (
    <div className="w-full bg-gray-100 flex flex-col items-center p-4">
      <ul className="w-full max-w-screen-sm px-4 flex flex-col gap-2 max-h-[500px] overflow-y-auto">
        {urbanRenewalSites.map((site, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
          >
            <span className="text-gray-800 font-medium text-sm">{site.stop_name}</span>
            <span className="text-blue-500 font-semibold text-3xl">
              {site.distance}
              <span className="text-sm"> km</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UrbanRenewalSiteList;
