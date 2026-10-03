import NavbarDesktop from '@/components/layout/NavbarDesktop'
import NavbarMobile from '@/components/layout/NavbarMobile'

const Navbar = () => {
    return (
        <nav className="fixed w-full top-0 left-0 z-50">
            <NavbarDesktop />
            <NavbarMobile />
        </nav>
    )
}

export default Navbar