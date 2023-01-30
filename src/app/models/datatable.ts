export type DataTable<T> = {
  data: T[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
};
