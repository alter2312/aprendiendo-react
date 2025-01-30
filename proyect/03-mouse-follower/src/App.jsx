import { useEffect, useState } from "react";

function App() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleClick = () => {
    setEnabled(!enabled);
  };

  useEffect(() => {
    const handlePointerMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    };

    if (enabled) {
      window.addEventListener("pointermove", handlePointerMove);
    } else {
      setPosition({ x: 0, y: 0 }); // Reset position when disabled
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [enabled]); // Dependencia en `enabled`

  return (
    <main>
      <div
        className="circle"
        style={{
          position: "absolute",
          backgroundColor: "#09f",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          transform: `translate(${position.x}px, ${position.y}px)`, // Corregido
        }}
      ></div>
      <button onClick={handleClick}>
        {enabled ? "Desactivar" : "Activar"} Follower Mouse
      </button>
    </main>
  );
}

export default App;
