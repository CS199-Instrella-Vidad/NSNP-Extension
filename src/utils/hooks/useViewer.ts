import { useState } from "react";

export function useViewer() {
  const [showNonSimMatrices, setShowNonSimMatrices] = useState(false);
  const [showSPMatrices, setShowSPMatrices] = useState(true);
  const [showConfigHist, setShowConfigHist] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showGraph, setShowGraph] = useState(true);
  return {
    showNonSimMatrices,
    setShowNonSimMatrices,
    showSPMatrices,
    setShowSPMatrices,
    showConfigHist,
    setShowConfigHist,
    showSettings,
    setShowSettings,
    showGraph,
    setShowGraph,
  };
}
