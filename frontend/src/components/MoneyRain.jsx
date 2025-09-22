import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import moneyTexture from '../assets/money.png'; // Make sure this path is correct

function MoneyRain() {
  const sceneRef = useRef(null);
  const engineRef = useRef(Matter.Engine.create());
  const runnerRef = useRef(Matter.Runner.create());

  const billWidth = 100;
  const billHeight = 50;

  useEffect(() => {
    const { Engine, Render, World, Bodies } = Matter;
    const engine = engineRef.current;
    
    engine.world.gravity.y = 0.2;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
      },
    });

    const ground = Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight + 25,
      window.innerWidth,
      50,
      { isStatic: true, render: { visible: false } }
    );

    World.add(engine.world, [ground]);
    Render.run(render);
    Matter.Runner.run(runnerRef.current, engine);

    const addNote = () => {
      const note = Bodies.rectangle(
        Math.random() * window.innerWidth,
        -50,
        billWidth,
        billHeight,
        {
          restitution: 0.1,
          friction: 0.8,
          // Add random initial angle
          angle: Math.random() * Math.PI,
          // Use the image sprite for rendering
          render: {
            sprite: {
              texture: moneyTexture,
              xScale: 1,
              yScale: 1,
            },
          },
        }
      );
      World.add(engine.world, note);
    };

    // Increase interval to slow down the rain
    const interval = setInterval(addNote, 250);

    return () => {
      Render.stop(render);
      World.clear(engine.world);
      Engine.clear(engine);
      render.canvas.remove();
      clearInterval(interval);
      Matter.Runner.stop(runnerRef.current);
    };
  }, []);

  return <div ref={sceneRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }} />;
}

export default MoneyRain;