import format from "pg-format";
import { client } from "../database";
import { QueryResult } from "pg";
import { TCourse, TCourseCreate, TCourseRead } from "../interfaces";
import courseControllers from "../controllers/course.controllers";

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

const read = async () => {
  const queryString: string = `SELECT * FROM "courses";`;

  const queryResult: QueryResult<TCourse> = await client.query(queryString);

  return queryResult.rows;
};

export default { create, read, register };