"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface UserData {
    username: string;
    email: string;
    isVerified: boolean;
}

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [loggingOut, setLoggingOut] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${BASE}/api/users/me`);
                setUser(res.data.data);
            } catch {
                // token invalid or expired, middleware will redirect
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const onLogout = async () => {
        setLoggingOut(true);
        try {
            await axios.get(`${BASE}/api/users/logout`);
            router.push("/login");
        } catch {
            setLoggingOut(false);
        }
    };

    const getInitials = (name: string) =>
        name ? name.slice(0, 2).toUpperCase() : "?";

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {loading ? (
                    <div className="flex items-center justify-center">
                        <svg className="animate-spin w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-white">Your Profile</h1>
                            <p className="text-slate-400 mt-1 text-sm">Manage your account</p>
                        </div>

                        {/* Card */}
                        <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                            {/* Avatar */}
                            <div className="flex flex-col items-center mb-8">
                                <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/30 mb-4">
                                    {getInitials(user?.username ?? "")}
                                </div>
                                <h2 className="text-xl font-semibold text-white">
                                    {user?.username ?? "Unknown"}
                                </h2>
                                {user?.isVerified && (
                                    <span className="mt-1.5 inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2.5 py-0.5">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Verified
                                    </span>
                                )}
                            </div>

                            {/* Info Rows */}
                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                                    <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <div>
                                        <p className="text-xs text-slate-500">Username</p>
                                        <p className="text-sm text-white font-medium">{user?.username ?? "—"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                                    <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <div>
                                        <p className="text-xs text-slate-500">Email</p>
                                        <p className="text-sm text-white font-medium">{user?.email ?? "—"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={onLogout}
                                disabled={loggingOut}
                                className="w-full py-2.5 px-4 bg-red-500/10 hover:bg-red-500/20 disabled:cursor-not-allowed border border-red-500/30 text-red-400 hover:text-red-300 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                {loggingOut ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Signing out...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Sign Out
                                    </>
                                )}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}