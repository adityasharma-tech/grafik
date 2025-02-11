const DB_NAME = "GrafikDB";
const DB_VERSION = 1;

const openDB = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;

      db.createObjectStore("ports", { keyPath: "portId" });
      db.createObjectStore("loggers", { keyPath: "loggerId" });
      db.createObjectStore("plotters", { keyPath: "plotterId" });
      db.createObjectStore("plots", { keyPath: "plotId" });
      db.createObjectStore("logs", { keyPath: "logId", autoIncrement: true });
      db.createObjectStore("devices", { keyPath: "deviceId" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const addPort = async (port: any) => {
    const db = await openDB();
    const tx = db.transaction("ports", "readwrite");
    tx.objectStore("ports").put(port)
}

const setDeviceId = async (deviceid: number, portIdx: number) => {
    const db = await openDB();
    const tx = db.transaction("ports", "readwrite");
    const store = tx.objectStore("ports");
}

export {
    openDB,
    addPort
}
