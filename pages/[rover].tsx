import { NextPageContext } from "next";
import axios from "axios";
import { Photo, Rover } from "@/src/components/types/rover";
import { RoverCard } from "@/src/components/RoverCard";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import dayjs from "dayjs";
import { TextField } from "@mui/material";

type RoverDetailProps = {
  roverName?: string;
};

type useRoverPhotosReturn = {
  date: dayjs.Dayjs | null;
  photos: Photo[];
  setDate: Dispatch<SetStateAction<dayjs.Dayjs | null>>;
};

const useRoverPhotos = (roverName: string): useRoverPhotosReturn => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());
  // new Date(Date.now()).toISOString().slice(0, 10)

  console.log({ date: date?.format("YYYY-MM-DD") });
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    console.log("HERE HERE");
    const getPhotos = async () => {
      const { data } = await axios.post("/api/getPhotosByDate", {
        roverName,
        date: date?.format("YYYY-MM-DD"),
      });

      setPhotos(data.photos);
      console.log(data);
    };

    // getPhotos();
  }, [date, roverName]);

  return {
    date,
    photos,
    setDate,
  };
};
const color = "#c44242";
export default function RoverDetail({ roverName }: RoverDetailProps) {
  const { date, photos, setDate } = useRoverPhotos(roverName ?? "");
  return (
    <div>
      <div>{roverName}</div>
      <div>
        <p>Date:</p>
        <DatePicker
          label="Photo Date"
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                sx={{
                  svg: { color },
                  input: { color },
                  label: { color },
                }}
              />
            );
          }}
          value={date}
          onAccept={(newValue) => {
            console.log(newValue);
            setDate(newValue);
          }}
        />
      </div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-8">
        {photos.map((photo) => (
          <img key={photo.id} alt={`image ${photo.sol}`} src={photo.img_src} />
        ))}
      </div>
    </div>
  );
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
