// import { fetchLatestAddressTxs } from "../utils/api";
import { getTrackAddressStorage } from "../utils/storage";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "trackAddress") {
    console.log("trackAddress", message.payload);

    createAlarm();
  }
});

function createAlarm() {
  chrome.alarms.create("trackAddressAlarm", {
    delayInMinutes: 1,
    periodInMinutes: 1,
  });
}
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "trackAddressAlarm") {
    console.log("trackAddressAlarm", alarm);
    // get stored address
    const trackedAddress = getTrackAddressStorage();
    // const latestAddressInfo = await fetchLatestAddressTxs(trackedAddress);
    // const trackedAddress = "0x8DD8cC8D942C40679D84A6C0476279DB0d12016a";
    chrome.notifications.create({
      type: "basic",
      iconUrl: "/images/CryptoExplorer_logo_128.png",
      title: "Don't forget!",
      message: `Buy some flowers.`,
    });
  }
});
