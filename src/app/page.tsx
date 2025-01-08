'use client';
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useState } from "react";

export default function Home() {
  const [playing, setPlaying] = useState<boolean>(false);
  const [rounds, setRounds] = useState<number>(0);
  const colors: string[] = ["green", "yellow", "red", "blue"];
  let answerArray: string[] = [];
  let guessArray: string[] = [];

  // Tone paths
  const green: string = "/tones/tone1.mp3";
  const blue: string = "/tones/tone2.mp3";
  const yellow: string = "/tones/tone3.mp3";
  const red: string = "/tones/tone4.mp3";

  // Function to play a tone
  const playTone = (tonePath: string) => {
    const audio: HTMLAudioElement = new Audio(tonePath);
    audio.play();
  } // end playTone()

  // Function to generate a new color
  const newColor = () => {
    return colors[Math.floor(Math.random() * 4)];
  } // end newColor()

  // Handler for clicking a color button
  const handleClick = (toneName: string) => {
    // if gameRunning = false - allow for freeplay of buttons
    // if gameRunning = true - begin game:
    // if playersTurn = false - disable buttons until answerArray completes it playthrough
    // if playersTurn = true - enable buttons and check for correct answer(s)

    switch (toneName) {
      case "green":
        document.getElementById("green")?.classList.add("!bg-green-400");
        playTone(green);
        break;
      case "red":
        document.getElementById("red")?.classList.add("!bg-red-400");
        playTone(red);
        break;
      case "yellow":
        document.getElementById("yellow")?.classList.add("!bg-yellow-400");
        playTone(yellow);
        break;
      case "blue":
        document.getElementById("blue")?.classList.add("!bg-blue-400");
        playTone(blue);
        break;
      default:
        console.log('nothing');
        break;
    }

    setTimeout(() => {
      document.getElementById(toneName)?.classList.remove(`!bg-${toneName}-400`);
    }, 300);

  }; // end handleClick()

  // Handler that starts the game (play button)
  const handlePlayButton = () => {
    let count: number = 400;
    setRounds(rounds + 1);
    setPlaying(true);

    // clear user guesses
    for (let index = 0; index < guessArray.length; index++) {
      guessArray.pop();
    }

    // collect a new color to add to answerArray
    const randColor: string = newColor();
    answerArray.push(randColor);

    // for each element in answerArray, play tone and light up corresponding button accordingly
    answerArray.map((answer) => {
      setTimeout(() => {
        handleClick(answer);
      }, count);
      count += 400;
    });
  } // end handlePlayButton()

  // Handler to quit current game
  const handleExitButton = () => {
    setRounds(0);

    // clear user guesses
    for (let index = 0; index < guessArray.length; index++) {
      guessArray.pop();
    }

    // clear answers
    for (let index = 0; index < answerArray.length; index++) {
      answerArray.pop();
    }

    setPlaying(false);
  }

  /*
      When play is clicked:
        RAND color is picked and added to an array. then for each color in array, tone is played and button lights up accordingly
        player clicks button(s) and upon each click, each button is added to an array that is checked against the computer array
        IF all guesses are correct, the player array is wiped clean and the loop begins again
        ELSE game over

        if the answer is wrong, maybe have a pop up window that displays "game over" and the rounds completed, then the close button will trigger the exit button handler
  */

  // GUI
  return (
    <main className="bg-neutral-950 h-screen flex flex-col gap-5 items-center justify-center">
      {!playing ? <p className="text-white text-2xl">Welcome to Simon</p> : <p className="text-white text-2xl">Good luck</p>}
      {rounds > 0 ? <p className="text-blue-400">Rounds: {rounds}</p> : <p className="text-white">Click play below to begin</p>}
      <div className="w-[280px] h-[280px] border-8 border-black flex justify-center items-center p-4 bg-neutral-900">
        <div className="w-full h-full flex flex-wrap justify-between items-center relative">
          <p id='green' onClick={() => handleClick("green")} className="rounded-none rounded-tl-full w-1/2 h-1/2 bg-green-800 p-0 cursor-pointer"></p>
          <p id='red' onClick={() => handleClick("red")} className="rounded-none rounded-tr-full w-1/2 h-1/2 bg-red-800 p-0 cursor-pointer"></p>
          <p id='blue' onClick={() => handleClick("blue")} className="rounded-none rounded-bl-full w-1/2 h-1/2 bg-blue-800 p-0 cursor-pointer"></p>
          <p id='yellow' onClick={() => handleClick("yellow")} className="rounded-none rounded-br-full w-1/2 h-1/2 bg-yellow-800 p-0 cursor-pointer"></p>
          <p className="rounded-full bg-white h-16 w-16 absolute top-[83px] left-[84px] p-0 text-black font-bold z-50 flex items-center justify-center hover:cursor-pointer">Simon</p>
        </div>
      </div>
      <div className="w-[280px] mx-auto flex flex-nowrap justify-center items-center gap-4">
        <Button onClick={!playing ? handlePlayButton : () => { console.log('currently in game') }} className={clsx(`w-full text-xl`, playing ? "text-neutral-400 !bg-secondary" : "bg-primary")}>Play</Button>
        <Button onClick={!playing ? () => { console.log('not currently in a game') } : handleExitButton} className={clsx(`w-full text-xl`, playing ? "bg-primary" : " !bg-secondary text-neutral-400")}>Exit</Button>
      </div>
    </main>
  );
}
