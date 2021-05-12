import { Shoe } from "./shoe.model";

export interface Piani {
    _id: string;
    nomePiano: string;
    costo: string;
    durata: string;
    shoes?: Shoe[];
  }
  