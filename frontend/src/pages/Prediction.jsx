import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RotateCcw, ShieldCheck } from "lucide-react";
const fields = [
  ["sbytes", "Source Bytes"],
  ["smean", "Source Mean"],
  ["ct_dst_src_ltm", "Destination-Source Connections"],
  ["ct_srv_dst", "Service-Destination Connections"],
  ["sload", "Source Load"],
  ["ct_srv_src", "Service-Source Connections"],
  ["sttl", "Source TTL"],
  ["dbytes", "Destination Bytes"],
  ["dmean", "Destination Mean"],
  ["dload", "Destination Load"],
  ["rate", "Traffic Rate"],
  ["dur", "Connection Duration"],
  ["ct_dst_sport_ltm", "Destination Port Connections"],
];
export default function Prediction() {
  const nav = useNavigate();
  const [f, setF] = useState({
    proto: "TCP",
    service: "HTTP",
    ...Object.fromEntries(fields.map(([k]) => [k, ""])),
  });
  const set = (k, v) => setF({ ...f, [k]: v });
  const submit = (e) => {
    e.preventDefault();
    const attack = Math.random() > 0.65;
    nav("/result", {
      state: {
        prediction: attack ? "Fuzzers" : "Normal Traffic",
        confidence: attack ? "42.16%" : "96.32%",
        risk: attack ? "High" : "Low",
        details: attack
          ? "Suspicious traffic pattern detected."
          : "Traffic matches normal network behavior.",
      },
    });
  };
  return (
    <>
      <header className="top">
        <div>
          <p className="eyebrow">ML classification</p>
          <h1>New Prediction</h1>
          <p className="muted">
            Enter the 15 model features used by the network attack classifier.
          </p>
        </div>
      </header>
      <form className="panel form-panel" onSubmit={submit}>
        <div className="section-title">
          <ShieldCheck />
          <div>
            <h2>Traffic Information</h2>
            <p className="muted">
              Backend-ready field names are shown for integration.
            </p>
          </div>
        </div>
        <div className="form-grid">
          <div>
            <label>Protocol</label>
            <select
              value={f.proto}
              onChange={(e) => set("proto", e.target.value)}
            >
              <option>TCP</option>
              <option>UDP</option>
              <option>ICMP</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label>Service</label>
            <select
              value={f.service}
              onChange={(e) => set("service", e.target.value)}
            >
              <option>HTTP</option>
              <option>HTTPS</option>
              <option>DNS</option>
              <option>FTP</option>
              <option>SSH</option>
              <option>Other</option>
            </select>
          </div>
          {fields.map(([k, label]) => (
            <div key={k}>
              <label>
                {label}
                <small>{k}</small>
              </label>
              <input
                type="number"
                step="any"
                value={f[k]}
                onChange={(e) => set(k, e.target.value)}
                placeholder="Enter value"
                required
              />
            </div>
          ))}
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="secondary"
            onClick={() =>
              setF({
                proto: "TCP",
                service: "HTTP",
                ...Object.fromEntries(fields.map(([k]) => [k, ""])),
              })
            }
          >
            <RotateCcw size={17} />
            Reset
          </button>
          <button className="primary">Predict Attack</button>
        </div>
      </form>
    </>
  );
}
