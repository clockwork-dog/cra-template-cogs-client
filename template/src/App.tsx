import {
  Hint, Images, Timer, useCogsConfig,
  useCogsConnection, useCogsEvent, useCogsInputPortValue, useIsConnected, useShowPhase
} from '@clockworkdog/cogs-client-react';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import confetti from 'canvas-confetti';
//import manifestJson from '../../cogs-plugin-manifest.json'

export default function MediaPlayer() {
  // For the next version!
  //const newFancyCogsConnection = useCogsConnection<typeof manifestJson>();
  const [gameResult, setGameResult] = useState('');
  const cogsConnection = useCogsConnection<{config: {"Default Background": string}, inputPorts: {Score: number}, inputEvents: {'Game Finished': 'Won' | 'Lost' | 'Finished'}}>();
  const isConnected = useIsConnected(cogsConnection);
  const showPhase = useShowPhase(cogsConnection);
  const searchParams = new URLSearchParams(window.location.search);
  const clientId = searchParams.get('name');

  const cogsBackgroundColor = useCogsConfig(cogsConnection)["Default Background"];
  const score = useCogsInputPortValue(cogsConnection, "Score");

  const handleGameFinished = useCallback((value: 'Won' | 'Lost' | 'Finished') => {
    if (value === "Finished") {
      setGameResult('');
    } else if (value === "Won") {
      setGameResult(value);
      confetti()
    } else if (value === "Lost") {
      setGameResult(value);
    }
  }, [])

  useCogsEvent(cogsConnection, 'Game Finished', handleGameFinished)
  console.log(showPhase);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = clientId + ' - COGS';
    return () => {
      document.title = originalTitle;
    };
  }, [clientId]);

  useEffect(() => {
    const body = document.body;
    body.style.background = cogsBackgroundColor;
  }, [cogsBackgroundColor]);

  return (
    <>
      {(!isConnected) && (
        <div id="connection-status" className={isConnected ? 'connected' : ''}>
          Connecting...
        </div>
      )}
      <div className='container'>
        <section>
          <p>Timer</p>
          <Timer  connection={cogsConnection} />
        </section>
        <section>
          <p>Score</p>
          <p>{score}</p>
        </section>
      </div>
      {showPhase === "in progress" && (
        <article>
          {gameResult === "Won" && <p>You won! Congrats!! 🎉</p>}
          {gameResult === "Lost" && (
            <div className="dark-souls">
              <p>You Lost</p>
            </div>
          )}
        </article>
      )}
      <Hint  connection={cogsConnection} />
      <Images connection={cogsConnection} fullscreen />
    </>
  );
}
