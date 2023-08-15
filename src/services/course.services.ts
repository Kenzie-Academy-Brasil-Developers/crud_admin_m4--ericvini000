import format from "pg-format";
import { client } from "../database";
import { QueryResult } from "pg";
import {
  TCourse,
  TCourseCreate,
  TCourseRead,
  TUserCourses,
} from "../interfaces";

const create = async (payload: TCourseCreate) => {
  const queryString: string = format(
    `
      INSERT INTO "courses"
      (%I) 
      VALUES
      (%L)
      RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: QueryResult<TCourse> = await client.query(queryString);

  return queryResult.rows[0];
};

const read = async () => {
  const queryString: string = `SELECT * FROM "courses";`;

  const queryResult: QueryResult<TCourse> = await client.query(queryString);

  return queryResult.rows;
};

const retrieve = async (courseId: number) => {
  const queryString: string = `
  SELECT 
    "c"."id" AS "courseId",
    "c"."name" AS "courseName",
    "c"."description" AS "courseDescription",
    "uc"."active" AS "courseActive",
    "u"."id" AS "userId",
    "u"."name" AS "userName"
  FROM 
    "courses" AS "c"
  JOIN
    "userCourses" AS "uc" ON "c"."id" = "uc"."courseId"
  JOIN
    "users" AS "u" ON "uc"."userId" = "u"."id"
  WHERE 
    "c"."id"=$1;`;

  const queryResult: QueryResult<TUserCourses> = await client.query(
    queryString,
    [courseId]
  );

  return queryResult.rows;
};

const register = async (courseId: number, userId: number) => {
  const queryString: string = `
    INSERT INTO 
    "userCourses"
    ("courseId", "userId")
    VALUES
    ($1, $2);
  `;

  await client.query(queryString, [courseId, userId]);
};

const destroy = async (courseId: number, userId: number) => {
  const queryString: string = `
    UPDATE
    "userCourses" as
    SET("active") = true
    WHERE courseId=$1 AND userId=$2;
  `;

  await client.query(queryString, [courseId, userId]);
};

export default { create, read, register, retrieve, destroy };
