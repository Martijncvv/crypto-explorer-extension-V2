interface Constants {
  border_radius: number;
  border_radius_small: number;

  default_padding: number;

  font_large: number;
  font_medium: number;
  font_small: number;
  font_micro: number;
  font_nano: number;
  font_weight_large: number;
  font_weight_medium: number;
}

const constants: Constants = {
  border_radius: 12,
  border_radius_small: 6,

  default_padding: 12,

  font_large: 22,
  font_medium: 16,
  font_small: 14,
  font_micro: 12,
  font_nano: 10,

  font_weight_large: 600,
  font_weight_medium: 500,
};

export const CACHE_TIME_SHORT = 600000; // 10 minutes
export const CACHE_TIME_LONG = 10800000; // 3 hours

export const SHARED_API_DELAY = 2000; // 2 secs

export const SHARED_API_KEY_COINGECKO = "CG-TAvyqB8W2DTmod8w3KeMDw8h";
export const SHARED_API_KEY_ETHERSCAN_ETHEREUM =
  "9Z1G1NN35M1URWAANE5CBZ2WJRJMABDCC8";

export default constants;

type NetworkDetail = {
  domain: string;
  explorerUrl: string;
  apikey?: string;
};

export const NETWORK_DETAILS: Record<string, NetworkDetail> = {
  "arbitrum-one": {
    domain: "api.arbiscan.io",
    explorerUrl: "arbiscan.io",
    apikey: "P6V1TYPF7V97KPA5BN6BE9YVWAPZNNE2VA",
  },
  avalanche: {
    domain: "api.snowtrace.io",
    explorerUrl: "snowtrace.io",
  },
  base: {
    domain: "api.basescan.org",
    explorerUrl: "basescan.org",
    apikey: "WE8V2FI55PN7K8J3U76CGT445CMVW9KKAX",
  },
  blast: {
    domain: "api.blastscan.io",
    explorerUrl: "blastscan.io",
  },
  "binance-smart-chain": {
    domain: "api.bscscan.com",
    explorerUrl: "bscscan.com",
  },
  celo: {
    domain: "api.celoscan.io",
    explorerUrl: "celoscan.io",
  },
  cronos: {
    domain: "api.cronoscan.com",
    explorerUrl: "cronoscan.com",
  },
  ethereum: {
    domain: "api.etherscan.io",
    explorerUrl: "etherscan.io",
    apikey: "9Z1G1NN35M1URWAANE5CBZ2WJRJMABDCC8",
  },
  fantom: {
    domain: "api.ftmscan.com",
    explorerUrl: "ftmscan.com",
  },
  linea: {
    domain: "api.lineascan.build",
    explorerUrl: "lineascan.build",
  },
  "polygon-pos": {
    domain: "api.polygonscan.com",
    explorerUrl: "polygonscan.com",
  },
  "optimistic-ethereum": {
    domain: "api-optimistic.etherscan.io",
    explorerUrl: "optimistic.etherscan.io",
    apikey: "EDHXVGWDZJSGXR2ZV4P4F5CMN8Q4EEDHSA",
  },
  scroll: {
    domain: "api.scrollscan.com",
    explorerUrl: "scrollscan.com",
    apikey: "Z8BXW9WVI2B3IPD9K5TQV1SX2T99PKNYHE",
  },
};
