"use client";

import { useEffect, useState } from "react";
import { TARGET_AREAS, TARGET_CATEGORIES } from "@/app/data/config";

interface TickerItem {
    date: string;
    area: string;
    category: string;
    description: string;
}

export default function PurchaseTicker() {
    const [items, setItems] = useState<TickerItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // 擬似的な買取速報データを生成
    useEffect(() => {
        const generateFakeData = () => {
            const data: TickerItem[] = [];
            const today = new Date();

            // リアリティを出すための修飾語
            const prefixes = ["", "平成25年式 ", "18万km ", "車検切れ ", "不動の", "過走行の", "30万km越え ", "サビあり "];
            // リアリティを出すためのアクション
            const actions = ["を高価買取しました！", "を即日現金化しました！", "の引取完了！", "を輸出査定！", "を入庫しました！"];

            for (let i = 0; i < 8; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() - Math.floor(Math.random() * 3)); // 直近3日以内

                const area = TARGET_AREAS[Math.floor(Math.random() * TARGET_AREAS.length)];
                const category = TARGET_CATEGORIES[Math.floor(Math.random() * TARGET_CATEGORIES.length)];

                // 具体的な車種名を取得（なければカテゴリ名）
                let vehicleName = category.shortName;
                if (category.targetVehicles && category.targetVehicles.length > 0) {
                    const v = category.targetVehicles[Math.floor(Math.random() * category.targetVehicles.length)];
                    vehicleName = v.name;
                }

                // ランダムに修飾語をつける（30%の確率）
                const prefix = Math.random() > 0.7 ? prefixes[Math.floor(Math.random() * prefixes.length)] : "";

                // ランダムにアクションを変える
                const action = actions[Math.floor(Math.random() * actions.length)];

                // 「不動の」「サビあり」などは、廃車や重機カテゴリの時だけ出しやすくする調整などは今回は省略し、ランダムで勢いを出す

                data.push({
                    date: `${date.getMonth() + 1}/${date.getDate()}`,
                    area: area.name,
                    category: `${prefix}${vehicleName}`,
                    description: action
                });
            }
            return data;
        };

        setItems(generateFakeData());
    }, []);

    // ローテーション処理
    useEffect(() => {
        if (items.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, 4000); // 4秒ごとに切り替え

        return () => clearInterval(interval);
    }, [items]);

    if (items.length === 0) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white text-xs sm:text-sm py-2 overflow-hidden border-b border-gray-800 shadow-md">
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-center sm:justify-start gap-3">
                <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-bold animate-pulse">
                    速報
                </span>
                <div className="relative h-5 w-full max-w-md overflow-hidden">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`absolute top-0 left-0 w-full transition-all duration-500 flex items-center gap-2 ${index === currentIndex
                                ? "translate-y-0 opacity-100"
                                : "translate-y-full opacity-0"
                                }`}
                        >
                            <span className="text-gray-400 font-mono">{item.date}</span>
                            <span className="font-bold text-orange-300">{item.area}</span>
                            <span className="font-bold text-white">{item.category}</span>
                            <span className="text-gray-300">{item.description}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
