import { useState, useEffect } from "react";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

export const useWallet = () => {
  const [connector, setConnector] = useState<WalletConnect|null>(null)
  const [accounts, setAccounts] = useState<string[]>([])
  const [chainId, setChainId] = useState<number>(0)
  useEffect(() => {
    const walletConnector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });
    if (!walletConnector.connected) {
      // create new session
      walletConnector.createSession();
    } else {
      setConnector(walletConnector)
      setAccounts(walletConnector.accounts)
      setChainId(walletConnector.chainId)
    }
    // Subscribe to connection events
    walletConnector.on("connect", (error, payload) => {
      if (error) {
        console.error(error)
        throw error;
      }
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
      setConnector(null)

      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];
      setAccounts(accounts)
      setChainId(chainId)

      walletConnector.createSession();
    });
  }, [])
  return {
    connector,
    accounts,
    chainId
  }
}