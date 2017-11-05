import { checkCookie } from 'Utils/Cookie';
import { COOKIE_KEY } from 'Config/session';

/**
 * 检查用户cookie是否存在
 */
const checkLogin = () => checkCookie(COOKIE_KEY)

export {
  checkLogin
}
