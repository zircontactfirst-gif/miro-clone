"use client";

import { useRoom, useSelf } from "@/liveblocks.config";
import LiveblocksProvider from "@liveblocks/yjs";
import { useEffect, useState } from "react";
import * as Y from "yjs";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { Loading } from "./loading";
import { 
    Bold, 
    Italic, 
    Strikethrough, 
    Heading1, 
    Heading2, 
    List, 
    ListOrdered,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const DocumentEditor = ({ boardId }: { boardId: string }) => {
    const room = useRoom();
    const [doc, setDoc] = useState<Y.Doc>();
    const [provider, setProvider] = useState<any>();
    
    const info = useSelf((me) => me.info);

    useEffect(() => {
        const yDoc = new Y.Doc();
        const yProvider = new LiveblocksProvider(room as any, yDoc as any);
        setDoc(yDoc);
        setProvider(yProvider);

        return () => {
            yDoc?.destroy();
            yProvider?.destroy();
        };
    }, [room]);

    if (!doc || !provider) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col h-[100dvh] w-full bg-[#F9FBFD] overflow-hidden">
            {/* Minimal Header */}
            <header className="h-[60px] bg-white border-b flex items-center px-4 md:px-6 shadow-sm shrink-0 justify-between">
                <div className="flex items-center gap-x-4">
                    <Link href="/dashboard" className="rounded-full p-2 hover:bg-neutral-100 transition">
                        <ArrowLeft className="h-5 w-5 text-neutral-600" />
                    </Link>
                    <div className="flex items-center gap-x-2">
                        <Image src="/logo.svg" alt="Logo" height={30} width={30} />
                        <span className="font-semibold text-lg text-neutral-700 hidden sm:block">Mordbord Docs</span>
                    </div>
                </div>
            </header>

            {/* Editor Area */}
            <main className="flex-1 overflow-hidden flex flex-col items-center">
                <TiptapEditor doc={doc} provider={provider} userInfo={info} />
            </main>
        </div>
    );
};

const TiptapEditor = ({ doc, provider, userInfo }: any) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({ 
                history: false // Collaboration handles history
            }), 
            Collaboration.configure({ 
                document: doc 
            }),
            CollaborationCursor.configure({
                provider: provider,
                user: {
                    name: userInfo?.name || "Anonymous",
                    color: userInfo?.picture ? "#3b82f6" : "#facc15", 
                },
            }),
        ],
        editorProps: {
            attributes: {
                class: 'prose prose-slate prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none w-full max-w-full min-h-screen pb-32',
            },
        },
    });

    return (
        <div className="flex flex-col w-full h-full relative items-center">
            {/* Editor Toolbar */}
            <div className="bg-white rounded-full shadow-md border px-4 py-2 flex items-center gap-x-1 mt-4 sm:mt-6 z-10 sticky top-4 overflow-x-auto max-w-[90vw] sm:max-w-max shrink-0">
                <button 
                    onClick={() => editor?.chain().focus().toggleBold().run()} 
                    className={`p-2 rounded hover:bg-neutral-100 transition ${editor?.isActive('bold') ? 'bg-neutral-200 text-blue-600' : 'text-neutral-600'}`}
                    title="Bold"
                >
                    <Bold className="h-4 w-4" />
                </button>
                <button 
                    onClick={() => editor?.chain().focus().toggleItalic().run()} 
                    className={`p-2 rounded hover:bg-neutral-100 transition ${editor?.isActive('italic') ? 'bg-neutral-200 text-blue-600' : 'text-neutral-600'}`}
                    title="Italic"
                >
                    <Italic className="h-4 w-4" />
                </button>
                <button 
                    onClick={() => editor?.chain().focus().toggleStrike().run()} 
                    className={`p-2 rounded hover:bg-neutral-100 transition ${editor?.isActive('strike') ? 'bg-neutral-200 text-blue-600' : 'text-neutral-600'}`}
                    title="Strikethrough"
                >
                    <Strikethrough className="h-4 w-4" />
                </button>
                <div className="w-[1px] h-6 bg-neutral-200 mx-1" />
                <button 
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} 
                    className={`p-2 rounded hover:bg-neutral-100 transition ${editor?.isActive('heading', { level: 1 }) ? 'bg-neutral-200 text-blue-600' : 'text-neutral-600'}`}
                    title="Heading 1"
                >
                    <Heading1 className="h-4 w-4" />
                </button>
                <button 
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} 
                    className={`p-2 rounded hover:bg-neutral-100 transition ${editor?.isActive('heading', { level: 2 }) ? 'bg-neutral-200 text-blue-600' : 'text-neutral-600'}`}
                    title="Heading 2"
                >
                    <Heading2 className="h-4 w-4" />
                </button>
                <div className="w-[1px] h-6 bg-neutral-200 mx-1" />
                <button 
                    onClick={() => editor?.chain().focus().toggleBulletList().run()} 
                    className={`p-2 rounded hover:bg-neutral-100 transition ${editor?.isActive('bulletList') ? 'bg-neutral-200 text-blue-600' : 'text-neutral-600'}`}
                    title="Bullet List"
                >
                    <List className="h-4 w-4" />
                </button>
                <button 
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()} 
                    className={`p-2 rounded hover:bg-neutral-100 transition ${editor?.isActive('orderedList') ? 'bg-neutral-200 text-blue-600' : 'text-neutral-600'}`}
                    title="Numbered List"
                >
                    <ListOrdered className="h-4 w-4" />
                </button>
            </div>

            {/* Document Canvas */}
            <div className="flex-1 w-full overflow-y-auto pt-6 px-2 sm:px-6 md:px-0">
                <div className="bg-white mx-auto shadow-sm border rounded-lg p-8 sm:p-12 md:p-20 max-w-[850px] min-h-[1056px] mb-20">
                    <EditorContent editor={editor} />
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                .collaboration-cursor__caret {
                    border-left: 1px solid #0d0d0d;
                    border-right: 1px solid #0d0d0d;
                    margin-left: -1px;
                    margin-right: -1px;
                    pointer-events: none;
                    position: relative;
                    word-break: normal;
                }
                .collaboration-cursor__label {
                    border-radius: 3px 3px 3px 0;
                    color: #fff;
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 600;
                    left: -1px;
                    line-height: normal;
                    padding: 0.1rem 0.3rem;
                    position: absolute;
                    top: -1.4em;
                    user-select: none;
                    white-space: nowrap;
                }
            `}} />
        </div>
    );
};
