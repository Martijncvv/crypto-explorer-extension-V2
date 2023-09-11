(async () => {
  chrome.runtime.onInstalled.addListener((message, sender, sendResponse) => {
    createAlarm();
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
              continue;
            }
            const response = await res.json();

            if (response.result.length > 0) {
              const latestNonce = response.result[0].nonce;

              if (accountinfo.nonce !== latestNonce) {
                const txDifference =
                  parseInt(latestNonce) - parseInt(accountinfo.nonce) || 1;
                const txText =
                  txDifference === 1
                    ? `${accountinfo.name} has ${txDifference} new transaction`
                    : `${accountinfo.name} has ${txDifference} new transactions`;

                const weiValue = response.result[0].value || "0";
                const ethValue = BigInt(weiValue) / BigInt(10 ** 18);
                const ethText =
                  ethValue > 0 ? `Just sent ${ethValue} ETH` : "No ETH sent";
                chrome.notifications.create({
                  type: "basic",
                  iconUrl: "/images/CryptoExplorer_logo_128.png",
                  title: `Crypto Tracker`,
                  message: `${txText}
                  ${ethText}`,
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
              }
              // else {
              // console.log("No new txs for tracked accounts");
              // }
            }
          } catch (error) {
            console.error("Error fetching address tx info:", error);
          }
        }
      }
      // else {
      // console.log("No tracked accounts");
      // }
    }
  });
})();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
