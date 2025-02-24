export interface Contract {
  _id?: string;
  actorId: string;
  performanceId: string;
  role: string;
  baseSalary: number;
  bonus?: number;
  actorName?: string;  // Added to store actor's last name
  performanceName?: string;  // Added to store performance name
}
