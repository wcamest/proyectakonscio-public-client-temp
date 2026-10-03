import Link from "next/link";
import ContactButton from "./ContactButton";

const Footer = () => {
    return (
        <footer className="p-14 bg-neutral-950 text-neutral-50 flex flex-col md:flex-row justify-center md:justify-between items-center gap-10 md:gap-0">
            <div className="flex flex-col gap-1 font-bold text-left order-1 md:order-0">
                <Link className="underline underline-offset-2 hover:text-sky-300" href="/aviso-legal">
                    Aviso legal
                </Link>
                <Link className="underline underline-offset-2 hover:text-sky-300" href="/politicas-de-privacidad">
                    Política de privacidad
                </Link>
                <Link className="underline underline-offset-2 hover:text-sky-300" href="/politica-de-cookies">
                    Política de cookies
                </Link>
                <ContactButton />
            </div>

            <div className="max-w-52 text-center flex flex-col order-0 md:order-1">
                <span>Bajo el auspicio de Fundación Proyecta Konscio</span>
                <span>2016 - 2026</span>
            </div>

            <div className="text-4xl flex gap-10 order-2">
                <a
                    href="https://facebook.com/ProyectaKonscio"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook de Proyecta Konscio"
                >
                    <i className="bi bi-facebook"></i>
                </a>
                <a
                    href="https://www.instagram.com/proyectakonscio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram de Proyecta Konscio"
                >
                    <i className="bi bi-instagram"></i>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
