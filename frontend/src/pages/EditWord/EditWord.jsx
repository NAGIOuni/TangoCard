import React from "react";
import { EditWordChild } from "./components/EditWordChild";
import { CandMProvider } from "./contexts/CandMProvider";

export default function EditWord() {
  return (
    <CandMProvider>
      <EditWordChild />
    </CandMProvider>
  );
}
