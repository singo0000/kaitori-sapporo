"use client";

import Image from "next/image";

interface TargetVehiclesSectionProps {
    categoryShortName: string;
    targetVehicles?: { name: string; icon: string }[];
}

export default function TargetVehiclesSection({ categoryShortName, targetVehicles }: TargetVehiclesSectionProps) {
    if (!targetVehicles || targetVehicles.length === 0) return null;

    return (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="inline-block text-blue-600 font-bold text-sm tracking-wider uppercase mb-3 bg-blue-100 px-4 py-1.5 rounded-full">
                        Target Vehicles
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                        <span className="text-blue-700">{categoryShortName}</span>の<br className="sm:hidden" />
                        買取対象車両例
                    </h2>
                    <p className="text-gray-500">
                        以下のような車両を高価買取しております。<br className="hidden sm:block" />
                        リストにない車両でもお気軽にご相談ください。
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {targetVehicles.map((vehicle, index) => (
                        <div
                            key={index}
                            className="bg-white border text-center border-gray-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">
                                {vehicle.icon}
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                                {vehicle.name}
                            </h3>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-gray-500 bg-white inline-block px-6 py-3 rounded-full border border-gray-200 shadow-sm">
                        ※不動車・車検切れ・事故現状車もすべて買取対象です
                    </p>
                </div>
            </div>
        </section>
    );
}
