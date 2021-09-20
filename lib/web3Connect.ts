import WalletConnectProvider from "@walletconnect/web3-provider";

export default async function() {

  //  Create WalletConnect Provider
  const provider = new WalletConnectProvider({
    infuraId: "1yN7WFp7e5eoloNi2AVLa3QhBAT",
  });
  try {

    //  Enable session (triggers QR Code modal)
    await provider.enable();
  } catch (e) {
    console.error(e)
  }
  return provider
}