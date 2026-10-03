"use client";

import { ListItemData } from "@/types/list";
import React, { useState } from "react";

type Props = {
  items: ListItemData[];
  selectedItem?: number;
  setSelectedItem?: (index: number) => void;
};

const List = (props: Props) => {
  const { items } = props;
  const [selectedItem, setSelectedItem] = useState(props.selectedItem ?? 0);

  return (
    <ul className="flex flex-col p-1 gap-1">
      {items.map((item: ListItemData, key: number) => {
        if (key === selectedItem)
          return (
            <li
              className="select-none flex gap-1 p-2 bg-blue-600 text-blue-50 rounded"
              key={key}
            >
              <i className={item.icon} />
              <span>{item.label}</span>
            </li>
          );
        return (
          <li
            className="select-none flex gap-1 p-2 hover:bg-neutral-200 cursor-pointer rounded"
            onClick={() => {
              setSelectedItem(key);
              props.setSelectedItem?.(key);
            }}
            key={key}
          >
            <i className={item.icon} />
            <span>{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
