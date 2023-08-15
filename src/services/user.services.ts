import { QueryResult } from "pg";
import { client } from "../database";
import format from "pg-format";
import {
  TUser,
  TUserCourses,
  TUserCreate,
  TUserRead,
  TUserReturn,
} from "../interfaces";
import { userSchemaRead, userSchemaReturn } from "../schemas/user.schemas";
import { AppError } from "../errors";
import { userCourseSchema } from "../schemas";

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
    "c"."id" AS "courseId",
    "c"."name" AS "courseName",
    "c"."description" AS "courseDescription",
    "uc"."active" AS "courseActive",
    "u"."id" AS "userId",
    "u"."name" AS "userName"
  FROM 
    "userCourses" AS "uc"
  JOIN
    "users" AS "u"
  ON
    "uc"."userId" = "u"."id"
  JOIN
    "courses" AS "c"
  ON
    "uc"."courseId"= "c"."id"
  WHERE "u"."id"=$1;
  `;

  const queryResult: QueryResult<TUserCourses> = await client.query(
    queryString,
    [id]
  );

  if (queryResult.rowCount < 1) throw new AppError("No course found", 404);

  return userCourseSchema.parse(queryResult.rows[0]);
};

export default { create, read, retrieve };
