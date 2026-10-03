"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { realidadVirtualLinks } from "./navbarLinks";

const NavbarDesktop = () => {
  const [isRealityVirtualMenuOpen, setIsRealityVirtualMenuOpen] = useState(false);

  const closeRealityVirtualMenu = () => {
    setIsRealityVirtualMenuOpen(false);
  };

  return (
    <div className="hidden md:flex flex-col">
      <div
        className="flex w-full p-5 justify-center items-center md:gap-5 lg:gap-14 text-white font-bold text-center bg-black/80"
      >
        <div className="flex items-center md:gap-2 lg:gap-5 text-sm lg:text-base">
          <Link className="px-4 py-2" href="/">
            Inicio
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setIsRealityVirtualMenuOpen(true)}
            onMouseLeave={closeRealityVirtualMenu}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                closeRealityVirtualMenu();
              }
            }}
          >
            <button
              aria-expanded={isRealityVirtualMenuOpen}
              aria-haspopup="true"
              className={`px-4 py-2 flex gap-3 items-center rounded-t ${
                isRealityVirtualMenuOpen ? "bg-white/10" : ""
              }`}
              onClick={() => setIsRealityVirtualMenuOpen((previousValue) => !previousValue)}
              onFocus={() => setIsRealityVirtualMenuOpen(true)}
              type="button"
            >
              <i
                className={`bi bi-caret-down-fill transition-transform ${
                  isRealityVirtualMenuOpen ? "rotate-180" : ""
                }`}
              ></i>
              <span>
                La Realidad
                <br />
                Virtual
              </span>
            </button>
            <div
              className={`absolute left-0 top-full min-w-80 bg-white text-neutral-900 rounded-b rounded-r shadow-2xl z-50 transition-all duration-150 ${
                isRealityVirtualMenuOpen
                  ? "visible opacity-100 pointer-events-auto"
                  : "invisible opacity-0 pointer-events-none"
              }`}
            >
              {realidadVirtualLinks.map((item) => (
                <Link
                  key={item.href}
                  className="block px-3 py-2 text-left hover:bg-neutral-100"
                  href={item.href}
                  onClick={closeRealityVirtualMenu}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <Link className="px-4 py-2" href="/blogs/notikonscio">
            NotiKonscio
          </Link>
        </div>

        <Image
          alt="Logo de Fundación Proyecta Konscio"
          width={250}
          height={85}
          className="md:w-28 h-auto lg:w-64"
          src="/images/logo_with_text.svg"
        />

        <div className="flex items-center md:gap-2 lg:gap-5 text-sm lg:text-base">
          <Link className="px-4 py-2" href="/colabora">
            Colabora
          </Link>
          <Link className="px-4 py-2" href="/webrtc-espacios-3d">
            <span className="text-nowrap">WebRTC y</span>
            <br />
            <span className="text-nowrap">Espacios 3D</span>
          </Link>
          <Link className="px-4 py-2" href="/blogs/proyectos">
            Proyectos
          </Link>
        </div>
      </div>
      <div
        className="w-full h-8"
        style={{ background: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0))" }}
      ></div>
    </div>
  );
};

export default NavbarDesktop;
