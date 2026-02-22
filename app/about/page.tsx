"use client";

import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isBooting, setIsBooting] = useState(true);
    const [bootStep, setBootStep] = useState(0);

    // Boot Sequence Logic
    useEffect(() => {
        const sequence = [
            500,  // INITIALIZING CORE...
            1200, // BYPASSING SECURITY...
            1800, // CONNECTING TO SINGLE_ENTITY_LAB...
            2400, // ACCESS GRANTED.
            3000  // Fade out
        ];

        sequence.forEach((delay, index) => {
            setTimeout(() => {
                setBootStep(index + 1);
                if (index === sequence.length - 1) {
                    setIsBooting(false);
                }
            }, delay);
        });
    }, []);

    // Canvas Animation with Mouse Interaction
    useEffect(() => {
        if (isBooting) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width: number, height: number;
        let particles: Particle[] = [];
        let animationFrameId: number;
        let mouse = { x: -1000, y: -1000 };

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        resize();

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            baseX: number;
            baseY: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.baseX = this.x;
                this.baseY = this.y;
                this.vx = (Math.random() - 0.5) * 1;
                this.vy = (Math.random() - 0.5) * 1;
                this.size = Math.random() * 2 + 1;
            }
            update() {
                // Normal movement
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse interaction (repel)
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    this.x -= dx * 0.05;
                    this.y -= dy * 0.05;
                }
            }
            draw(context: CanvasRenderingContext2D) {
                context.fillStyle = "rgba(126, 217, 87, 0.8)";
                context.beginPath();
                context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                context.fill();
            }
        }

        // Initialize particles
        for (let i = 0; i < 80; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = "rgba(126, 217, 87, 0.2)";
            ctx.lineWidth = 1;

            for (let i = 0; i < particles.length; i++) {
                let p1 = particles[i];
                p1.update();
                p1.draw(ctx);

                // Connect to mouse
                let dxMouse = mouse.x - p1.x;
                let dyMouse = mouse.y - p1.y;
                let distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                if (distMouse < 200) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(126, 217, 87, ${1 - distMouse / 200})`;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }

                // Connect to other particles
                for (let j = i + 1; j < particles.length; j++) {
                    let p2 = particles[j];
                    let dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(126, 217, 87, ${(120 - dist) / 500})`;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", () => { });
            cancelAnimationFrame(animationFrameId);
        };
    }, [isBooting]);

    // Scramble Text Effect
    useEffect(() => {
        if (isBooting) return;

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*X";

        const runScramble = (spans: NodeListOf<HTMLSpanElement>, duration: number = 8) => {
            spans.forEach((span, idx) => {
                const originalText = span.getAttribute('data-original') || span.innerText;
                span.setAttribute('data-original', originalText);

                let iteration = 0;
                setTimeout(() => {
                    const interval = setInterval(() => {
                        span.innerText = chars[Math.floor(Math.random() * chars.length)];
                        if (iteration > duration) {
                            clearInterval(interval);
                            span.innerText = originalText;
                            span.classList.add('scramble-done');
                        }
                        iteration++;
                    }, 30);
                }, idx * 30);
            });
        };

        // Glitch title effect
        const heroTitle = document.querySelector(".scramble-init") as HTMLElement;
        if (heroTitle && !heroTitle.dataset.initialized) {
            heroTitle.dataset.initialized = "true";
            const heroText = heroTitle.innerText;
            heroTitle.innerHTML = "";
            [...heroText].forEach((char) => {
                const span = document.createElement("span");
                span.innerText = char;
                heroTitle.appendChild(span);
            });
            runScramble(heroTitle.querySelectorAll("span"), 15);
        }

        // Scroll Targets
        document.querySelectorAll(".scramble-target").forEach((el) => {
            const targetEl = el as HTMLElement;
            if (targetEl.dataset.scrambled) return;
            targetEl.dataset.scrambled = "true";

            const text = targetEl.innerText;
            targetEl.innerHTML = "";
            [...text].forEach((char) => {
                const span = document.createElement("span");
                span.innerText = char;
                if (char === " ") span.innerHTML = "&nbsp;";
                targetEl.appendChild(span);
            });
        });

        const scrambleObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !entry.target.classList.contains("scrambled-done")) {
                        entry.target.classList.add("scrambled-done");
                        const spans = entry.target.querySelectorAll("span");
                        runScramble(spans);
                    }
                });
            },
            { threshold: 0.2 }
        );

        document.querySelectorAll(".scramble-target").forEach((el) => {
            scrambleObserver.observe(el);
        });

        return () => {
            scrambleObserver.disconnect();
        };
    }, [isBooting]);

    // Console typing effect
    const [consoleOutput, setConsoleOutput] = useState(["> WAITING FOR INPUT...", "> CHANNEL: SECURE"]);
    useEffect(() => {
        if (isBooting) return;
        const logs = [
            "> SCANNING NETWORK...",
            "> NO ENEMY AGENTS DETECTED.",
            "> OPTIMIZING VALUATION ALGORITHM...",
            "> READY SYSTEM."
        ];
        let step = 0;
        const interval = setInterval(() => {
            if (step < logs.length) {
                setConsoleOutput(prev => [...prev, logs[step]]);
                step++;
            } else {
                clearInterval(interval);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [isBooting]);

    return (
        <div className="cyber-page">
            <Head>
                <title>OPERATOR_DATA | 出張買取サポート札幌</title>
            </Head>

            {/* BOOT SEQUENCE OVERLAY */}
            {isBooting && (
                <div className="boot-overlay">
                    <div className="boot-terminal">
                        {bootStep >= 0 && <p className="txt-green">BOOT_SEQUENCE_INITIATED...</p>}
                        {bootStep >= 1 && <p className="txt-green">INITIALIZING CORE_FILES...</p>}
                        {bootStep >= 2 && <p className="txt-red">BYPASSING SECURITY FIREWALL...</p>}
                        {bootStep >= 3 && <p className="txt-green">CONNECTING TO SINGLE_ENTITY_LAB...</p>}
                        {bootStep >= 4 && <p className="txt-green glitch-text" style={{ fontSize: "2rem", marginTop: "20px" }}>ACCESS GRANTED.</p>}
                    </div>
                </div>
            )}

            <style>{`
        .cyber-page {
            --c-bg: #f2f5f8;
            --c-panel: #ffffff;
            --c-green: #00d26a;   /* Enhanced neon green */
            --c-red: #ff2a2a;     /* Enhanced neon red */
            --c-text: #1a1a1a;
            --c-text-light: #555555;
            --c-dim: #a0a0a0;
            --shadow-soft: 0 10px 30px rgba(0, 210, 106, 0.15);
            --font-code: 'JetBrains Mono', monospace;
            background-color: var(--c-bg);
            color: var(--c-text);
            overflow-x: hidden;
            line-height: 1.8;
            min-height: 100vh;
            position: relative;
        }

        /* CRT Scanline Effect */
        .cyber-page::after {
            content: " ";
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.03) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02));
            z-index: 999;
            background-size: 100% 3px, 3px 100%;
            pointer-events: none;
        }

        .cyber-page .txt-green { color: var(--c-green) !important; text-shadow: 0 0 5px rgba(0,210,106,0.3); }
        .cyber-page .txt-red { color: var(--c-red) !important; text-shadow: 0 0 5px rgba(255,42,42,0.3); }

        /* BOOT OVERLAY */
        .boot-overlay {
            position: fixed; top: 0; left:0; width: 100vw; height: 100vh;
            background: #050505; z-index: 10000;
            display: flex; flex-direction: column; justify-content: center; padding: 50px;
            font-family: var(--font-code);
            animation: fadeOut 0.5s ease 3s forwards;
        }
        .boot-terminal p {
            margin: 5px 0; font-size: 1.2rem;
            overflow: hidden; white-space: nowrap;
            animation: typing 0.2s steps(40, end);
        }
        @keyframes fadeOut { to { opacity: 0; visibility: hidden; } }
        @keyframes typing { from { width: 0 } to { width: 100% } }

        /* Background */
        .cyber-page .bg-grid {
            position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
            background: 
                linear-gradient(transparent 95%, rgba(0, 210, 106, 0.05) 96%, transparent 96%),
                linear-gradient(90deg, transparent 95%, rgba(0, 210, 106, 0.05) 96%, transparent 96%);
            background-size: 40px 40px;
            z-index: 0; pointer-events: none;
            perspective: 500px;
        }

        .cyber-page #techCanvas {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            z-index: 1; opacity: 1; pointer-events: none;
        }

        .cyber-page .container {
            max-width: 1100px; margin: 0 auto; padding: 0 40px;
            position: relative; z-index: 2;
        }
        .cyber-page .code { font-family: var(--font-code); font-size: 0.9em; }
        
        .cyber-page .tech-border {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(0, 210, 106, 0.4);
            box-shadow: var(--shadow-soft);
            position: relative; border-radius: 2px;
            transform-style: preserve-3d;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .cyber-page .tech-border::before, .cyber-page .tech-border::after {
            content: ''; position: absolute; width: 15px; height: 15px;
            border: 2px solid var(--c-green); transition: all 0.3s; opacity: 0;
        }
        .cyber-page .tech-border:hover {
            background: rgba(255, 255, 255, 0.9);
            box-shadow: 0 15px 35px rgba(0, 210, 106, 0.2), 0 0 15px rgba(0, 210, 106, 0.1) inset;
            border-color: var(--c-green);
        }
        .cyber-page .tech-border:hover::before, .cyber-page .tech-border:hover::after {
            opacity: 1;
        }
        .cyber-page .tech-border::before { top: -2px; left: -2px; border-right: none; border-bottom: none; }
        .cyber-page .tech-border::after { bottom: -2px; right: -2px; border-left: none; border-top: none; }

        /* Glitch text effect */
        .glitch-text {
            position: relative;
        }
        .tech-border:hover .glitch-text {
            animation: glitch-anim 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
        }
        @keyframes glitch-anim {
            0% { transform: translate(0) }
            20% { transform: translate(-2px, 2px) }
            40% { transform: translate(-2px, -2px) }
            60% { transform: translate(2px, 2px) }
            80% { transform: translate(2px, -2px) }
            100% { transform: translate(0) }
        }

        /* --- Header --- */
        .cyber-page header.cyber-header {
            position: relative; width: 100%;
            padding: 20px 40px; display: flex; justify-content: space-between; align-items: center;
            z-index: 100; background: rgba(255,255,255,0.8);
            backdrop-filter: blur(15px); border-bottom: 2px solid rgba(0, 210, 106, 0.2);
        }
        .cyber-page .logo { font-weight: 800; font-size: 1.2rem; letter-spacing: 0.1em; }
        .cyber-page .sys-status {
            font-family: var(--font-code); font-size: 0.75rem;
            display: flex; gap: 10px; align-items: center; color: var(--c-text-light);
            background: #fff; padding: 5px 15px; border-radius: 20px; border: 1px solid var(--c-dim);
        }
        .cyber-page .status-lights { display: flex; gap: 5px; }
        .cyber-page .light {
            width: 8px; height: 8px; border-radius: 50%;
            animation: blinklight 2s infinite alternate;
        }
        .cyber-page .light-g { background: var(--c-green); box-shadow: 0 0 8px var(--c-green); }
        .cyber-page .light-r { background: var(--c-red); box-shadow: 0 0 8px var(--c-red); animation-delay: 0.5s; animation-duration: 1.5s; }
        @keyframes blinklight { 0% { opacity: 0.1; } 100% { opacity: 1; } }

        /* --- Hero Section --- */
        .cyber-page .hero {
            min-height: 80vh; display: flex; align-items: center; padding-top: 40px;
        }
        .cyber-page .console-text {
            font-family: var(--font-code); color: var(--c-green);
            margin-bottom: 20px; display: block; font-weight: 700;
            background: rgba(0,210,106,0.1); display: inline-block; padding: 5px 10px; border-left: 3px solid var(--c-green);
        }
        .cyber-page .console-text::before { content: '> '; }

        .cyber-page .glitch-title {
            font-size: 4.5rem; font-weight: 800; line-height: 1.1;
            margin-bottom: 30px; color: var(--c-text); letter-spacing: -0.02em;
        }
        .cyber-page .scramble-target span, .cyber-page .glitch-title span { display: inline-block; white-space: pre; }
        .cyber-page .glitch-title > span:nth-of-type(1) { color: var(--c-text); }
        .cyber-page .glitch-title > span:nth-of-type(3) { color: var(--c-red); text-shadow: 0 0 10px rgba(255,42,42,0.3); }

        .cyber-page .hero-desc {
            font-size: 1.15rem; max-width: 650px; color: var(--c-text-light);
            margin-bottom: 40px; border-left: 4px solid var(--c-red);
            padding-left: 20px; font-weight: 500;
        }
        
        .cyber-page .btn-group { display: flex; gap: 20px; flex-wrap: wrap; }

        .cyber-page a.tech-btn {
            display: inline-flex; align-items: center; padding: 15px 35px;
            text-decoration: none; color: var(--c-text); font-weight: 800;
            background: #fff; transition: all 0.3s; letter-spacing: 0.05em;
            position: relative; overflow: hidden;
            border: 2px solid var(--c-text);
        }
        .cyber-page a.tech-btn::before {
            content:''; position: absolute; top:0; left:-100%; width:100%; height:100%;
            background: var(--c-text); transition: all 0.4s; z-index: 1;
        }
        .cyber-page a.tech-btn:hover::before { left: 0; }
        .cyber-page a.tech-btn span { position: relative; z-index: 2; transition: color 0.4s; }
        .cyber-page a.tech-btn:hover span { color: #fff; }
        .cyber-page a.tech-btn.bg-green { border-color: var(--c-green); }
        .cyber-page a.tech-btn.bg-green::before { background: var(--c-green); }

        /* --- Sections Common --- */
        .cyber-page section.content-sec { padding: 100px 0; }
        .cyber-page .section-header {
            display: flex; justify-content: space-between; align-items: flex-end;
            margin-bottom: 60px; border-bottom: 2px solid var(--c-text); padding-bottom: 15px;
        }
        .cyber-page .sec-title { font-size: 2.2rem; font-weight: 800; line-height: 1; text-transform: uppercase; }
        .cyber-page .sec-label {
            font-family: var(--font-code); color: var(--c-text-light); font-size: 0.95rem; font-weight: 700;
        }
        .cyber-page .sec-label .num { font-weight: 800; }
        .cyber-page .grid-wrapper { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; }

        /* --- Tech Cards --- */
        .cyber-page .tech-card {
            padding: 40px; display: flex; flex-direction: column; height: 100%;
            text-decoration: none; color: var(--c-text);
        }
        .cyber-page .card-meta {
            font-family: var(--font-code); font-size: 0.85rem; margin-bottom: 15px; display: flex; gap: 10px; font-weight: 700;
        }
        .cyber-page .tech-card h3 { font-size: 1.5rem; margin-bottom: 15px; font-weight: 800; transition: color 0.3s; }
        .cyber-page .tech-card p { color: var(--c-text-light); font-size: 1rem; flex-grow: 1; line-height: 1.6; }
        .cyber-page .card-link {
            margin-top: 25px; font-family: var(--font-code); font-size: 0.9rem;
            text-align: right; color: var(--c-dim); transition: color 0.3s; font-weight: 800;
        }
        .cyber-page .tech-card:hover .card-link, .cyber-page .tech-card:hover h3 { color: var(--c-green); }

        /* --- Data Row Detail --- */
        .cyber-page .data-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; }
        .cyber-page .data-row {
            display: flex; border-bottom: 1px dashed rgba(0,0,0,0.1);
            padding: 18px 0; align-items: flex-start;
        }
        .cyber-page .data-label {
            width: 150px; font-family: var(--font-code); font-weight: 800;
            color: var(--c-text); font-size: 0.95rem; flex-shrink: 0;
        }
        .cyber-page .data-val { flex: 1; color: var(--c-text-light); font-size: 1rem; font-weight: 500; }

        /* Console */
        .cyber-page .console-box {
            background: #111; border: 2px solid var(--c-green);
            padding: 30px; border-radius: 4px; font-family: var(--font-code);
            box-shadow: 0 0 20px rgba(0,210,106,0.2) inset;
        }
        .cyber-page .console-output {
            color: var(--c-green); font-size: 0.95rem; text-shadow: 0 0 5px rgba(0,210,106,0.5);
            display: flex; flex-direction: column; gap: 5px;
        }
        .cyber-page .blink-cursor { display: inline-block; width: 10px; height: 1em; background: var(--c-green); animation: blinkcursor 1s infinite; margin-left: 5px; vertical-align: middle; }
        @keyframes blinkcursor { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }

        /* --- System Signature --- */
        .cyber-page .system-signature {
            padding: 80px 40px; text-align: center; color: var(--c-dim);
            font-family: var(--font-code); font-size: 0.85rem; font-weight: 700;
            border-top: 1px solid rgba(0,0,0,0.1); margin-top: 50px;
        }

        @media (max-width: 768px) {
            .cyber-page .glitch-title { font-size: 2.8rem; }
            .cyber-page .data-grid { grid-template-columns: 1fr; gap: 20px; }
            .cyber-page header.cyber-header { padding: 15px 20px; } .cyber-page .container { padding: 0 20px; }
            .cyber-page .btn-group { flex-direction: column; align-items: stretch; }
            .cyber-page a.tech-btn { justify-content: center; }
            .cyber-page .data-row { flex-direction: column; gap: 5px; }
        }
      `}</style>

            <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap" rel="stylesheet" />

            <div className="bg-grid"></div>
            <canvas id="techCanvas" ref={canvasRef}></canvas>

            <header className="cyber-header">
                <div className="logo">ANSINJP <span className="code txt-green">LAB.</span></div>
                <div className="sys-status">
                    <span className="code" style={{ fontWeight: 800, color: "var(--c-text)" }}>SYS: ACTIVE</span>
                    <div className="status-lights">
                        <div className="light light-g"></div>
                        <div className="light light-r"></div>
                    </div>
                </div>
            </header>

            <section className="hero container">
                <div className="hero-content">
                    <div style={{ display: "inline-block" }}>
                        <span className="console-text type-effect">BOOT_SEQUENCE_COMPLETE...</span>
                    </div>
                    <h1 className="glitch-title">
                        <span className="scramble-init">出張買取サポート札幌</span><br />
                        <span style={{ fontSize: "0.5em", opacity: 0.8 }} className="code txt-text">SAPPORO ON-SITE <span className="txt-red">PURCHASE</span> SUPPORT</span>
                    </h1>
                    <div className="hero-desc">
                        <p>
                            「自由で、しなやかなカーライフを。」<br />
                            たった一つの知性が運用する、次世代型<span className="txt-red" style={{ fontWeight: 800 }}>買取</span>プロジェクト。<br />
                            <span className="txt-green" style={{ fontWeight: 800 }}>先端テクノロジー</span>による適正価格算出と、Web完結のスマートな取引体験を。
                        </p>
                        <div style={{ marginTop: "20px", fontSize: "0.9rem", fontFamily: "var(--font-code)", color: "var(--c-text)", background: "rgba(255,255,255,0.6)", padding: "15px", borderLeft: "3px solid var(--c-green)", display: "inline-block" }}>
                            <span className="txt-green">&gt;</span> OPERATED BY <span className="txt-green" style={{ fontWeight: 800 }}>SINGLE INTELLIGENCE</span>.<br />
                            <span className="txt-red">&gt;</span> BUILT FOR <span className="txt-red" style={{ fontWeight: 800 }}>TRANSPARENCY &amp; SPEED</span>.<br />
                            <span className="txt-green">&gt;</span> AN <span className="txt-green" style={{ fontWeight: 800 }}>ADVANCED SYSTEM</span> IN SAPPORO.
                        </div>
                    </div>
                    <div className="btn-group">
                        <Link href="/" className="tech-btn bg-green">
                            <span className="code">ACCESS_GUIDE [トップページへ戻る] -&gt;</span>
                        </Link>
                        <a href="#company" className="tech-btn">
                            <span className="code">READ_DATA [詳細データ]</span>
                        </a>
                    </div>
                </div>
            </section>

            <section id="mission" className="content-sec container">
                <div className="section-header">
                    <h2 className="sec-title scramble-target">MISSION_PROTOCOL</h2>
                    <span className="sec-label g"><span className="num">[01]</span> CORE_VALUE</span>
                </div>
                <div className="tech-border" style={{ padding: "60px 50px", display: "flex", gap: "40px", flexWrap: "wrap", alignItems: "center" }}>
                    <div style={{ flex: "1 1 400px" }}>
                        <h3 className="glitch-text" style={{ fontSize: "2rem", marginBottom: "30px", lineHeight: 1.5, fontWeight: 800 }}>
                            <span className="txt-red">買取</span>・販売・情報。<br />
                            <span className="txt-green">三つの軸</span>で、<br />
                            あなたの最適解を見つける。
                        </h3>
                        <p style={{ color: "var(--c-text-light)", fontSize: "1.1rem", fontWeight: 500 }}>
                            私たちは既存の組織論に縛られません。<br />
                            柔軟なサービス設計と、テクノロジーによる効率化で、<br />
                            数千年先まで残るような「信頼のサイクル」を構築します。
                        </p>
                    </div>
                    <div style={{ flex: "1 1 300px", position: "relative", minHeight: "300px", borderRadius: "4px", overflow: "hidden", border: "1px solid var(--c-green)", boxShadow: "0 0 15px rgba(0,210,106,0.15)" }}>
                        <Image src="/about/car-blueprint.png" alt="Car Blueprint" fill style={{ objectFit: "cover" }} />
                        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", background: "rgba(255,255,255,0.85)", padding: "8px 15px", fontSize: "0.75rem", fontFamily: "var(--font-code)", borderTop: "1px solid var(--c-green)", backdropFilter: "blur(5px)" }}>
                            <span className="txt-green">&gt;</span> ANALYZING_VEHICLE_DATA...<span className="blink-cursor"></span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container" style={{ marginBottom: "50px" }}>
                <div className="tech-border" style={{ position: "relative", height: "400px", overflow: "hidden", borderRadius: "4px" }}>
                    <Image src="/about/sapporo-city.png" alt="Sapporo Cyber City" priority fill style={{ objectFit: "cover", objectPosition: "center 60%" }} />
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(90deg, rgba(242,245,248,1) 0%, rgba(242,245,248,0.1) 20%, rgba(242,245,248,0.1) 80%, rgba(242,245,248,1) 100%)" }}></div>
                    <div style={{ position: "absolute", bottom: "30px", left: "40px", background: "rgba(255,255,255,0.9)", padding: "12px 25px", borderLeft: "4px solid var(--c-green)", borderRight: "1px solid var(--c-green)", borderTop: "1px solid var(--c-green)", borderBottom: "1px solid var(--c-green)", fontFamily: "var(--font-code)", fontSize: "0.85rem", boxShadow: "0 10px 20px rgba(0,210,106,0.1)", backdropFilter: "blur(10px)" }}>
                        <span className="txt-green font-bold">LOC: SAPPORO_CITY</span> <span style={{ opacity: 0.5 }}>//</span> <span className="txt-red font-bold">SNOW_PROTOCOL_ACTIVE</span>
                    </div>
                </div>
            </section>

            <section id="news" className="content-sec container">
                <div className="section-header">
                    <h2 className="sec-title scramble-target">LATEST_LOGS</h2>
                    <span className="sec-label r"><span className="num">[02]</span> UPDATES</span>
                </div>
                <div className="grid-wrapper">
                    <a href="https://lin.ee/auou1O0" target="_blank" rel="noreferrer" className="tech-card tech-border">
                        <span className="card-meta"><span className="txt-green">2025.12.06</span> <span className="txt-red">:: NEW_FEATURE</span></span>
                        <h3 className="scramble-target">LINE自動応答チャットボット稼働開始。</h3>
                        <p>24時間365日、即座に対応。待つことなく、いつでも査定受付が可能になりました。</p>
                        <span className="card-link">START_CHAT &gt;&gt;</span>
                    </a>
                    <Link href="/" className="tech-card tech-border">
                        <span className="card-meta"><span className="txt-green">2025.10.04</span> <span className="txt-red">:: UPDATE</span></span>
                        <h3 className="scramble-target">買取案内ページ、新しくなりました。</h3>
                        <p>出張買取サポート札幌の案内ページがリニューアル。より詳しく、わかりやすく。</p>
                        <span className="card-link">READ_MORE &gt;&gt;</span>
                    </Link>
                    <a href="https://lin.ee/auou1O0" target="_blank" rel="noreferrer" className="tech-card tech-border">
                        <span className="card-meta"><span className="txt-green">2025.07.28</span> <span className="txt-red">:: SERVICE</span></span>
                        <h3 className="scramble-target">LINEで、クルマ査定がもっと手軽に。</h3>
                        <p>トーク画面から写真送信。自動化システムとオペレーターが即座に対応します。</p>
                        <span className="card-link">CONNECT_LINE &gt;&gt;</span>
                    </a>
                    <a href="https://www.instagram.com/ansinjp/" target="_blank" rel="noreferrer" className="tech-card tech-border">
                        <span className="card-meta"><span className="txt-green">2025.06.18</span> <span className="txt-red">:: SOCIAL</span></span>
                        <h3 className="scramble-target">Instagramで、日々を発信中。</h3>
                        <p>買取の現場、クルマの話、日常のひとコマ。フォローして、私たちの世界を覗いてみませんか。</p>
                        <span className="card-link">CHECK_INSTAGRAM &gt;&gt;</span>
                    </a>
                    <Link href="/" className="tech-card tech-border">
                        <span className="card-meta"><span className="txt-green">2025.03.17</span> <span className="txt-red">:: SYSTEM</span></span>
                        <h3 className="scramble-target">ウェブサイト、生まれ変わりました。</h3>
                        <p>より見やすく、よりわかりやすく。あなたとの距離を、ぐっと近づけるデザインへ。</p>
                        <span className="card-link">VISIT_HOME &gt;&gt;</span>
                    </Link>
                    <a href="https://ansinjp.net/" target="_blank" rel="noreferrer" className="tech-card tech-border">
                        <span className="card-meta"><span className="txt-green">2025.03.10</span> <span className="txt-red">:: MEDIA</span></span>
                        <h3 className="scramble-target">「くるまど札幌」、スタート。</h3>
                        <p>クルマのこと、もっと知りたい。そんな声に応える、総合情報サイトが誕生しました。</p>
                        <span className="card-link">ACCESS_MEDIA &gt;&gt;</span>
                    </a>
                </div>
            </section>

            <section id="company" className="content-sec container">
                <div className="section-header">
                    <h2 className="sec-title scramble-target">OPERATOR_DATA</h2>
                    <span className="sec-label g"><span className="num">[03]</span> SPECS &amp; ORIGIN</span>
                </div>
                <div className="tech-border" style={{ padding: "50px", display: "flex", gap: "50px", flexWrap: "wrap", alignItems: "center" }}>
                    <div style={{ flex: "1 1 300px", position: "relative", minHeight: "350px", borderRadius: "4px", overflow: "hidden", border: "1px solid var(--c-green)", boxShadow: "0 0 15px rgba(0,210,106,0.15)" }}>
                        <Image src="/about/hokkaido-hologram.png" alt="Hokkaido Hologram" fill style={{ objectFit: "cover" }} />
                        <div style={{ position: "absolute", top: "15px", right: "15px", background: "rgba(255,255,255,0.85)", padding: "4px 10px", fontSize: "0.7rem", fontFamily: "var(--font-code)", border: "1px solid var(--c-green)", backdropFilter: "blur(5px)", fontWeight: "bold" }}>
                            <span className="txt-red blink-cursor" style={{ marginLeft: 0, marginRight: "5px" }}></span>TRACKING_AREA
                        </div>
                    </div>
                    <div style={{ flex: "1 1 400px" }}>
                        <div className="data-grid" style={{ gridTemplateColumns: "1fr", gap: "20px" }}>
                            <div className="data-row">
                                <span className="data-label txt-green">NAME</span>
                                <span className="data-val">出張買取サポート札幌<br /><span className="code txt-green" style={{ fontSize: "0.85em", fontWeight: 700 }}>[ANSINJP]</span></span>
                            </div>
                            <div className="data-row">
                                <span className="data-label">TYPE</span>
                                <span className="data-val glitch-text" style={{ fontWeight: 800, color: "var(--c-text)" }}>SINGLE_ENTITY_LAB (個人事業)</span>
                            </div>
                            <div className="data-row">
                                <span className="data-label">BUSINESS</span>
                                <span className="data-val">出張査定・買取 / 中古車販売<br />情報メディア運営 / 査定アドバイザリー</span>
                            </div>
                            <div className="data-row">
                                <span className="data-label">RELATED</span>
                                <span className="data-val"><a href="https://ansinjp.net/" target="_blank" rel="noreferrer" style={{ color: "var(--c-green)", textDecoration: "none", fontWeight: 700 }}>くるまど札幌 (Kurumado)</a></span>
                            </div>
                            <div className="data-row">
                                <span className="data-label txt-red">LOCATION</span>
                                <span className="data-val">〒065-0021<br />札幌市東区北21条東3-1-14</span>
                            </div>
                            <div className="data-row">
                                <span className="data-label">LICENSE</span>
                                <span className="data-val">北海道公安委員会許可<br />第101030002184号</span>
                            </div>
                            <div className="data-row">
                                <span className="data-label">AFFILIATION</span>
                                <span className="data-val">札幌商工会議所 / 発寒北商店街振興組合</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: "50px" }}>
                    <div className="console-box">
                        <div className="console-output">
                            {consoleOutput.map((log, i) => (
                                <div key={i}>{log}</div>
                            ))}
                            <div><span className="blink-cursor"></span></div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="system-signature container">
                <p>ANSINJP_SYS_VER_3.0.0 // PROTOCOL_ENGAGED</p>
                <p style={{ marginTop: "10px", opacity: 0.8 }}>
                    IDENTIFICATION: [<span className="txt-green glitch-text" style={{ display: "inline-block" }}>VERIFIED_OPERATOR</span>]
                </p>
            </div>
        </div>
    );
}
