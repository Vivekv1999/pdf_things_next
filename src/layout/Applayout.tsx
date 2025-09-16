import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface AppLayoutProps {
    children: ReactNode;
}

const Applayout = ({ children }: AppLayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow min-h-screen">{children}</main>
            <Footer />
        </div>
    )
}

export default Applayout
