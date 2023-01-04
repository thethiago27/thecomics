import { ErrorData } from "./error-data";

export type AsyncData<T> =
  | { status: "loading" }
  | { status: "not-fetched" }
  | { status: "loaded"; data: T }
  | { status: "error"; data: ErrorData };
