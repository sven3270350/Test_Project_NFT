export const getIpfsUrl = (url: string) =>
  url.startsWith('ipfs://')
    ? "https://mainnet.infura-ipfs.io/ipfs/" + url.replace(/^ipfs?:\/\//, "")
    : url
