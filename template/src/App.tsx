import {
  Hint,
  Images,
  Timer,
  useCogsConfig,
  useCogsConnection,
  useCogsEvent,
  useCogsStateValue,
  useIsConnected,
  useShowPhase,
} from "@clockworkdog/cogs-client-react";
import { ShowPhase } from "@clockworkdog/cogs-client";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";
import manifest from "./cogs-plugin-manifest.js";

export default function MediaPlayer() {
  const [gameResult, setGameResult] = useState("");
  const cogsConnection = useCogsConnection<typeof manifest>();
  const isConnected = useIsConnected(cogsConnection);
  const showPhase = useShowPhase(cogsConnection);
  const searchParams = new URLSearchParams(window.location.search);
  const clientId = searchParams.get("name");

  const cogsBackgroundColor = useCogsConfig(cogsConnection)["Background Color"];
  const score = useCogsStateValue(cogsConnection, "Score");

  const [selectedButton, setSelectedButton] = useState(1);

  useEffect(() => {
    cogsConnection.setState({ "Selected Button": selectedButton });
  }, [cogsConnection, selectedButton]);

  const handleGameFinished = useCallback((value: "Won" | "Lost") => {
    setGameResult(value);

    if (value === "Won") {
      confetti();
    }
  }, []);

  useCogsEvent(cogsConnection, "Game Finished", handleGameFinished);

  useEffect(() => {
    if (showPhase === ShowPhase.Setup) {
      return setGameResult("");
    }
    const originalTitle = document.title;
    document.title = clientId + " - COGS";
    return () => {
      document.title = originalTitle;
    };
  }, [clientId, showPhase]);

  useEffect(() => {
    const body = document.body;
    body.style.background = cogsBackgroundColor;
  }, [cogsBackgroundColor]);

  return (
    <div className="container">
      {!isConnected && (
        <div id="connection-status" className={isConnected ? "connected" : ""}>
          Connecting...
        </div>
      )}
      <div className="numbers">
        <section>
          <p>Timer</p>
          <Timer connection={cogsConnection} />
        </section>
        <section>
          <p>Score</p>
          <p>{score}</p>
        </section>
      </div>
      <div className="buttons">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`button ${i === selectedButton ? "selected" : ""}`}
            onClick={() => setSelectedButton(i)}
          >
            {i}
          </div>
        ))}
        <div
          className="button go"
          onClick={() => cogsConnection.sendEvent("Go Button Pressed")}
        >
          GO!
        </div>
      </div>
      {gameResult && (
        <article>
          {gameResult === "Won" && <p>You won! Congrats!!</p>}
          {gameResult === "Lost" && (
            <div className="dark-souls">
              <p>You Lost</p>
            </div>
          )}
        </article>
      )}
      <p>
        <Hint connection={cogsConnection} />
      </p>
      <Images
        connection={cogsConnection}
        fullscreen={{ style: { pointerEvents: "none" } }}
      />
    </div>
  );
}
