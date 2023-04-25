import { NextPageContext } from "next";
import axios from "axios";
import { Rover } from "@/src/components/types/rover";
import { RoverCard } from "@/src/components/RoverCard";

export const DEMO_KEY = "DEMO_KEY";
export const MARS_BASE_URI = "https://api.nasa.gov/mars-photos/api/v1/rovers/";

type RoverDetailProps = {
  roverName?: string;
};

export default function RoverDetail({ roverName }: RoverDetailProps) {
  return <div>{roverName}</div>;
}

export async function getServerSideProps(context: NextPageContext): Promise<{
  props: RoverDetailProps;
}> {
  return {
    props: {
      roverName: context.query.rover as string,
    },
  };
}
