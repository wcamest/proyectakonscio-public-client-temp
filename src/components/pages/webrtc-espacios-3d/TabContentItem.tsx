import React from "react";

type Props = {
  icon: React.JSX.Element;
  title: string;
  description: string;
};

const TabContentItem = (props: Props) => {
  const { icon, title, description } = props;

  return (
    <div className="w-full lg:w-fit flex overflow-hidden border border-solid border-neutral-400 rounded shadow">
      <div className="w-6 lg:w-12 aspect-square flex justify-center items-center">
        {icon}
      </div>
      <div className="w-full flex flex-col border-l border-solid border-l-neutral-400">
        <span className="font-bold px-2 py-1 text-xs lg:text-base bg-neutral-300 text-neutral-700 border-b border-solid border-b-neutral-400">{title}</span>
        <span className="text-xs lg:text-base px-2 py-1">{description}</span>
      </div>
    </div>
  );
};

export default TabContentItem;