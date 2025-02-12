const DB_NAME = "GrafikDB";
const DB_VERSION = 1;

import {openDB} from 'idb';

async function createIndexesInStores () {
  return await openDB(DB_NAME, DB_VERSION, {
    upgrade (db) {
      if (!db.objectStoreNames.contains("loggers"))
        db.createObjectStore("loggers", { keyPath: "loggerId" });
      if (!db.objectStoreNames.contains("plotters"))
        db.createObjectStore("plotters", { keyPath: "plotterId" });
      if (!db.objectStoreNames.contains("plots"))
        db.createObjectStore("plots", { keyPath: "plotId" });
      if (!db.objectStoreNames.contains("logs"))
        db.createObjectStore("logs", { keyPath: "logId", autoIncrement: true });
      if (!db.objectStoreNames.contains("devices"))
        db.createObjectStore("devices", { keyPath: "deviceId" });
    }
  });
}

export {
   createIndexesInStores
}
