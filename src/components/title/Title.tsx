import React from "react";
import { Label } from "../ui/label";

type Props = {
  title: string;
};

export default function Title({ title }: Props) {
  return (
    <div className="w-full mb-6 lg:w-1/2 lg:mb-0">
      <div className="mb-4">
        <h1 className="text-2xl font-bold sm:text-3xl text-neutral-600 dark:text-white">
          {title}
        </h1>
      </div>
      <div className="w-20 h-1 bg-yellow-500 rounded" />
    </div>
  );
}
