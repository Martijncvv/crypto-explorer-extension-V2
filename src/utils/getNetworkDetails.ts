export const getNetworkDetails = (
  platformId: string,
): { domain: string; explorerUrl: string } | null => {
  let domain: string;
  let explorerUrl: string;

  switch (platformId) {
    case "arbitrum-one":
      domain = "api.arbiscan.io";
      explorerUrl = "arbiscan.io";
      break;
    // case "aptos": // differente domain logic \0/
    //   domain = "public-api.aptoscan.com/v1/";
    //   explorerUrl = "aptoscan.com";
    //   break;
    case "avalanche":
      domain = "api.snowtrace.io";
      explorerUrl = "snowtrace.io";
      break;
    case "base":
      domain = "api.basescan.org";
      explorerUrl = "basescan.org";
      break;
    case "blast":
      domain = "api.blastscan.io";
      explorerUrl = "blastscan.io";
      break;
    case "binance-smart-chain":
      domain = "api.bscscan.com";
      explorerUrl = "bscscan.com";
      break;
    case "celo":
      domain = "api.celoscan.io";
      explorerUrl = "celoscan.io";
      break;
    case "cronos":
      domain = "api.cronoscan.com";
      explorerUrl = "cronoscan.com";
      break;
    case "ethereum":
      domain = "api.etherscan.io";
      explorerUrl = "etherscan.io";
      break;
    case "fantom":
      domain = "api.ftmscan.com";
      explorerUrl = "ftmscan.com";
      break;
    case "linea": // todo check
      domain = "api.lineascan.build";
      explorerUrl = "lineascan.build";
      break;
    case "polygon-pos":
      domain = "api.polygonscan.com";
      explorerUrl = "polygonscan.com";
      break;
    case "optimistic-ethereum":
      domain = "api-optimistic.etherscan.io";
      explorerUrl = "optimistic.etherscan.io";
      break;
    case "scroll": // todo check
      domain = "api.scrollscan.com";
      explorerUrl = "scrollscan.com";
      break;
    default:
      console.log(
        `getPlatformDetails error: Invalid platformId: ${platformId}`,
      );
      return null;
  }

  return { domain, explorerUrl };
};
