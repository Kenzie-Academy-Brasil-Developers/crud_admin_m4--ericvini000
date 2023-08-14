import { QueryResult } from "pg";
import { client } from "../database";
import format from "pg-format";
import { TUser, TUserCreate, TUserRead, TUserReturn } from "../interfaces";
import { userSchemaRead, userSchemaReturn } from "../schemas/user.schema";

const create = async (payload: TUserCreate) => {
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

  const queryResult: QueryResult<TUserCreate> = await client.query(queryString);

  return userSchemaReturn.parse(queryResult.rows[0]);
};

const read = async () => {
  const queryString: string = `SELECT * FROM "users";`;

  const queryResult: QueryResult<TUserRead> = await client.query(queryString);

  return userSchemaRead.parse(queryResult.rows);
};

const retrieve = async (id: number) => {
  const queryString: string = `

  SELECT 
    *
  FROM 
    "users" AS "u"
  JOIN
    "userCourses" AS "uc"
  JOIN
    "courses" AS "c"
  ON
    "u"."id"="uc"."userId"
  WHERE
    id=$1;
  `;

  const queryResult: QueryResult = await client.query(queryString, [id]);

  return userSchemaReturn.parse(queryResult.rows[0]);
};

export default { create, read, retrieve };
