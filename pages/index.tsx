import Image from "next/image";
import { Inter } from "next/font/google";
import { NextPageContext } from "next";
import axios from "axios";
import { Rover } from "@/src/components/types/rover";
import { RoverCard } from "@/src/components/RoverCard";

const inter = Inter({ subsets: ["latin"] });

export const DEMO_KEY = "DEMO_KEY";
export const MARS_BASE_URI = "https://api.nasa.gov/mars-photos/api/v1/rovers/";

type HomeProps = {
  rovers: Rover[];
};

export default function Home({ rovers }: HomeProps) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
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
    const { data } = await axios.get<RoverResponse>(MARS_BASE_URI, {
      params: { api_key: DEMO_KEY },
    });

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
