"use client";

import { useState, useEffect } from "react";

// データ型
interface Lead {
    id: string;
    name?: string;
    phone?: string;
    address?: string;
    status: "new" | "contacted" | "closed";
    createdAt: string;
    carModel?: string;
    year?: string;
    mileage?: string;
}

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    // 初回：ログイン状態をチェック
    useEffect(() => {
        fetch("/api/auth")
            .then((res) => {
                if (res.ok) {
                    setIsAuthenticated(true);
                }
            })
            .finally(() => setIsChecking(false));
    }, []);

    // 認証後にデータ取得
    useEffect(() => {
        if (isAuthenticated) {
            fetch("/api/leads")
                .then((res) => {
                    if (res.ok) return res.json();
                    throw new Error("Failed to fetch");
                })
                .then((data) => {
                    setLeads(data);
                    setLoading(false);
                })
                .catch(() => {
                    setIsAuthenticated(false);
                    setLoading(false);
                });
        }
    }, [isAuthenticated]);

    // ログイン処理
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginLoading(true);
        setLoginError("");

        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                setIsAuthenticated(true);
                setPassword("");
            } else {
                const data = await res.json();
                setLoginError(data.error || "ログインに失敗しました");
            }
        } catch {
            setLoginError("接続エラーが発生しました");
        } finally {
            setLoginLoading(false);
        }
    };

    // ローディング中
    if (isChecking) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // ログイン画面
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                        {/* ロック アイコン */}
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-orange-500/20 border border-orange-500/30 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-white text-center mb-2">
                            管理画面ログイン
                        </h1>
                        <p className="text-gray-400 text-sm text-center mb-8">
                            パスワードを入力してください
                        </p>

                        <form onSubmit={handleLogin}>
                            <div className="mb-6">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="パスワード"
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    autoFocus
                                    required
                                />
                            </div>

                            {loginError && (
                                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm text-center">
                                    {loginError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loginLoading || !password}
                                className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loginLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        認証中...
                                    </span>
                                ) : (
                                    "ログイン"
                                )}
                            </button>
                        </form>
                    </div>

                    <p className="text-gray-600 text-xs text-center mt-6">
                        出張買取サポート札幌 管理システム
                    </p>
                </div>
            </div>
        );
    }

    // 管理画面（認証済み）
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
            <div className="max-w-7xl w-full px-6">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 border-l-8 border-orange-500 pl-4 py-2 bg-white shadow-sm rounded-r-lg">
                        買取希望車リスト
                    </h1>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-green-600 bg-green-50 border border-green-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            ログイン中
                        </span>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-500">
                        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        データを読み込んでいます...
                    </div>
                ) : leads.length === 0 ? (
                    <div className="text-center py-20 bg-white shadow rounded-lg p-10">
                        <p className="text-gray-500 text-lg">まだお問い合わせはありません。</p>
                    </div>
                ) : (
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        受付日時
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        ステータス
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        お客様名 / 連絡先
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        車両情報
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        アクション
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {leads.map((lead) => (
                                    <tr
                                        key={lead.id}
                                        className="hover:bg-blue-50/50 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(lead.createdAt).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${lead.status === "new"
                                                    ? "bg-red-100 text-red-800 animate-pulse"
                                                    : lead.status === "contacted"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-green-100 text-green-800"
                                                    }`}
                                            >
                                                {lead.status === "new"
                                                    ? "新規"
                                                    : lead.status === "contacted"
                                                        ? "対応中"
                                                        : "完了"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800">
                                            <div className="font-bold">{lead.name || "（未入力）"}</div>
                                            <div className="text-gray-500 text-xs mt-1">
                                                {lead.phone || "（未入力）"}
                                            </div>
                                            <div className="text-gray-400 text-xs mt-0.5">
                                                {lead.address || "（未入力）"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800">
                                            <div className="font-bold text-blue-600">
                                                {lead.carModel || "車種不明"}
                                            </div>
                                            <div className="text-gray-500 text-xs">
                                                {lead.year || "年式不明"} / {lead.mileage || "走行不明"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-orange-600 hover:text-orange-900 border border-orange-200 hover:bg-orange-50 px-3 py-1.5 rounded-md transition-colors mr-2">
                                                詳細
                                            </button>
                                            <button className="text-gray-400 hover:text-gray-600 text-xs">
                                                削除
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
