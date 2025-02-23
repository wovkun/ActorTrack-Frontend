export interface Actor {
  _id?: string;
  firstName: string;
  lastName: string;
  middleName: string;
  title?: string;
  experience: number;
  awards: string[];
}
