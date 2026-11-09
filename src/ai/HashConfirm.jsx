import { useState } from "react";
import Button from "./Button";

export default function HashConfirm({ hash, onConfirm }) {
  const [typed, setTyped] = useState("");
  // FIX (security): includes() accepted the hash surrounded by extra text; it must be an exact match.
  const isValid = typed === hash;

  return (
    <div className="hash-confirm">
      <label>
        Hash del plan
        <input
          type="text"
          autoComplete="off"
          spellCheck={false}
          value={typed}
          onChange={(event) => setTyped(event.target.value)}
        />
      </label>
      <Button variant="danger" disabled={!isValid} onClick={() => onConfirm()}>
        Aprobar
      </Button>
    </div>
  );
}
