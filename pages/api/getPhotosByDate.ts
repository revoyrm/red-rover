import { DEMO_KEY, MARS_BASE_URI } from "@/src/components/constants";
import { Photo } from "@/src/components/types/rover";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type PhotosResponse = {
  photos: Photo[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PhotosResponse>
) {
  const { roverName, date } = req.body;

  try {
    const { data } = await axios.get<PhotosResponse>(
      `${MARS_BASE_URI}/${roverName}/photos/`,
      {
        params: { earth_date: date, api_key: DEMO_KEY },
      }
    );

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ photos: [] });
  }
}
