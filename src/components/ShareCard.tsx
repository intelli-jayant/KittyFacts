import React, { useRef, useState } from "react";
import { toBlob } from "html-to-image";

interface Props {
  fact: string;
  imageUrl: string;
}

const ShareCard: React.FC<Props> = ({ fact, imageUrl }) => {
  const shareRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"square" | "story" | "soft">("square");

  const generateImage = async () => {
    if (!shareRef.current) return null;
    return await toBlob(shareRef.current);
  };

  const handleShare = async () => {
    const blob = await generateImage();
    if (!blob) return;

    const file = new File([blob], "fact.png", { type: "image/png" });

    if (navigator.share) {
      await navigator.share({
        files: [file],
        title: "Cute fact! 🐶🐱",
        text: "this is too cute 😭💖",
      });
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "fact.png";
      a.click();
    }
  };

  return (
    <div>
      {/* TEMPLATE SWITCH */}
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <button onClick={() => setMode("square")}>📸 Post</button>
        <button onClick={() => setMode("story")}>✨ Story</button>
        <button onClick={() => setMode("soft")}>💖 Soft</button>
      </div>

      {/* SHARE CARD */}
      <div ref={shareRef}>
        {mode === "square" && (
          <div style={{
            width: 320,
            height: 320,
            padding: 16,
            borderRadius: 24,
            background: "linear-gradient(135deg, #ffdde1, #ee9ca7)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "center"
          }}>
            <img src={imageUrl} style={{ borderRadius: 16 }} />
            <p style={{ fontWeight: 600 }}>{fact}</p>
          </div>
        )}

        {mode === "story" && (
          <div style={{
            width: 300,
            height: 540,
            padding: 20,
            borderRadius: 30,
            background: "linear-gradient(180deg, #fbc2eb, #a6c1ee)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 20,
            textAlign: "center"
          }}>
            <img src={imageUrl} style={{ borderRadius: 20 }} />
            <p style={{ fontSize: 18, fontWeight: "bold" }}>{fact}</p>
          </div>
        )}

        {mode === "soft" && (
          <div style={{
            width: 300,
            padding: 16,
            borderRadius: 20,
            background: "#fff0f6",
            textAlign: "center",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
          }}>
            <img src={imageUrl} style={{ borderRadius: 12 }} />
            <p>{fact}</p>
          </div>
        )}
      </div>

      {/* SHARE BUTTON */}
      <button
        onClick={handleShare}
        style={{
          marginTop: 12,
          padding: "12px 18px",
          borderRadius: 999,
          background: "linear-gradient(90deg, #ff9a9e, #fad0c4)",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Share this cuteness 🐱💖✨
      </button>
    </div>
  );
};

export default ShareCard;