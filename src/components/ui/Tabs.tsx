"use client";

import React, { useState } from "react";

type TabItem = {
  tab: React.ReactNode;
  content: React.ReactNode;
};

type Props = {
  tabs: TabItem[];
};

const Tabs = ({ tabs }: Props) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const effectiveSelectedTabIndex =
    tabs.length === 0 ? 0 : Math.min(selectedTabIndex, tabs.length - 1);
  const selectedTab = tabs[effectiveSelectedTabIndex];

  return (
    <div className="flex flex-col">
      <div
        role="tablist"
        aria-label="Pestañas"
        className="flex flex-col items-end overflow-auto lg:flex-row"
      >
        {tabs.map((tabItem, index) => {
          const isSelected = effectiveSelectedTabIndex === index;

          return (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`tab-panel-${index}`}
              id={`tab-${index}`}
              onClick={() => setSelectedTabIndex(index)}
              className={`h-fit w-full cursor-pointer select-none border border-solid border-neutral-400 p-2 text-left ${
                isSelected
                  ? "bg-blue-600 py-3 text-blue-50"
                  : "bg-neutral-200"
              }`}
            >
              {tabItem.tab}
            </button>
          );
        })}
      </div>

      <div
        id={`tab-panel-${effectiveSelectedTabIndex}`}
        role="tabpanel"
        aria-labelledby={`tab-${effectiveSelectedTabIndex}`}
        className="border border-solid border-neutral-400 p-2 lg:p-5"
      >
        {selectedTab?.content ?? null}
      </div>
    </div>
  );
};

export default Tabs;