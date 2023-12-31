import Circulo from "./Circulo";
import React, { useState } from "react";

const Bombo = () => {
const synth = window.speechSynthesis;
const voices = synth.getVoices()

const generarNumerosDisponibles = () => {

    return Array.from({ length: 90 }, (_, index) => index + 1);
    };

    const [numerosGenerados, setNumerosGenerados] = useState([]);
    const [numerosDisponibles, setNumerosDisponibles] = useState(generarNumerosDisponibles());
    const [displayNumber, setDisplayNumber] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    const reiniciarJuego = () => {
        setNumerosGenerados([]);
        setNumerosDisponibles(generarNumerosDisponibles());
        setIsAnimating(false);
        setDisplayNumber("");
    };
    const googleSpanishVoice = voices.find((voice) => voice.name === "Google español");
    const fallbackVoice = voices.find((voice) => voice.name === "Microsoft Pablo - Spanish (Spain)");
    const spanish = voices.find((voice) => voice.name === "Spanish (Spain)");
    const speak = (text) => {
        //validacion al hablar comentada
        // if (synth.speaking) {
            //     console.error("speechSynthesis.speaking");
            //     return;
            // }
            
            
    const utterThis = new SpeechSynthesisUtterance(text);

    // eslint-disable-next-line no-unused-vars
    utterThis.onend = function (event) {
    console.log("SpeechSynthesisUtterance.onend");
    };

    // eslint-disable-next-line no-unused-vars
    utterThis.onerror = function (event) {
    console.error("SpeechSynthesisUtterance.onerror");
    };

    if (googleSpanishVoice) {
        utterThis.voice = googleSpanishVoice;
    } else if (fallbackVoice) {
        utterThis.voice = fallbackVoice;
    }else{
        utterThis.voice=spanish;
    }
        utterThis.pitch = 1;
        utterThis.rate = 1;
        synth.speak(utterThis);
};



    const generarNumeroAleatorio = () => {
        if (numerosGenerados.length > 90) {
            return;
        }
        if (isAnimating) {
            return;
        }
        setIsAnimating(true);
        const animationNumbers = [];
        while (animationNumbers.length < 10) {
            const randomNumber = Math.floor(Math.random() * 90) + 1;
            if (!animationNumbers.includes(randomNumber)) {
            animationNumbers.push(randomNumber);
            }
        }
    
        let animationCounter = 0;
        const animationInterval = setInterval(() => {
        setDisplayNumber(animationNumbers[animationCounter]);
        animationCounter++;
    
        if (animationCounter === animationNumbers.length) {
            clearInterval(animationInterval);
            const randomNumberIndex = Math.floor(Math.random() * numerosDisponibles.length);
            const randomNumber = numerosDisponibles[randomNumberIndex];
    
            setDisplayNumber(randomNumber);
            console.log("random ",randomNumber);
            console.log("generados ", numerosGenerados);
            setIsAnimating(false);
            setNumerosGenerados((prevNumeros) => [...prevNumeros, randomNumber]);
            speak(randomNumber);
    
            setNumerosDisponibles((prevNumerosDisponibles) => {
            const updatedNumerosDisponibles = [...prevNumerosDisponibles];
            updatedNumerosDisponibles.splice(randomNumberIndex, 1);
                return updatedNumerosDisponibles;
            });
        }
        }, 50);
        setHasStarted(true);
    };

return (
    <div>
    <nav>
        <div className="headbt">
            
            <button onClick={reiniciarJuego}>Reiniciar Juego</button>
            <button
                onClick={generarNumeroAleatorio}
                disabled={numerosGenerados.length === 91}
            >
                Generar Número
            </button>
        </div>
    </nav>

    <div className="ball b2">
        {hasStarted && <Circulo displayNumber={displayNumber} />}
    </div>

    {numerosGenerados.length > 0 && (
        <div style={{ marginTop: "20px" }}>
        <h3>
            <b>Números Generados:</b>
        </h3>
        <div style={{ marginTop: "20px" }}>
            {numerosGenerados
            .slice()
            .reverse()
            .map(
                (numero, index) =>
                numero !== undefined && (
                    <span
                    className="ball b1"
                    key={index}
                    style={{ margin: "5px" }}
                    >
                    {numero}
                    </span>
                )
            )}
        </div>
        </div>
    )}
    </div>
);
};

export default Bombo;
