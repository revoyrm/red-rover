import { ReactElement, useCallback } from "react";
import { Rover } from "./types/rover";
import { useRouter } from "next/router";

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
    <li onClick={launchRover} className="">
      <p>{name}</p>
      <p>{`Launch Date: ${launch_date}`}</p>
      <p>{`Landing Date: ${landing_date}`}</p>
      <p>{`Total Photos: ${total_photos}`}</p>
      <div className="flex gap-x-1">
        <p>Cameras: </p>
        <ul>
          {cameras.map(({ id, name, rover_id, full_name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}
