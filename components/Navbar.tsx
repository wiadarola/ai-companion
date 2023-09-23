"use client";

import { cn } from "@/lib/utils";
import { Menu, Sparkles } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./theme-toggle";
import MobileSidebar from "@/components/MobileSidebar";
import { useRouter } from "next/navigation";

const font = Poppins({ weight: "600", subsets: ["latin"] });

interface NavbarProps {
    user?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
    const router = useRouter();

    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary  h-16">
            <div className="flex items-center">
                <MobileSidebar />
                < Link href="/" />
                <h1 className={cn("hidden md:block text-xl md:text-3xl font-bold text-primary", font.className)}>
                    companion.ai
                </h1>
            </div>
            <div className="flex items-center gap-x-3">
                <Button variant={"premium"} size="sm" className="gap-x-1">
                    Upgrade
                    <Sparkles className="h-4 w-4 fill-white text-white" size={18} />
                </Button>
                <ModeToggle />
                <UserButton />
                {!user && (
                    <>
                        <Link href="/sign-in">
                            <Button variant={"secondary"} size="sm">
                                Sign <In></In>
                            </Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button variant={"secondary"} size="sm">
                                Sign Up
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;