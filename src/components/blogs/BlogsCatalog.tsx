import React from "react";

type Props = {
  variant?: "grid" | "list";
  className?: string;
  items?: React.ReactNode[];
};

const BlogsCatalog = (props: Props) => {
  const { variant = "grid", className = "", items } = props;

  if (variant === "grid")
    return <div className={`w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${className}`}>{items}</div>;
  
  return <div className={`flex flex-col ${className}`}>{items}</div>;
};

export default BlogsCatalog;
