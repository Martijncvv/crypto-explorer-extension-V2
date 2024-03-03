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

export const SHARED_API_KEY = "CG-TAvyqB8W2DTmod8w3KeMDw8h";
export default constants;
