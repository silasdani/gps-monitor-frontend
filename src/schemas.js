import { schema } from "normalizr";

export const trackSchema = new schema.Entity(
  "tracks",
  {},
  { idAttribute: "_id" }
);
