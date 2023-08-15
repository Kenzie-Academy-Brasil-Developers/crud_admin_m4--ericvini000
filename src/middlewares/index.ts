import handleErrors from "./handleErrors.middleware";
import zodValidateBody from "./zodValidateBody.middleware";
import checkUserEmailExists from "./checkUserEmailExists.middleware";
import checkUserIdExists from "./checkUserIdExists.middleware";
import checkCourseAndUserIdExists from './checkCourseAndUserIdExists.middleware';
import checkCourseIdExists from './checkCourseIdExists.middleware';
import checkTokenExists from './authenticateToken.middleware';
import authenticateToken from './authenticateToken.middleware';
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
