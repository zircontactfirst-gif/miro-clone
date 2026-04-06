"use client";

import { Loading } from "@/components/auth/loading";
import { Navbar } from "./_components/navbar";
import { OrgSidebar } from "./_components/org-sidebar";
import Sidebar from "./_components/sidebar";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface DashBoardLayoutProps {
    children?: React.ReactNode;
}

const UnauthenticatedRedirect = () => {
    const router = useRouter();
    useEffect(() => {
        router.push("/");
    }, [router]);
    return <Loading />;
};

const DashBoardLayout = ({ children }: DashBoardLayoutProps) => {
    return (
        <main className="h-full">
            <AuthLoading>
                <Loading />
            </AuthLoading>
            <Unauthenticated>
                <UnauthenticatedRedirect />
            </Unauthenticated>
            <Authenticated>
                <Sidebar />
                <div className="pl-[60px] h-full">
                    <div className="flex h-full">
                        <OrgSidebar />
                        <div className="border-l border-gray-300 h-full" />
                        <div className="h-full flex-1">
                            <Navbar />
                            {children}
                        </div>
                    </div>
                </div>
            </Authenticated>
        </main>
    );
};

export default DashBoardLayout;
