export const HOST_END_POINT = "http://192.168.100.15:8000/";
// export const HOST_END_POINT = "https://smartshule.wcbwasafi.com/";
export const MAIN_END_POINT = `${HOST_END_POINT}api/v1`;
export const pageSize = 4;

// USERS
export const ADMIN_REGISTRATION = `${MAIN_END_POINT}/administrators/`;
export const USER_LOGIN = `${MAIN_END_POINT}/accounts/login`;
export const CHANGE_PASSWORD = `${MAIN_END_POINT}/accounts/change-password/`;
export const REFRESH_TOKEN = `${MAIN_END_POINT}/accounts/new-tokens`;

// PREACHER
export const PREACHER = `${MAIN_END_POINT}/preacher/preacher-stream/`;
