export function isEthereumAddress(address) {
  const re = /^0x[a-fA-F0-9]{40}$/;
  return re.test(address);
}
