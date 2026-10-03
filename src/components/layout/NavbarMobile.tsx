"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { realidadVirtualLinks } from "./navbarLinks";

const NavbarMobile = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileRealidadVirtualOpen, setIsMobileRealidadVirtualOpen] = useState(false);

    const closeMobileMenus = () => {
        setIsMobileMenuOpen(false);
        setIsMobileRealidadVirtualOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const toggleMobileRealidadVirtual = () => {
        setIsMobileRealidadVirtualOpen((prev) => !prev);
    };

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isMobileMenuOpen]);

    return (
        <div className={`${isMobileMenuOpen ? "h-dvh" : "h-auto"} w-dvw overflow-hidden md:hidden flex flex-col bg-white`}>
            <div>
                <div className="h-24 flex justify-between items-center p-5">
                    <Image
                        alt="Logo de Fundación Proyecta Konscio"
                        width={250}
                        height={85}
                        className="w-40 h-auto"
                        src="/images/logo_with_text.svg"
                    />
                    <button
                        className="text-3xl aspect-square size-12 p-1 border border-solid border-neutral-400 active:bg-neutral-300 text-neutral-600"
                        aria-expanded={isMobileMenuOpen}
                        aria-label="Abrir o cerrar menu"
                        type="button"
                        onClick={toggleMobileMenu}
                    >
                        <i className={isMobileMenuOpen ? "bi bi-x" : "bi bi-list"}></i>
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <div className="flex flex-col gap-2 px-4 text-neutral-700 font-bold">
                        <Link className="" href="/" onClick={closeMobileMenus}>
                            Inicio
                        </Link>

                        <button
                            className="w-full flex items-center justify-between "
                            aria-expanded={isMobileRealidadVirtualOpen}
                            aria-label="Abrir o cerrar sub menu de Realidad Virtual"
                            type="button"
                            onClick={toggleMobileRealidadVirtual}
                        >
                            <span>La Realidad Virtual</span>
                            <i className={isMobileRealidadVirtualOpen ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"}></i>
                        </button>

                        {isMobileRealidadVirtualOpen && (
                            <div className="pl-10 max-h-64 overflow-y-auto flex flex-col gap-2 font-bold">
                                {realidadVirtualLinks.map((item) => (
                                    <Link
                                        key={`mobile-${item.href}`}
                                        href={item.href}
                                        onClick={closeMobileMenus}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}

                        <Link className="" href="/blogs/notikonscio" onClick={closeMobileMenus}>
                            NotiKonscio
                        </Link>
                        <Link className="" href="/colabora" onClick={closeMobileMenus}>
                            Colabora
                        </Link>
                        <Link className="" href="/webrtc-espacios-3d" onClick={closeMobileMenus}>
                            WebRTC y Espacios 3D
                        </Link>
                        <Link className="" href="/blogs/proyectos" onClick={closeMobileMenus}>
                            Proyectos
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavbarMobile;
