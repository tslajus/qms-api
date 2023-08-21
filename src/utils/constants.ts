export const MINUTES_IN_AN_HOUR = 60;
export const HOURS_IN_A_DAY = 24;
export const VISIT_DURATION = 20 * 60 * 1000;
export const DISPLAY_BOARD_ITEM_COUNT = 8;

export const VISIT_EXPIRATION_TIME = 1 * 60 * 60 * 1000;
export const SPECIALIST_STATUS_UPDATE_INTERVAL = 5;

export enum VISIT_STATUS {
  ACTIVE = "active",
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

export const TEMP = {
  SECRET_KEY: "test-secret-key",
  LIFETIME: "1h",
  PORT: 5000,
  DB: "mongodb+srv://tslajus:UDvoLcVkUvV9odrN@test.gjmbvjo.mongodb.net/?retryWrites=true&w=majority",
};
