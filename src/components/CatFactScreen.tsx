import React, { useState, useEffect } from "react";
import LoadingDots from "./LoadingDots";
import useMeow from "../hooks/useMeow";
import {useSong} from "../hooks/useSounds";
import ShareCard from "./ShareCard";
import { set } from "date-fns";

interface CatFactScreenProps {
  name: string;
}

const CatFactScreen: React.FC<CatFactScreenProps> = ({ name }) => {
  const [fact, setFact] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [key, setKey] = useState(0);
  const playMeow = useMeow();
  const playSong = useSong();
  const [share , setShare ] = useState <boolean>(false)
  useEffect(() => {
  if (name.trim().toLowerCase() === "suhani") {
    playSong(true); // assuming true = loop
  }
}, [name]);
  

  const handleSharing = () => {
    setShare(true);
  }
  const fetchCatContent = async () => {
    playMeow();
    setLoading(true);
    setError(null);
    setShare(false);
    try {
      const [factRes, imgRes] = await Promise.all([
        fetch("https://catfact.ninja/fact"),
        fetch("https://api.thecatapi.com/v1/images/search"),
      ]);

      if (!factRes.ok || !imgRes.ok) throw new Error("Failed to fetch");

      const factData = await factRes.json();
      const imgData = await imgRes.json();

      setFact(factData.fact);
      setImageUrl(imgData[0].url);
      setKey((k) => k + 1);
    } catch {
      setError("Oops! The cats are napping 😿 Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in w-full max-w-lg mx-auto">
      <div className="text-5xl animate-float">🐾</div>
      <h2 className="font-display text-3xl font-bold text-foreground text-center">
        Yay, {name}! 🎉
      </h2>
      <p className="text-muted-foreground text-center font-body text-lg">
        Let's explore the world of cats together~ 🌸
      </p>
      <button
        onClick={fetchCatContent}
        disabled={loading}
        className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-display font-semibold text-lg
          shadow-lg hover:shadow-xl hover:scale-110 active:scale-95
          transition-all duration-300 animate-pulse-glow
          disabled:opacity-60 disabled:hover:scale-100"
      >
        {loading ? "Loading..." : "Click for Cat Fact 🐱✨"}
      </button>

      {loading && <LoadingDots />}

      {error && (
        <p className="text-destructive font-body text-center bg-destructive/10 px-4 py-2 rounded-lg">
          {error}
        </p>
      )}

      {fact && !loading && (
        <div key={key} className="animate-fade-in w-full">
          <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
            <p className="font-body text-lg text-card-foreground leading-relaxed text-center">
              "{fact}"
            </p>
          </div>

          {imageUrl && (
            <div className="mt-4 rounded-2xl overflow-hidden shadow-lg border border-border">
              <img
                src={imageUrl}
                alt="A cute cat"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
            </div>
          )}
        </div>
      )}

      {share ? (<ShareCard fact={fact} imageUrl={"https://cataas.com/cat"} />) : (<button onClick={handleSharing}>make shareable post 💖✨</button>)}
    </div>
  );
};

export default CatFactScreen;
