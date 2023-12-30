import dotenv from "dotenv";
import { Server } from "http";
import mongoose from "mongoose";
import config from "../config/config";
import app from "../index";
dotenv.config();

let server: Server;
const databaseConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(config.my_chat_atlas_db as string);
    console.log("Database is connected!");

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log("Fail to DB connected!");
  }
};

process.on("unhandledRejection", (error) => {
  // errorLogger.log(error);
  if (server) {
    server.close(() => {
      console.log(error);
      process.exit(1);
    });
  } else {
    process.exit(2);
  }
});

process.on("SIGTERM", () => {
  console.log("SIGTERM is received!");
  if (server) {
    server.close();
  }
});

export default databaseConnect;
