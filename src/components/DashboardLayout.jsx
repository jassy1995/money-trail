import Navbar from './Navbar';
import Footer from './DesktopFooter';
import useWindowSize from '../hooks/useWindowSize';

export default function DashboardLayout({ children }) {
    const { width } = useWindowSize()

    return (
        <>
            <div className="w-full h-screen overflow-y-auto px-4 xs:px-10 sm:px-20 md:px-48 pt-6 pb-28">
                <Navbar />
                <div className="mt-7">
                    {children}
                </div>
            </div>
            <Footer />
        </>

    )
}



