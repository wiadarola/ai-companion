import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { currentUser } from "@clerk/nextjs";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    const user = currentUser();
    return (
        <div className="h-full">
            <Navbar user={user !== null} />
            <div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0">
                <Sidebar />
            </div>
            <main className="md:pl-20 pt-16 h-full">
                {children}
            </main>
        </div>
    );
}

export default RootLayout;