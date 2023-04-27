import { ReactElement, useCallback } from "react";
import { Rover } from "./types/rover";
import { useRouter } from "next/router";

function Entry({
  label,
  value,
}: {
  label: string;
  value: string | number;
}): ReactElement {
  return (
    <div className="flex whitespace-pre-wrap py-1 pl-1">
      <p className="font-medium">{`${label}: `}</p>
      <p>{value}</p>
    </div>
  );
}

export function RoverCard({
  id,
  name,
  launch_date,
  landing_date,
  total_photos,
  cameras,
}: Rover): ReactElement {
  const Router = useRouter();

  const launchRover = useCallback(() => {
    Router.push(`/${name}`);
  }, [Router, name]);

  return (
    <li
      role="button"
      tabIndex={0}
      className="rounded-xl border bg-white border-2 border-red-900 text-red-900 p-4 focus:border-rose-200 focus:outline-none focus:bg-rose-50 hover:cursor-pointer hover:bg-rose-50 active:bg-rose-200"
      onClick={launchRover}
    >
      <h2 className="font-bold text-xl">{name}</h2>
      <Entry label="Launched" value={launch_date} />
      <Entry label="Landed" value={landing_date} />
      <Entry label="Photos" value={total_photos} />
      <p className="font-medium py-1 pl-1">Cameras: </p>
      <ul className="flex flex-wrap whitespace-pre-wrap pl-4">
        {cameras.map(({ id, name, rover_id, full_name }, i) => (
          <li key={id}>
            <p>{`${name}${i < cameras.length - 1 ? ", " : ""}`}</p>
          </li>
        ))}
      </ul>
    </li>
  );
}
