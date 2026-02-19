"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { LINE_URL } from "@/app/data/config";

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
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    // 初回データ取得
    useEffect(() => {
        fetch("/api/leads")
            .then((res) => res.json())
            .then((data) => {
                setLeads(data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
            <div className="max-w-7xl w-full px-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 border-l-8 border-orange-500 pl-4 py-2 bg-white shadow-sm rounded-r-lg">
                    買取希望車リスト
                </h1>

                {loading ? (
                    <div className="text-center py-20 text-gray-500">
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
