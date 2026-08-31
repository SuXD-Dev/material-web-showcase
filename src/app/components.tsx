"use client";
import { useState } from "react";

export function Section({ id, kicker, title, children, description }: { id?: string; kicker: string; title: string; children: React.ReactNode; description?: React.ReactNode }) {
  return (
    <section id={id} className="showcase-section scroll-reveal">
      <div className="showcase-section-inner">
        <div className="showcase-kicker">{kicker}</div>
        <h2 className="showcase-title">{title}</h2>
        {typeof description === "string" ? <p className="showcase-desc">{description}</p> : <>{description}</>}
        {children}
      </div>
    </section>
  );
}

export function ShowcaseBox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="showcase-label">{label}</div>
      <div className="showcase-box">{children}</div>
    </div>
  );
}

export function ButtonRow({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-3 flex-wrap">{children}</div>;
}

export function SpringDemo({ name, css, color }: { name: string; css: string; color: string }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      className="rounded-2xl p-4 text-center transition-all"
      style={{
        background: "var(--color-card)",
        border: "1px solid var(--color-border)",
        transform: pressed ? "scale(0.9) translateY(8px)" : "scale(1) translateY(0)",
        transitionTimingFunction: css,
        transitionDuration: "var(--dur-l2)",
        cursor: "pointer",
      }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
    >
      <div className="font-mono text-xs font-medium" style={{ color }}>{name}</div>
      <div className="font-mono text-[0.55rem] mt-1" style={{ color: "var(--color-text-muted)" }}>press me</div>
    </button>
  );
}
