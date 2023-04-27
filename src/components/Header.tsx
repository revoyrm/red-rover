import { ReactElement } from "react";
import Image from "next/image";

export default function Header(): ReactElement {
  return (
    <div className="w-full h-24 flex border-b-4 border-red-900 items-center text-2xl px-8 bg-gray-100">
      <Image alt="red planet" width="48" height="48" src="/mars.png" />
      <p className="px-4 text-3xl font-bold text-red-900">Red Rover</p>
    </div>
  );
}
