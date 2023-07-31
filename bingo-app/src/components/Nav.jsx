import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';



const LotteryMachine = () => {
const [isAnimating, setIsAnimating] = useState(false);
const [ballPositions, setBallPositions] = useState([]);

useEffect(() => {

    const initialPositions = Array.from({ length: 10 }, () => ({
    x: 60,
    y: 100,
    }));
    setBallPositions(initialPositions);
}, []);

const handleShake = () => {
    if (!isAnimating) {
    setIsAnimating(true);

    const timeline = gsap.timeline({
        onComplete: () => {
        setIsAnimating(false);
        },
        repeat: -1, // -1 infinito
        onRepeat: () => {
        setBallPositions((prevPositions) =>
            prevPositions.map(() => ({
            x: 65,
            y: 110,
            }))
        );
        },
    });

    ballPositions.forEach((position, index) => {
        timeline.to(`.lottery-bal:nth-child(${index + 1})`, {
        x: position.x + Math.random() * 50 - 20,
        y: position.y + Math.random() * 1 - 90, 
        duration: 0.1, 
        ease: 'power2.inOut',
        });
        timeline.to(`.lottery-bal:nth-child(${index + 1})`, {
        x: position.x + Math.random() * 40 - 55,
        y: position.y + Math.random() * 1 - 90, 
        duration: 0.1, 
        ease: 'power2.inOut',
        });
        timeline.to(`.lottery-bal:nth-child(${index + 1})`, {
        x: position.x + Math.random() * 50 - 20, 
        y: position.y + Math.random() * 1 - 60, 
        duration: 0.01, 
        ease: 'power2.inOut',
        });
        timeline.to(`.lottery-bal:nth-child(${index + 1})`, {
        x: position.x + Math.random() * 70 - 10, 
        y: position.y + Math.random() * 1 - 40, 
        duration: 0.001, 
        ease: 'power2.inOut',
        });
        timeline.to(`.lottery-bal:nth-child(${index + 1})`, {
        x: position.x + Math.random() * 30 - 40, 
        y: position.y + Math.random() * 1 - 10, 
        duration: 0.1, 
        ease: 'power2.inOut',
        });
    });
    }
};

return (
    <div className="scene">
    {/* <button id="play" onClick={handleShake} disabled={isAnimating}>
        {isAnimating ? 'Animating...' : 'Shake'}
    </button> */}
        <h1>BING</h1>
    <div className="lottery-machine">
        {ballPositions.map((position, index) => (
            <div
            key={index}
            className="lottery-bal"
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
            >
            <img src='./favicon.ico' onLoad={handleShake}></img>
        </div>
        ))}
    </div>
    </div>
);
};

export default LotteryMachine;