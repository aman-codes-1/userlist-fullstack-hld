"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { fonts } from "@/config/fonts";

type Font = (typeof fonts)[number];

interface FontContextType {
  font: Font;
  setFont: (font: Font) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [font, _setFont] = useState<Font>(fonts[0]);

  useEffect(() => {
    const savedFont = localStorage.getItem("font") as Font;
    if (savedFont && fonts.includes(savedFont)) {
      setFont(savedFont);
    }
  }, []);

  useEffect(() => {
    const applyFont = (font: string) => {
      const root = document.documentElement;
      root.classList.forEach((cls) => {
        if (cls.startsWith("font-")) root.classList.remove(cls);
      });
      root.classList.add(`font-${font}`);
    };

    applyFont(font);
  }, [font]);

  const setFont = (font: Font) => {
    localStorage.setItem("font", font);
    _setFont(font);
  };

  return <FontContext value={{ font, setFont }}>{children}</FontContext>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFont = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
};
