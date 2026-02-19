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

            for (let i = 0; i < 5; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() - i);

                const area = TARGET_AREAS[Math.floor(Math.random() * TARGET_AREAS.length)];
                const category = TARGET_CATEGORIES[Math.floor(Math.random() * TARGET_CATEGORIES.length)];

                data.push({
                    date: `${date.getMonth() + 1}/${date.getDate()}`,
                    area: area.name,
                    category: category.shortName,
                    description: "高価買取しました！"
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
        <div className="bg-gray-900 text-white text-xs sm:text-sm py-2 overflow-hidden border-b border-gray-800">
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
                            <span>で</span>
                            <span className="font-bold text-white">{item.category}</span>
                            <span>を{item.description}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
