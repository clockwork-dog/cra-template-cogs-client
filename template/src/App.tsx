import {
  Hint,
  Images,
  Timer,
  useCogsConfig,
  useCogsConnection,
  useCogsEvent,
  useCogsInputPortValue,
  useIsConnected,
  useShowPhase,
} from "@clockworkdog/cogs-client-react";
import { ShowPhase } from "@clockworkdog/cogs-client";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";

export default function MediaPlayer() {
  const [gameResult, setGameResult] = useState("");
  const cogsConnection = useCogsConnection<{
    config: { "Background Color": string };
    inputPorts: { Score: number };
    inputEvents: { "Game Finished": "Won" | "Lost" };
  }>();
  const isConnected = useIsConnected(cogsConnection);
  const showPhase = useShowPhase(cogsConnection);
  const searchParams = new URLSearchParams(window.location.search);
  const clientId = searchParams.get("name");

  const cogsBackgroundColor = useCogsConfig(cogsConnection)["Background Color"];
  const score = useCogsInputPortValue(cogsConnection, "Score");

  const handleGameFinished = useCallback((value: "Won" | "Lost") => {
    if (value === "Won") {
      confetti();
      return setGameResult(value);
    } else if (value === "Lost") {
      return setGameResult(value);
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
      <Images connection={cogsConnection} fullscreen />
    </div>
  );
}
