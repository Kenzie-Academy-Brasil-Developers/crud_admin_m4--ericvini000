import { QueryResult } from "pg";
import { client } from "../database";
import format from "pg-format";
import { TUserCourses, TUserCreate, TUserRead } from "../interfaces";
import { userSchemaRead, userSchemaReturn } from "../schemas/user.schemas";
import { AppError } from "../errors";
import { userCourseSchemaRead } from "../schemas";
import { hash } from "bcryptjs";

const create = async (payload: TUserCreate) => {
  payload.password = await hash(payload.password, 10);

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

const retrieve = async (userId: number) => {
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
    [userId]
  );

  if (!queryResult.rowCount) throw new AppError("No course found", 404);

  return userCourseSchemaRead.parse(queryResult.rows);
};

export default { create, read, retrieve };
