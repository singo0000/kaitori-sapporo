"use client";

import { useState, useRef, useEffect } from "react";
import { LINE_URL } from "@/app/data/config";

// メッセージ型
interface Message {
    type: "bot" | "user";
    text: string;
}

// チャット状態
type ChatState =
    | "initial"
    | "ask_method"
    | "confirm_line"
    | "form_start"
    | "ask_car_model"
    | "ask_year"
    | "ask_mileage"
    | "ask_name"
    | "ask_phone"
    | "ask_address"
    | "confirm"
    | "thanks";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [chatState, setChatState] = useState<ChatState>("initial");
    const [formData, setFormData] = useState({
        carModel: "",
        year: "",
        mileage: "",
        name: "",
        phone: "",
        address: "",
    });
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 初期メッセージ
    const sendBotMessage = (text: string, delay = 500) => {
        setTimeout(() => {
            setMessages((prev) => [...prev, { type: "bot", text }]);
        }, delay);
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // チャット開始時
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            sendBotMessage("こんにちは！査定をご希望ですか？");
            sendBotMessage("LINEなら写真を送るだけで一番簡単に査定できますよ😊", 1200);
            setChatState("ask_method");
        }
    }, [isOpen]);

    const handleSendMessage = (text: string) => {
        setMessages((prev) => [...prev, { type: "user", text }]);
        processInput(text);
    };

    const processInput = (text: string) => {
        switch (chatState) {
            case "ask_method":
                if (text === "LINEで査定する") {
                    sendBotMessage("ありがとうございます！こちらから友だち追加をお願いします。");
                    sendBotMessage(`👉 [LINE友だち追加](${LINE_URL})`, 1000);
                    setChatState("confirm_line");
                } else if (text === "ここで入力する") {
                    sendBotMessage("承知しました！いくつか質問させていただきますね。");
                    sendBotMessage("まず、お車の【車種名】を教えていただけますか？（例：プリウス、ハイエースなど）", 1000);
                    setChatState("ask_car_model");
                }
                break;

            case "ask_car_model":
                setFormData({ ...formData, carModel: text });
                sendBotMessage("ありがとうございます。年式は大体いつ頃かわかりますか？（古くても大丈夫です！）");
                setChatState("ask_year");
                break;

            case "ask_year":
                setFormData({ ...formData, year: text });
                sendBotMessage("走行距離はどのくらいでしょうか？（例：10万キロ、不明など）");
                setChatState("ask_mileage");
                break;

            case "ask_mileage":
                setFormData({ ...formData, mileage: text });
                sendBotMessage("ありがとうございます！概算をお伝えしたいので、ご連絡先を伺ってもよろしいですか？");
                sendBotMessage("まず【お名前】をお願いします。", 1000);
                setChatState("ask_name");
                break;

            case "ask_name":
                setFormData({ ...formData, name: text });
                sendBotMessage("次に【電話番号】をお願いします。（携帯で大丈夫です）");
                setChatState("ask_phone");
                break;

            case "ask_phone":
                setFormData({ ...formData, phone: text });
                sendBotMessage("最後にお車の【保管場所（市町村）】を教えてください。（出張査定の可否を確認します）");
                setChatState("ask_address");
                break;

            case "ask_address":
                const finalData = { ...formData, address: text };
                setFormData(finalData);
                sendBotMessage("ご入力ありがとうございます！担当者が内容を確認して、至急ご連絡差し上げます。少々お待ちくださいませ。", 500);
                submitLead(finalData);
                setChatState("thanks");
                break;
        }
    };

    const submitLead = async (data: any) => {
        try {
            await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            console.log("Lead submitted:", data);
        } catch (e) {
            console.error("Failed to submit lead", e);
        }
    };

    return (
        <div className="fixed bottom-32 right-4 md:bottom-5 md:right-5 z-30">
            {/* 閉じた状態のボタン */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 shadow-lg flex items-center gap-2 animate-bounce hover:animate-none transition-all"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span className="font-bold">無料査定チャット</span>
                </button>
            )}

            {/* チャットウィンドウ */}
            {isOpen && (
                <div className="bg-white rounded-2xl shadow-2xl w-[350px] max-w-[90vw] overflow-hidden border border-gray-200 flex flex-col h-[500px]">
                    {/* ヘッダー */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 flex justify-between items-center text-white">
                        <h3 className="font-bold flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            査定アシスタント
                        </h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* メッセージエリア */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${msg.type === "user"
                                        ? "bg-blue-600 text-white rounded-tr-none"
                                        : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                                        }`}
                                >
                                    {msg.text.includes("http") ? (
                                        <a
                                            href={msg.text.match(/\((.*?)\)/)?.[1] || "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline text-blue-500 hover:text-blue-700"
                                        >
                                            {msg.text.replace(/\[(.*?)\]\(.*?\)/, "$1").replace("👉 ", "")}
                                        </a>
                                    ) : (
                                        msg.text
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* 入力エリア（選択肢またはテキスト） */}
                    <div className="p-4 border-t border-gray-100 bg-white">
                        {chatState === "ask_method" ? (
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => handleSendMessage("LINEで査定する")}
                                    className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    LINEで査定する（推奨）
                                </button>
                                <button
                                    onClick={() => handleSendMessage("ここで入力する")}
                                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg transition-colors"
                                >
                                    チャットで入力する
                                </button>
                            </div>
                        ) : chatState === "confirm_line" || chatState === "thanks" ? (
                            <p className="text-center text-gray-400 text-sm">
                                {chatState === "confirm_line"
                                    ? "LINEでお問い合わせください"
                                    : "お問い合わせありがとうございました"}
                            </p>
                        ) : (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (inputRef.current?.value) {
                                        handleSendMessage(inputRef.current.value);
                                        inputRef.current.value = "";
                                    }
                                }}
                                className="flex gap-2"
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="入力してください..."
                                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
