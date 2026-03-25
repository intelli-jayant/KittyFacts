import React, { useState } from "react";
import LoadingDots from "./LoadingDots";
import {useWoof} from "../hooks/useSounds";
import ShareCard from "./ShareCard";

interface DogFactScreenProps {
  name: string;
}

const DogFactScreen: React.FC<DogFactScreenProps> = ({ name }) => {
  const [fact, setFact] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [key, setKey] = useState(0);
  const playWoof = useWoof();
  const [share , setShare ] = useState <boolean>(false)


  const handleSharing = () => {
    setShare(true);
  }
  const fetchCatContent = async () => {
    playWoof();
    setLoading(true);
    setError(null);
    setShare(false);

    try {
      const [factRes, imgRes] = await Promise.all([
        fetch("https://dogapi.dog/api/v2/facts"),
        fetch("https://dog.ceo/api/breeds/image/random"),
      ]);

      if (!factRes.ok || !imgRes.ok) throw new Error("Failed to fetch");

      const factData = await factRes.json();
      const imgData = await imgRes.json();

      setFact(factData.data[0].attributes.body);
      setImageUrl(imgData?.message);
      setKey((k) => k + 1);
    } catch {
      setError("Oops! The Dogs are napping 🐶 Try again!");
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
        Let's explore the world of Dogs together~ 🌸
      </p>
      <button
        onClick={fetchCatContent}
        disabled={loading}
        className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-display font-semibold text-lg
          shadow-lg hover:shadow-xl hover:scale-110 active:scale-95
          transition-all duration-300 animate-pulse-glow
          disabled:opacity-60 disabled:hover:scale-100"
      >
        {loading ? "Loading..." : "Click for Dog Fact 🐶✨"}
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
                alt="A cute Dog"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
            </div>
          )}
        </div>
      )}

      
      {share ? (<ShareCard fact={fact} imageUrl={imageUrl} />
) : (
  <button onClick={handleSharing}>make shareable post 💖✨</button>
)}
    </div>
  );
};

export default DogFactScreen;
