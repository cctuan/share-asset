
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

export const initWallet = () => {
  return new Promise<WalletConnect>((resolve, reject) => {
    // Create a connector
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });
    // Check if connection is already established
    if (!connector.connected) {
      // create new session
      connector.createSession();
    } else {
      resolve(connector)
    }
    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      if (error) {
        console.error(error)
        reject(error)
        throw error;
      }
      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
      console.log(accounts, chainId)
      resolve(connector)
    });
  })
}
