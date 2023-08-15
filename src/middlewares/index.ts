import handleErrors from "./handleErrors.middleware";
import zodValidateBody from "./zodValidateBody.middleware";
import checkUserEmailExists from "./checkUserEmailExists.middleware";
import checkUserIdExists from "./checkUserIdExists.middleware";
import checkCourseAndUserIdExists from './checkCourseAndUserIdExists.middleware';
import checkCourseIdExists from './checkCourseIdExists.middleware';
import checkTokenExists from './checkTokenExists.middleware';
import authenticateToken from './checkTokenExists.middleware';
import verifyUserPermission from './verifyUserPermission.middleware';

export {
  handleErrors,
  zodValidateBody,
  checkUserEmailExists,
  checkUserIdExists,
  checkCourseAndUserIdExists,
  checkCourseIdExists,
  checkTokenExists,
  authenticateToken,
  verifyUserPermission
};
