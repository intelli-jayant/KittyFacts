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
  <div style={{ width: "100%", maxWidth: 400, margin: "0 auto" }}>
    
    {/* TEMPLATE SWITCH */}
    <div
      style={{
        display: "flex",
        gap: 8,
        marginBottom: 12,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <button onClick={() => setMode("square")}>📸 Post</button>
      <button onClick={() => setMode("story")}>✨ Story</button>
      <button onClick={() => setMode("soft")}>💖 Soft</button>
    </div>

    {/* SHARE CARD WRAPPER */}
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div ref={shareRef} style={{ width: "100%" }}>

        {/* SQUARE */}
        {mode === "square" && (
          <div
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              padding: 16,
              borderRadius: 24,
              background: "linear-gradient(135deg, #ffdde1, #ee9ca7)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            <img
              src={imageUrl}
              crossOrigin="anonymous"
              style={{
                width: "100%",
                height: "60%",
                objectFit: "cover",
                borderRadius: 16,
              }}
            />
            <p style={{ fontWeight: 600, fontSize: "0.95rem" }}>
              {fact}
            </p>
          </div>
        )}

        {/* STORY */}
        {mode === "story" && (
          <div
            style={{
              width: "100%",
              aspectRatio: "9 / 16",
              padding: 16,
              borderRadius: 30,
              background: "linear-gradient(180deg, #fbc2eb, #a6c1ee)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 16,
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            <img
              src={imageUrl}
              crossOrigin="anonymous"
              style={{
                width: "100%",
                maxHeight: "60%",
                objectFit: "cover",
                borderRadius: 20,
              }}
            />
            <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
              {fact}
            </p>
          </div>
        )}

        {/* SOFT */}
        {mode === "soft" && (
          <div
            style={{
              width: "100%",
              padding: 16,
              borderRadius: 20,
              background: "#fff0f6",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              boxSizing: "border-box",
            }}
          >
            <img
              src={imageUrl}
              crossOrigin="anonymous"
              style={{
                width: "100%",
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
            <p style={{ fontSize: "0.95rem" }}>{fact}</p>
          </div>
        )}
      </div>
    </div>

    {/* SHARE BUTTON */}
    <button
      onClick={handleShare}
      style={{
        marginTop: 14,
        width: "100%",
        padding: "12px",
        borderRadius: 999,
        background: "linear-gradient(90deg, #ff9a9e, #fad0c4)",
        border: "none",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      Share this cuteness 💖✨
    </button>
  </div>
);
};

export default ShareCard;