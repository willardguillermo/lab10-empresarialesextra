import { useState } from "react";
import Button from "./Button";

// Confirmation for destructive plans: the person has to type the plan hash.
// Controlled input: `typed` lives in state and every keystroke updates it.
// «Aprobar» stays disabled until `typed` is EXACTLY the hash (no prefix, no extra text, same case).
export default function HashConfirm({ hash, onConfirm }) {
  const [typed, setTyped] = useState("");
  const matches = typed === hash;

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
      <Button variant="danger" disabled={!matches} onClick={() => onConfirm()}>
        Aprobar
      </Button>
    </div>
  );
}
