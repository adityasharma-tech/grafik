export const DB_NAME = "GrafikDb";
export const DB_VERSION = 2

const createIndexesInStores = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("loggers"))
        db.createObjectStore("loggers", { keyPath: "loggerId" });
      if (!db.objectStoreNames.contains("plotters"))
        db.createObjectStore("plotters", { keyPath: "plotterId" });
      if (!db.objectStoreNames.contains("plots")) {
        const store = db.createObjectStore("plots", {
          keyPath: "plotId",
          autoIncrement: true,
        });
        store.createIndex("plotterId", "plotterId");
      }
      if (!db.objectStoreNames.contains("logs")) {
        const store = db.createObjectStore("logs", { keyPath: "logId", autoIncrement: true });
        store.createIndex("loggerId", "loggerId")
      }
      if (!db.objectStoreNames.contains("devices"))
        db.createObjectStore("devices", { keyPath: "deviceId" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export { createIndexesInStores };
