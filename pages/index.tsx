import { NextPageContext } from "next";
import axios from "axios";
import { Rover } from "@/src/components/types/rover";
import { RoverCard } from "@/src/components/RoverCard";
import { DEMO_KEY, MARS_BASE_URI } from "@/src/components/constants";

type HomeProps = {
  rovers: Rover[];
};

export default function Home({ rovers }: HomeProps) {
  return (
    <main className="flex h-full flex-col justify-between px-24 py-8 bg-gray-100 text-black">
      <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8 w-full p-8">
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
