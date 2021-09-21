import { useState, useEffect } from "react";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

export const useWallet = () => {
  const [connector, setConnector] = useState<WalletConnect|null>(null)
  const [accounts, setAccounts] = useState<string[]>([])
  const [chainId, setChainId] = useState<number>(0)
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false)

  // walletConnector.createSession()
  const connectWallet = () => {
    const walletConnector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });
    setConnector(walletConnector)

    if (walletConnector.connected) {
      setIsWalletConnected(true)
      setAccounts(walletConnector.accounts)
      setChainId(walletConnector.chainId)
    }
    // Subscribe to connection events
    walletConnector.on("connect", (error, payload) => {
      if (error) {
        console.error(error)
        throw error;
      }
      setIsWalletConnected(true)
      // wallet.setConnector(walletConnector)
      const { accounts, chainId } = payload.params[0];
      setAccounts(accounts)
      setChainId(chainId)
    });
    // Subscribe to connection events
    walletConnector.on("call_request", (error, payload) => {
      if (error) {
        console.error(error)
        throw error;
      }
      console.log('call_request', payload)
    });
    walletConnector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }
      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];
      setAccounts(accounts)
      setChainId(chainId)
    });
    walletConnector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];
      setAccounts(accounts)
      setChainId(chainId)
      setIsWalletConnected(false)
      walletConnector.createSession();
    });
  }
  useEffect(() => {
    connectWallet()
  }, [])
  return {
    connector,
    accounts,
    chainId,
    isWalletConnected,
    connectWallet
  }
}