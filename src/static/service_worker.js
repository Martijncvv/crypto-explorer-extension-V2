(async () => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "trackAddress") {
      console.log("trackAddress", message.payload);
      createAlarm();
    }
  });

  function createAlarm() {
    chrome.alarms.create("trackAddressAlarm", {
      delayInMinutes: 0.1,
      periodInMinutes: 60,
    });
  }

  function isEthereumAddress(address) {
    const re = /^0x[a-fA-F0-9]{40}$/;
    return re.test(address);
  }

  chrome.alarms.onAlarm.addListener(async (alarm) => {
    // if (alarm.name === "trackAddressAlarm") {
    // const trackAddress = (await chrome.storage.local.get("trackAddress"))
    //   ?.trackAddress;
    // if (trackAddress && isEthereumAddress(trackAddress)) {
    //   try {
    //     const res = await fetch(
    //       `https://api.etherscan.io/api?module=account&action=txlist&address=${trackAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc`,
    //     );
    //     if (!res.ok) {
    //       console.log(
    //         `Fetch error, ${trackAddress} fetchLatestAddressTxs txs info: ${res.status} ${res.statusText}`,
    //       );
    //     }
    //     const response = await res.json();
    //
    //     if (response.result.length > 0) {
    //       const latestNonce = response.result[0].nonce;
    //
    //       const storedAddressNonce = (
    //         await chrome.storage.local.get("addressNonce")
    //       )?.addressNonce;
    //
    //       if (storedAddressNonce && storedAddressNonce !== latestNonce) {
    //         // await chrome.storage.local.set({ addressNonce: latestNonce });
    //
    //         chrome.notifications.create({
    //           type: "basic",
    //           iconUrl: "/images/CryptoExplorer_logo_128.png",
    //           title: "New transaction by tracked address!",
    //           message: `LatestNonce ${latestNonce}\n StoredNonce ${storedAddressNonce}\n DIFFERENCE: ${
    //             parseInt(latestNonce) - parseInt(storedAddressNonce)
    //           }`,
    //         });
    //       } else {
    //         chrome.notifications.create({
    //           type: "basic",
    //           iconUrl: "/images/CryptoExplorer_logo_128.png",
    //           title: "Don't forget!",
    //           message: `SAME ${latestNonce}\n Stored ${storedAddressNonce}!`,
    //         });
    //       }
    //
    //       console.log("latestNonce1: ", latestNonce);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching address tx info:", error);
    //   }
    // } else {
    //   chrome.notifications.create({
    //     type: "basic",
    //     iconUrl: "/images/CryptoExplorer_logo_128.png",
    //     title: "Don't forget!",
    //     message: `No Eth address: ${res.trackAddress}!`,
    //   });
    // }
    // (async () => {
    //   // get stored address
    //   trackedAddress = await getTrackAddressStorage();
    //   console.log("trackedAddress123: ", trackedAddress);
    // })();
    // You can also call other async functions here
    // const latestAddressInfo = await fetchLatestAddressTxs(trackedAddress);
    // }
  });
})();
