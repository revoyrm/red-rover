import Image from "next/image";
import { Inter } from "next/font/google";
import { NextPageContext } from "next";
import axios from "axios";
import { Rover } from "@/src/components/types/rover";
import { RoverCard } from "@/src/components/RoverCard";
import { DEMO_KEY, MARS_BASE_URI } from "@/src/components/constants";

const inter = Inter({ subsets: ["latin"] });

type HomeProps = {
  rovers: Rover[];
};

export default function Home({ rovers }: HomeProps) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 bg-white text-black ${inter.className}`}
    >
      <ul className="grid grid-cols-3 gap-x-2 gap-y-8 w-full p-8">
        {rovers.map((rover) => (
          <RoverCard key={rover.id} {...rover} />
        ))}
      </ul>
    </main>
  );
}

type RoverResponse = {
  rovers: Rover[];
};

export async function getServerSideProps(context: NextPageContext): Promise<{
  props: HomeProps;
}> {
  try {
    console.log("in getserversideprops", { MARS_BASE_URI });
    const { data } = await axios.get<RoverResponse>(
      "https://api.nasa.gov/mars-photos/api/v1/rovers/",
      {
        params: { api_key: DEMO_KEY },
      }
    );

    return {
      props: {
        rovers: data.rovers,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        rovers: [],
      },
    };
  }
}
