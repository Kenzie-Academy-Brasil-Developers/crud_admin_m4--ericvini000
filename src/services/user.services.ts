import { QueryResult } from "pg";
import { client } from "../database";
import format from "pg-format";

const create = async (payload: any) => {
  const queryString: string = format(
    `
  INSERT INTO "users"
  (%I) 
  VALUES
  (%L)
  RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: QueryResult = await client.query(queryString);

  return queryResult.rows[0];
};

const read = async () => {
  const queryString: string = `SELECT * FROM "users";`;

  const queryResult: QueryResult = await client.query(queryString);

  return queryResult.rows;
};

export default { create, read };
