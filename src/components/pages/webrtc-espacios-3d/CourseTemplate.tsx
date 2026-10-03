"use client";

import Button from "@/components/ui/Button";
import List from "@/components/ui/List";
import { ListItemData } from "@/types/list";
import React, { useState } from "react";

type Props = {
  items: ListItemData[];
};

const CourseTemplate = (props: Props) => {
  const [listVisible, setListVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const { items } = props;

  return (
    <div className="relative size-full flex flex-col overflow-hidden">
      <div className="flex lg:hidden p-2">
        <Button
          color="blue"
          className="w-full"
          onClick={() => {
            setListVisible(!listVisible);
          }}
        >
          {listVisible ? "Ocultar" : "Mostrar"} Lista
        </Button>
      </div>
      <div className="relative overflow-hidden size-full flex flex-col lg:flex-row">
        <div
          className={`absolute ${listVisible ? "flex" : "hidden"} lg:flex flex-col lg:relative bg-white w-full lg:w-auto h-full border-r border-solid border-r-neutral-200 z-10`}
        >
          <div className="w-full lg:w-80 h-full overflow-scroll">
            <List
              items={items}
              selectedItem={selectedItem}
              setSelectedItem={(index: number) => {
                setListVisible(false);
                setSelectedItem(index);
              }}
            />
          </div>
        </div>
        <div className="size-full overflow-hidden">
          {items[selectedItem].content}
        </div>
      </div>
    </div>
  );
};

export default CourseTemplate;
