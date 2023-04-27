import { NextPageContext } from "next";
import axios from "axios";
import Image from "next/image";
import { Photo, Rover } from "@/src/components/types/rover";
import { RoverCard } from "@/src/components/RoverCard";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
    const getPhotos = async () => {
      const { data } = await axios.post("/api/getPhotosByDate", {
        roverName,
        date: date?.format("YYYY-MM-DD"),
      });

      setPhotos(data.photos);
      console.log(data);
    };

    if (date?.isValid()) {
      getPhotos();
    }
  }, [date, roverName]);

  return {
    date,
    photos,
    setDate,
  };
};

export default function RoverDetail({ roverName }: RoverDetailProps) {
  const { date, photos, setDate } = useRoverPhotos(roverName ?? "");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-black">
      <div>{roverName}</div>
      <div>
        <p>Date:</p>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Photo Date"
            value={date}
            onChange={(newValue) => {
              console.log({ newValue, isValid: newValue?.isValid() });
              setDate(newValue);
            }}
          />
        </LocalizationProvider>
      </div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-8">
        {photos.map((photo) => (
          <Image
            key={photo.id}
            alt={`image ${photo.sol}`}
            src={photo.img_src}
          />
        ))}
      </div>
    </main>
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
