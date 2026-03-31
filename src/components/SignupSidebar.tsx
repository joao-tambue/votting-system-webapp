// 📁 components/SignupSidebar.tsx
import React, { useState, useEffect } from "react";

const SignupSidebar: React.FC = () => {
  // Imagens de fundo (você pode adicionar quantas quiser)
  const backgroundImages = [
    "/image1.png",
    "/image3.png",
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Troca automática de imagem a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="relative min-h-screen flex-1 flex items-end justify-center p-12 overflow-hidden">
      {/* Conjunto de imagens passando no fundo */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentBgIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Overlay escuro para legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />

      <div className="relative z-10 max-w-xl">
        <div>
          <h2 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
            Junte-se a nós e faça sua voz ser ouvida!
          </h2>
          <p className="text-lg text-gray-200">
            Participe do sistema de votação do Colégio Árvore da Felicidade e
            ajude a moldar o futuro da nossa comunidade escolar. Cadastre-se
            agora e tenha acesso a votações exclusivas, resultados em tempo
            real e muito mais!
          </p>
        </div>

        {/* Bolinhas de navegação (clicáveis) */}
        <div className="flex justify-center gap-3 mt-12">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBgIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentBgIndex
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignupSidebar;