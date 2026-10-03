import React, { PropsWithChildren } from "react";

type Props = {
  className?: string;
};

const Paper = (props: PropsWithChildren<Props>) => {
  const { className = "", children } = props;
  return (
    <div
      className={`overflow-hidden p-2 shadow rounded relative border border-solid border-neutral-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default Paper;
