const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0FKelYzUWtjcUQwMGJNL05jV2xQWk13eW1nSWdtOUp2V3d5b1RkelZHRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTW1pc09HUDI0UUVxWWJROGd6bFAyc1FQNmFCRE1iNGtUL3E4TDJXemhndz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHT05tY3Zob0h6QzRCUDkxdEJ0YWpzd3dWUFVQWEIyWkowNVM3aDl1SzMwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQU2JrZFRSbmhrMi85SG83RHdIcWdkM1VQVjNYN1F1eXVSN1ZHV040S0ZBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFBb2lBcHFON21WemNDU3NmcmNyL0hXN2V1bnpGakNnSkprMzNESXR1RTg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpVbFNXaGp2ZHMwODA2OHNadzMvM1JEMlBocWJUYWtacWUyVGV0b2pSeWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUs1RGxLeDU4Tm54YzBEclh0N0swM0NlelFzbGRsMkpZMUJ1bUxyZG5IQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib3RHZytvYTd1NW55K0Nxc2xDcTJSNjA4bnRIZTZxSEI2SHJlL2x4Ym5HRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImplL0lhS3JZVDlmRDRJODlOaTFXWlJBUjFMclVDU1VnSCs0b0d6anhBMEhHc2xvdFc2c1hzY3UvWERMczN5ZWk2M1FNQk04VXA4ZWlFdWUweGt4SGpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA5LCJhZHZTZWNyZXRLZXkiOiJ5UnRJUm91SUd0Tk5mOHlSSnhjemhIeVRFVDZBdGRrZnVROThjN0wxUEpzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJac0FGT2pWTVFKMnEzVWRvYjNUWkd3IiwicGhvbmVJZCI6IjlkOTFkZmQ1LTNjZDEtNDMxMC05MTA0LTM0OTRlYWYwMWViMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsZFdxQW5OWGJHSUxyeXkwTkQ0OW02OTEyVTg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTDlIOXJORnN6TFpMOW1RaitVNi9iN0hJT3I0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlZMTlRFOFRGIiwibWUiOnsiaWQiOiIyNjM3NzY1Njg4MTg6M0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSW40d2M0RkVPKzQ4YllHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiNjg5SmNTM29RSXNGSGMvVVZEbnIxWFRWakFIc2RnenVmRW11bnJXaWF5MD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNmhydkF1WVlwT2pZZUZqd3YxWXZ6T3E3bUh6YXFMQy9zVFpCR2U5Sjh5aVozYkZ6TkV2WkY4RWYwTEwyNHM5ZjJXTlZYbWxKRC8rekNSU2xwQms4RFE9PSIsImRldmljZVNpZ25hdHVyZSI6IkM0cnRMT3NKa0FUZmUyaXJXN0VOMml2WThNbVBBZnJqdDJCTzNEejJFYWZvQ3RRek9ZTVdnNStLUmhYSWdUaTlYL3Q1dWozRE5VVytVRC9pL1VhTmhnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzc2NTY4ODE4OjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZXZQU1hFdDZFQ0xCUjNQMUZRNTY5VjAxWXdCN0hZTTdueEpycDYxb21zdCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNTcxNzYyOSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFDSjEifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "TBNRMAN",
    NUMERO_OWNER : process.env.OWNER_NUM || "263776568818",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
