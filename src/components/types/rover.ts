export type Camera = {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
};

export type Rover = {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: "complete" | "active";
  max_sol: number;
  max_date: string;
  total_photos: number;
  cameras: Camera[];
};
