import { Person } from "./Person";

export interface People {
  count: number;
  next: string;
  previous: string;
  results: Person[];
}