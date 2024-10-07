import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 300 });

export default cache;

export function clearNotifConfigCache() {
  const keys = cache.keys();
  keys.forEach((key) => {
    if (key.startsWith("notifConfigs_")) {
      cache.del(key);
    }
  });
}
