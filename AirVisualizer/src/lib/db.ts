import { openDB } from "idb";

export const DB_NAME = "GrafikStore";
export const DB_VERSION = 1

async function initializeDatabase(){
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade (db) {
      console.warn(`IndexDB: db upgrage needed; Updating database...`)
      if(!db.objectStoreNames.contains("loggers")){
        console.log("Object store 'loggers' not found. Creating new...");
        db.createObjectStore("loggers", { keyPath: "loggerId" })
      }
      if(!db.objectStoreNames.contains("plotters")){
        console.log("Object store 'plotters' not found. Creating new...");
        db.createObjectStore("plotters", { keyPath: "plotterId" })
      }
  
      if(!db.objectStoreNames.contains("plots")){
        console.log("Object store 'plots' not found. Creating new...");
        const store = db.createObjectStore("plots", { keyPath: "plotId", autoIncrement: true })
        store.createIndex("plotterId", "plotterId");
      }
  
      if (!db.objectStoreNames.contains("logs")) {
        console.log("Object store 'logs' not found. Creating new...");
        const store = db.createObjectStore("logs", { keyPath: "logId", autoIncrement: true });
        store.createIndex("loggerId", "loggerId")
      }
  
      if(!db.objectStoreNames.contains("devices")){
        console.log("Object store 'devices' not found. Creating new...");
        db.createObjectStore("devices", { keyPath: "deviceId" })
      }
    }
  })
  return db;
}

export { initializeDatabase };
