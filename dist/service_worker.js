(async () => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "trackAccountsAlarm") {
      console.log("trackAccountsAlarm", message.payload);
      createAlarm();
    }
  });

  function createAlarm() {
    chrome.alarms.create("trackAccountsAlarm", {
      delayInMinutes: 1,
      periodInMinutes: 60,
    });
  }

  chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === "trackAccountsAlarm") {
      const { trackedAccounts: accounts } = await chrome.storage.local.get(
        "trackedAccounts",
      );

      if (accounts?.length > 0) {
        for (const accountinfo of accounts) {
          try {
            await sleep(5000); // to prevent hitting API limit

            const res = await fetch(
              `https://api.etherscan.io/api?module=account&action=txlist&address=${accountinfo.address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc`,
            );
            if (!res.ok) {
              console.log(
                `Fetch error, ${accountinfo.address} fetchLatestAddressTxs txs info: ${res.status} ${res.statusText}`,
              );
              continue; // Skip to the next account
            }
            const response = await res.json();

            if (response.result.length > 0) {
              const latestNonce = response.result[0].nonce;

              if (accountinfo.nonce !== latestNonce) {
                chrome.notifications.create({
                  type: "basic",
                  iconUrl: "/images/CryptoExplorer_logo_128.png",
                  title: "New transaction by tracked address!",
                  message: `LatestNonce ${latestNonce}\n StoredNonce ${
                    accountinfo.nonce
                  }\n DIFFERENCE: ${
                    parseInt(latestNonce) - parseInt(accountinfo.nonce)
                  }`,
                });

                chrome.storage.local.set({
                  trackedAccounts: accounts.map((account) => {
                    if (account.address === accountinfo.address) {
                      return {
                        ...account,
                        nonce: latestNonce,
                        lastUpdated: Date.now(),
                      };
                    }
                    return account;
                  }),
                });
              } else {
                chrome.notifications.create({
                  type: "basic",
                  iconUrl: "/images/CryptoExplorer_logo_128.png",
                  title: "Account Tracker",
                  message: `SAME ${latestNonce}\n Stored ${accountinfo.nonce}!`,
                });
              }

              console.log("latestNonce1: ", latestNonce);
            }
          } catch (error) {
            console.error("Error fetching address tx info:", error);
          }
        }
      } else {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "/images/CryptoExplorer_logo_128.png",
          title: "Account Tracker",
          message: `No tracked accounts!`,
        });
      }
    }
  });
})();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
