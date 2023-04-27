import { NextPageContext } from "next";
import axios from "axios";
import Image from "next/image";
import { Photo } from "@/src/components/types/rover";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import dayjs from "dayjs";
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

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getPhotos = async () => {
      const { data } = await axios.post("/api/getPhotosByDate", {
        roverName,
        date: date?.format("YYYY-MM-DD"),
      });

      setPhotos(data.photos);
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
    <main className="flex h-full w-full flex-col justify-between pb-32 overflow-y-scroll bg-gray-100 text-red-900">
      <div className="flex justify-between w-full p-8 h-24">
        <h1 className="font-bold text-2xl pr-8">{roverName}</h1>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of Photos"
            value={date}
            onAccept={(newValue) => {
              console.log({ newValue, isValid: newValue?.isValid() });
              setDate(newValue);
            }}
          />
        </LocalizationProvider>
      </div>
      {!photos.length && (
        <div className="flex justify-around">No Photos for this date</div>
      )}
      {photos.length && (
        <div className="grid grid-cols-3 gap-x-4 gap-y-8 content-center">
          {photos.map((photo) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={photo.id} alt={`image ${photo.id}`} src={photo.img_src} />
          ))}
        </div>
      )}
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
