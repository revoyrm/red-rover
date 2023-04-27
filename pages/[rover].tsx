import { NextPageContext } from "next";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";

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

const useRoverPhotos = (
  roverName: string,
  setLoading: Dispatch<SetStateAction<boolean>>
): useRoverPhotosReturn => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getPhotos = async () => {
      const { data } = await axios.post("/api/getPhotosByDate", {
        roverName,
        date: date?.format("YYYY-MM-DD"),
      });

      setPhotos(data.photos);
      setLoading(false);
    };

    setLoading(true);
    if (date?.isValid()) {
      getPhotos();
    } else {
      setLoading(false);
    }
  }, [date, roverName, setLoading]);

  return {
    date,
    photos,
    setDate,
  };
};

export default function RoverDetail({ roverName }: RoverDetailProps) {
  const [loading, setLoading] = useState(true);
  const { date, photos, setDate } = useRoverPhotos(roverName ?? "", setLoading);
  return (
    <main className="flex h-full w-full flex-col justify-between pb-36 bg-gray-100 text-red-900">
      <div className="flex justify-between w-full p-8 h-28 bg-gray-100">
        <h1 className="font-bold text-2xl pr-8">{roverName}</h1>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of Photos"
            disableFuture
            value={date}
            slotProps={{
              textField: {
                //@ts-expect-error readonly does exist and does what I want.
                readOnly: true,
              },
            }}
            onAccept={(newValue) => {
              setDate(newValue);
            }}
          />
        </LocalizationProvider>
      </div>
      {loading && (
        <div className="flex flex-grow justify-around">
          <MoonLoader />
        </div>
      )}
      {!photos.length && !loading && (
        <div className="flex justify-around">No Photos for this date</div>
      )}
      {photos.length && !loading && (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-4 gap-y-8 p-4 place-items-center overflow-y-scroll">
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
