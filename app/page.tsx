"use client";

import { SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, MousePointer2, Share2, Zap } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-[100dvh] flex flex-col bg-slate-50 dark:bg-background overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-100/50 to-transparent dark:from-blue-900/20 -z-10" />
            
            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 py-4 md:px-12 bg-transparent">
                <div className="flex items-center gap-x-2">
                    <Image src="/logo.svg" alt="Mordbord Logo" width={40} height={40} className="drop-shadow-sm" />
                    <span className="text-xl font-bold font-sans tracking-tight text-primary">Mordbord</span>
                </div>
                <div className="flex items-center gap-x-4">
                    <SignedIn>
                        <Button asChild variant="outline" className="hidden sm:flex text-sm font-medium">
                            <Link href="/dashboard">Dashboard</Link>
                        </Button>
                        <SignOutButton>
                            <Button variant="ghost" className="text-sm font-medium">Log out</Button>
                        </SignOutButton>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton afterSignInUrl="/dashboard" afterSignUpUrl="/dashboard">
                            <Button variant="ghost" className="text-sm font-medium">
                                Log in
                            </Button>
                        </SignInButton>
                        <SignInButton afterSignInUrl="/dashboard" afterSignUpUrl="/dashboard">
                            <Button className="text-sm font-medium shadow-md shadow-primary/20 transition-transform hover:scale-105">
                                Try for free
                            </Button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-24 md:pt-32">
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full bg-blue-100/80 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 text-sm font-medium ring-1 ring-inset ring-blue-200/50 dark:ring-blue-800/50 backdrop-blur-sm animate-fade-in-up">
                    <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
                    Now with real-time collaboration
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance max-w-4xl text-slate-900 dark:text-slate-50 mb-6 drop-shadow-sm leading-[1.1]">
                    Think, plan, and create <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">together.</span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 text-balance font-medium leading-relaxed">
                    Mordbord is your ultimate visual workspace. Bring your team's ideas to life on an infinite canvas with real-time syncing, smart tools, and zero boundaries.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                    <SignedIn>
                        <Button asChild size="lg" className="h-14 px-8 text-base font-semibold shadow-xl shadow-blue-500/20 rounded-full transition-all hover:-translate-y-1 hover:shadow-blue-500/30 w-full sm:w-auto">
                            <Link href="/dashboard">
                                Go to Workspace <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton afterSignInUrl="/dashboard" afterSignUpUrl="/dashboard">
                            <Button size="lg" className="h-14 px-8 text-base font-semibold shadow-xl shadow-blue-500/20 rounded-full transition-all hover:-translate-y-1 hover:shadow-blue-500/30 w-full sm:w-auto">
                                Start planning for free <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </SignInButton>
                    </SignedOut>
                </div>

                <div className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4 text-left">
                    <div className="flex flex-col items-center md:items-start p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-transform hover:-translate-y-1 duration-300">
                        <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                            <Share2 className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Real-time Syncing</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-center md:text-left leading-relaxed">
                            See changes instantly as your team collaborates from anywhere in the world.
                        </p>
                    </div>
                    
                    <div className="flex flex-col items-center md:items-start p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-transform hover:-translate-y-1 duration-300 delay-100">
                        <div className="h-12 w-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                            <Layers className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Infinite Canvas</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-center md:text-left leading-relaxed">
                            Never run out of space. Zoom in to focus or zoom out to see the big picture.
                        </p>
                    </div>
                    
                    <div className="flex flex-col items-center md:items-start p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-transform hover:-translate-y-1 duration-300 delay-200">
                        <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                            <Zap className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Smart Tools</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-center md:text-left leading-relaxed">
                            Sticky notes, shapes, freehand drawing and more intuitive tools at your fingertips.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-auto py-8 text-center text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md">
                <p>&copy; {new Date().getFullYear()} Mordbord. Built for highly effective teams.</p>
            </footer>
        </div>
    );
}
