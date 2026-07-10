import React, { useEffect, useState } from "react";
import Sparkles from "../components/Sparkles";
import NameScreen from "../components/NameScreen";
import LoveQuestion from "../components/LoveQuestion";
import CatFactScreen from "../components/CatFactScreen";
import FavouriteTeacher from "@/components/FavouriteTeacher";
import DogFactScreen from "@/components/DogFactScreen";
import {useBirthday} from "../hooks/useSounds";
type Step = "name" | "love" | "catfacts"|"teacher"|"reply" | "dogfacts" | "birthday";

const Index: React.FC = () => {
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const playBirthday = useBirthday();
  //   useEffect(() => {
  //   if (step === "reply") {
  //     const timer = setTimeout(() => {
  //       setStep("love");
  //     }, 3000);

  //     return () => clearTimeout(timer); // cleanup
  //   }
  // }, [step]);
  useEffect(() => {
  if (step === "reply") {
    const timer = setTimeout(() => {
      const lower = name.trim().toLowerCase();

      const isBirthdayPerson =
        lower === "sweta" || lower === "shweta";

      const today = new Date();
      const isBirthday =
        today.getDate() === 10 &&
        today.getMonth() === 6; // July

      if (isBirthdayPerson && isBirthday) {
        setStep("birthday");
      } else {
        setStep("love");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [step, name]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Pastel gradient blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-lavender/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-peach/40 blur-3xl pointer-events-none" />
      <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] rounded-full bg-baby-blue/30 blur-3xl pointer-events-none" />

      <Sparkles />

      <div className="relative z-10 w-full max-w-lg">
        {step === "name" && (
          <NameScreen
            onContinue={(n) => {
               const name = n.trim().toLowerCase();
               setName(n);
               const Names = ["suhani", "suhani pandey", "aditya", "anibha", "anibha bharti", "sweta", "shweta"];
              if (Names.includes(name)) {
                  setStep("teacher");} 
              else {
                  setStep("love");
                }
            }}
          />
        )}

        {step === "teacher" && (
          <FavouriteTeacher name={name} onYes={() => setStep("reply")} />
        )}

      {step === "reply" && (
          <div className="flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
            
            <div className="text-5xl animate-bounce">
              {name.trim().toLowerCase() === "aditya"? "😤" : "😎✨"}
            </div>

            <h1 className="text-3xl font-bold drop-shadow-md">
              {name.trim().toLowerCase() === "aditya"
                ? "But Jayant hates you 😒"
                : "I Knew it 💖"}
            </h1>

            <p className="text-lg text-muted-foreground">
              {name.trim().toLowerCase() === "aditya"
                ? "Just kidding... or maybe not 😏"
                : "You're too predictable 😌🐱"}
            </p>

          </div>
        )}
        {step === "love" && (
          <LoveQuestion name={name} onCat={() => setStep("catfacts")} onDog={() => setStep("dogfacts")} />
        )}

        {step === "birthday" && (
     playBirthday(true),
          
  <div className="flex flex-col items-center justify-center text-center space-y-5 animate-fade-in">

    <div className="text-5xl animate-bounce">
      It's 10th july
      🎉
    </div>

    <h1 className="text-4xl font-bold text-pink-500">
      Happy Birthday, {name}! 🎂
    </h1>

    <p className="text-lg text-muted-foreground">
      Wishing you lots of happiness, success, and smiles.
      Hope this year brings everything you've been wishing for! 🥳✨
    </p>
    <p className="text-lg text-muted-foreground">
      ~ by Jayant
    </p>

  </div>
)}

        {step === "catfacts" && <CatFactScreen name={name} />}

        {step === "dogfacts" && <DogFactScreen name={name} />}
      </div>
    </div>
  );
};

export default Index;
