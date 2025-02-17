import React, { useCallback, useEffect, useRef, useState } from 'react';
import { observer } from "mobx-react-lite";
import Install from "./Install";
import Connect from "./Connect";
import RevealXpub  from "./RevealXpub";
import { useKeystoneStore } from "../../mobx";
import "./index.css"

const Index = observer(() => {
  const { global: { bip44Xpub: pubKey, connected, updateConnectionStatus }} = useKeystoneStore();
  const hasInstalled = !!window.ethereum;
  const [hasConnected, setHasConnected] = useState<boolean>(connected);
  const [hasRevealed, setHasRevealed] = useState<boolean>(!!pubKey);

  const onConnected = useCallback(async () => {
    setHasConnected(true);
    updateConnectionStatus(true);
  }, [setHasConnected]);
  
  const onRevealed = useCallback(() => {
    setHasRevealed(true)
  }, [setHasRevealed])

  useEffect(() => {
    if (!pubKey) {
      setHasConnected(connected);
      setHasRevealed(false);
    }
  }, [pubKey, connected, setHasConnected, setHasRevealed])

  return (
    <>
      <Install open={!hasInstalled}/>
      <Connect open={hasInstalled && !hasConnected} onConnected={onConnected}/>
      <RevealXpub open={hasConnected && !hasRevealed} onRevealed={onRevealed}/>
    </>
  );
});

export default Index;
