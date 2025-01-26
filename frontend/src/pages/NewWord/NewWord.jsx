import React from "react";
import { NewWordChild } from "./components/NewWordChild";
import { CandMProvider } from "./contexts/CandMProvider";

export default function NewWord() {
  return (
    <CandMProvider>
      <NewWordChild />
    </CandMProvider>
  );
}
