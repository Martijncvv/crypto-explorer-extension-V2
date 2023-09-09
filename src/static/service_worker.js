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
      periodInMinutes: 0.5,
    });
  }

  function isEthereumAddress(address) {
    const re = /^0x[a-fA-F0-9]{40}$/;
    return re.test(address);
  }

  chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === "trackAddressAlarm") {
      const res = await chrome.storage.local.get("trackAddress");
      const trackAddress = res.trackAddress;

      if (trackAddress && isEthereumAddress(trackAddress)) {
        try {
          const res2 = await fetch(
            `https://api.etherscan.io/api
   ?module=account
   &action=txlist
   &address=${trackAddress}
   &startblock=0
   &endblock=99999999
   &page=1
   &offset=10
   &sort=asc`,
          );
          // const res2 = await fetch(
          //   `https://api.etherscan.io/api
          //    ?module=account
          //    &action=
          //    &contractaddress=${trackAddress}
          //    &page=1
          //    &offset=100
          //    &startblock=0
          //    &endblock=99999999
          //    &sort=desc`,
          // );

          console.log("res2: ", res2);
          if (!res.ok) {
            console.log(
              `Fetch error, ${trackAddress} fetchLatestAddressTxs txs info: ${res.status} ${res.statusText}`,
            );
          }
        } catch (error) {
          console.error("Error fetching address tx info:", error);
        }
      } else {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "/images/CryptoExplorer_logo_128.png",
          title: "Don't forget!",
          message: `No Eth address: ${res.trackAddress}!`,
        });
      }
      // (async () => {
      //   // get stored address
      //   trackedAddress = await getTrackAddressStorage();
      //   console.log("trackedAddress123: ", trackedAddress);
      // })();
      // You can also call other async functions here
      // const latestAddressInfo = await fetchLatestAddressTxs(trackedAddress);
    }
  });
})();
