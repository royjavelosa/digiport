import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  ComposedChart,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

// Momentum walk: smooth organic motion with inertia, boundary repulsion, sinusoidal bias
// Returns [newValue, newVelocity]
const mw = (val, vel, min, max, bias = 0, speed = 1) => {
  const range = max - min;
  const maxV = range * 0.032 * speed;
  let v = (vel + (Math.random() - 0.5) * maxV * 1.4 + bias) * 0.88;
  v = Math.max(-maxV, Math.min(maxV, v));
  // Soft boundary repulsion — push back when within 12% of edge
  const margin = range * 0.12;
  if (val - min < margin) v += (margin - (val - min)) * 0.06;
  if (max - val < margin) v -= (margin - (max - val)) * 0.06;
  return [Math.max(min, Math.min(max, val + v)), v];
};

// Build an initial series of n points (used for init only)
const initSeries = (n, min, max) => {
  const out = [];
  let v = (min + max) / 2;
  for (let i = 0; i < n; i++) {
    v = Math.max(min, Math.min(max, v + (Math.random() - 0.5) * (max - min) * 0.18));
    out.push(v);
  }
  return out;
};

// Pause all chart intervals when the browser tab is not visible
const usePageVisible = () => {
  const visible = useRef(!document.hidden);
  useEffect(() => {
    const handler = () => { visible.current = !document.hidden; };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);
  return visible;
};

// ── 1. Hero: live system-monitoring area chart (3 overlapping series) ─────────
export const HeroChart = () => {
  const N = 40;
  const [data, setData] = useState(() => {
    const a = initSeries(N, 50, 95);
    const b = initSeries(N, 25, 70);
    const c = initSeries(N, 35, 80);
    return a.map((v, i) => ({ i, a: v, b: b[i], c: c[i] }));
  });
  const vRef = useRef({ a: 0, b: 0, c: 0, phase: Math.random() * Math.PI * 2 });
  const visible = usePageVisible();

  useEffect(() => {
    const id = setInterval(() => {
      if (!visible.current) return;
      setData((prev) => {
        const r = vRef.current;
        r.phase += 0.08;
        let next = prev;
        for (let s = 0; s < 4; s++) {
          const last = next[next.length - 1];
          const [na, va] = mw(last.a, r.a, 50, 95, Math.sin(r.phase) * 0.4, 1);
          const [nb, vb] = mw(last.b, r.b, 25, 70, Math.sin(r.phase + 2.1) * 0.4, 1);
          const [nc, vc] = mw(last.c, r.c, 35, 80, Math.sin(r.phase + 4.2) * 0.4, 1);
          r.a = va; r.b = vb; r.c = vc;
          next = [...next.slice(1), { i: last.i + 1, a: na, b: nb, c: nc }];
        }
        return next;
      });
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.18 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="hg-a" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.55} />
              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="hg-b" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.55} />
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="hg-c" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.55} />
              <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="i" hide />
          <YAxis hide domain={[0, 100]} />
          <Area
            type="monotone"
            dataKey="a"
            stroke="#22d3ee"
            strokeWidth={2}
            fill="url(#hg-a)"
            isAnimationActive
            animationDuration={2300}
            animationEasing="ease-in-out"
          />
          <Area
            type="monotone"
            dataKey="b"
            stroke="#60a5fa"
            strokeWidth={2}
            fill="url(#hg-b)"
            isAnimationActive
            animationDuration={2300}
            animationEasing="ease-in-out"
          />
          <Area
            type="monotone"
            dataKey="c"
            stroke="#a78bfa"
            strokeWidth={2}
            fill="url(#hg-c)"
            isAnimationActive
            animationDuration={2300}
            animationEasing="ease-in-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// ── 2. Journey: distributed systems network graph ─────────────────────────────
// Signal subcomponent — mounts fresh per tick, drives travel + arrival via React state
const JourneySignal = ({ na, nb, gradId }) => {
  const len = Math.hypot(nb.x - na.x, nb.y - na.y);
  const [dashOffset, setDashOffset] = useState(len);
  const [arrived, setArrived] = useState(false);
  const [travelDone, setTravelDone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setDashOffset(0), 16);
    const t2 = setTimeout(() => setArrived(true), 2200);
    const t3 = setTimeout(() => setTravelDone(true), 2350); // start fading line as arrival flash blooms
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <g>
      {/* Gradient: transparent at origin → bright at tip, so the tail fades as it travels */}
      <defs>
        <linearGradient id={gradId} gradientUnits="userSpaceOnUse"
          x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}>
          <stop offset="0%"   stopColor="#22d3ee" stopOpacity={0}    />
          <stop offset="55%"  stopColor="#22d3ee" stopOpacity={0.35} />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity={1}    />
        </linearGradient>
      </defs>
      <line
        x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
        stroke={`url(#${gradId})`} strokeWidth={2} strokeLinecap="round"
        strokeDasharray={len} strokeDashoffset={dashOffset}
        style={{ transition: "stroke-dashoffset 2.3s linear, opacity 1.1s ease-in-out",
                 opacity: travelDone ? 0 : 1 }}
      />
      {arrived && (
        <g filter="url(#jc-glow)">
          {/* Inner bright burst */}
          <circle cx={nb.x} cy={nb.y} r={5} fill="#ffffff"
            style={{ transformBox: "fill-box", transformOrigin: "center",
                     animation: "jc-core 0.85s ease-out forwards" }}
          />
          {/* Fast inner ring */}
          <circle cx={nb.x} cy={nb.y} r={7} fill="none"
            stroke="#22d3ee" strokeWidth={2.5}
            style={{ transformBox: "fill-box", transformOrigin: "center",
                     animation: "jc-ring1 1.0s ease-out forwards" }}
          />
          {/* Slower outer ring */}
          <circle cx={nb.x} cy={nb.y} r={7} fill="none"
            stroke="#60a5fa" strokeWidth={1.2}
            style={{ transformBox: "fill-box", transformOrigin: "center",
                     animation: "jc-ring2 1.5s ease-out forwards" }}
          />
        </g>
      )}
    </g>
  );
};
// viewBox: 0 0 800 1400 — x kept in 90–710 range, y extends to 1300 for parallax reveal
const NET_NODES = [
  { x: 120, y: 75  , c: "#22d3ee" },  // 0  top-left
  { x: 380, y: 55  , c: "#60a5fa" },  // 1  top-center      — blue
  { x: 650, y: 85  , c: "#22d3ee" },  // 2  top-right
  { x: 95,  y: 195 , c: "#22d3ee" },  // 3  row2-left
  { x: 240, y: 180 , c: "#a78bfa" },  // 4  row2-center-left — violet
  { x: 475, y: 170 , c: "#22d3ee" },  // 5  row2-center-right
  { x: 705, y: 190 , c: "#22d3ee" },  // 6  row2-right
  { x: 155, y: 315 , c: "#22d3ee" },  // 7  row3-left
  { x: 370, y: 295 , c: "#60a5fa" },  // 8  row3-center      — blue
  { x: 565, y: 325 , c: "#22d3ee" },  // 9  row3-center-right
  { x: 710, y: 310 , c: "#22d3ee" },  // 10 row3-right
  { x: 225, y: 420 , c: "#22d3ee" },  // 11 row4-left
  { x: 455, y: 440 , c: "#a78bfa" },  // 12 row4-center      — violet
  { x: 645, y: 415 , c: "#22d3ee" },  // 13 row4-right
  { x: 525, y: 125 , c: "#22d3ee" },  // 14 upper-right gap
  { x: 300, y: 255 , c: "#22d3ee" },  // 15 mid gap
  { x: 620, y: 368 , c: "#60a5fa" },  // 16 lower-right gap  — blue
  { x: 165, y: 140 , c: "#22d3ee" },  // 17 upper-left gap
  // — below-fold nodes revealed by parallax —
  { x: 175, y: 580 , c: "#22d3ee" },  // 18 ext-left
  { x: 425, y: 600 , c: "#60a5fa" },  // 19 ext-center       — blue
  { x: 660, y: 570 , c: "#22d3ee" },  // 20 ext-right
  { x: 300, y: 800 , c: "#a78bfa" },  // 21 deep-left        — violet
  { x: 535, y: 820 , c: "#22d3ee" },  // 22 deep-right
  { x: 150, y: 1020, c: "#22d3ee" },  // 23 floor-left
  { x: 440, y: 1040, c: "#60a5fa" },  // 24 floor-center     — blue
  { x: 670, y: 1010, c: "#22d3ee" },  // 25 floor-right
];

const NET_EDGES = [
  // core mesh
  [0, 1], [1, 2],
  [0, 4], [1, 5], [2, 6],
  [3, 4], [4, 5], [5, 6],
  [3, 7], [4, 8], [5, 9], [6, 10],
  [7, 8], [8, 9], [9, 10],
  [7, 11], [8, 12], [9, 13], [10, 13],
  [11, 12], [12, 13],
  [1, 14], [2, 14], [5, 14], [14, 9],
  [4, 15], [15, 7], [15, 8],
  [9, 16], [10, 16], [16, 12], [16, 13],
  [0, 17], [3, 17], [17, 4], [17, 15],
  // extended rows — parallax reveal
  [11, 18], [12, 18],
  [12, 19], [13, 19], [16, 19],
  [13, 20], [10, 20],
  [18, 21], [19, 21],
  [19, 22], [20, 22], [21, 22],
  [21, 23], [23, 24],
  [22, 24], [22, 25], [24, 25],
];

export const JourneyChart = () => {
  const [inView, setInView] = useState(false);
  const [vbHeight, setVbHeight] = useState(1400);
  const containerRef = useRef(null);
  const parallaxRef = useRef(null);
  const svgRef = useRef(null);
  const visible = usePageVisible();
  const [tick, setTick] = useState(0);
  const [activeEdges, setActiveEdges] = useState([2, 7, 15]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Measure synchronously before first paint so vbHeight is correct on the initial render
  useLayoutEffect(() => {
    if (!parallaxRef.current) return;
    const { width, height } = parallaxRef.current.getBoundingClientRect();
    if (width > 0) setVbHeight(Math.round(height * 800 / width));
  }, []);

  // Then watch for resize (orientation change, window resize)
  useEffect(() => {
    if (!parallaxRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0) setVbHeight(Math.round(height * 800 / width));
    });
    ro.observe(parallaxRef.current);
    return () => ro.disconnect();
  }, []);

  // Parallax: parallaxRef div always in DOM so ref is valid from mount
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !parallaxRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerOffset = window.innerHeight / 2 - (rect.top + rect.height / 2);
      parallaxRef.current.style.transform = `translateY(${centerOffset * 0.3}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      if (!visible.current) return;
      const count = 2 + Math.floor(Math.random() * 2);
      const picked = [];
      while (picked.length < count) {
        const e = Math.floor(Math.random() * NET_EDGES.length);
        if (!picked.includes(e)) picked.push(e);
      }
      setActiveEdges(picked);
      setTick((t) => t + 1);
    }, 4500);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-x-0 bottom-0 pointer-events-none overflow-hidden"
      style={{ top: "6rem", opacity: 0.38 }}
    >
      <div
        ref={parallaxRef}
        style={{ width: "100%", height: "170%", marginTop: "-35%", willChange: "transform" }}
      >
      {inView && (
        <svg
          ref={svgRef}
          viewBox={`0 0 800 ${vbHeight}`}
          preserveAspectRatio="none"
          width="100%"
          height="100%"
        >
          <defs>
            <filter id="jc-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <style>{`
              @keyframes jc-edgein {
                from { opacity:0; }
                to   { opacity:1; }
              }
              @keyframes jc-nodein {
                from { opacity:0; transform:scale(0.1); }
                to   { opacity:1; transform:scale(1);   }
              }
              @keyframes jc-pulse {
                0%   { transform:scale(0.8); opacity:0.75; }
                75%  { transform:scale(2.8); opacity:0;    }
                100% { transform:scale(2.8); opacity:0;    }
              }
              @keyframes jc-core  {
                0%   { opacity:0.95; transform:scale(0.6); }
                30%  { opacity:1;    transform:scale(1.2); }
                100% { opacity:0;    transform:scale(1.5); }
              }
              @keyframes jc-ring1 {
                0%   { opacity:0.9;  transform:scale(0.4); }
                35%  { opacity:0.85; transform:scale(1.6); }
                100% { opacity:0;    transform:scale(2.8); }
              }
              @keyframes jc-ring2 {
                0%   { opacity:0.6;  transform:scale(0.4); }
                40%  { opacity:0.55; transform:scale(2.2); }
                100% { opacity:0;    transform:scale(4.2); }
              }
            `}</style>
          </defs>
          {/* Base edges — fade in together as the mesh materialises */}
          {NET_EDGES.map(([a, b], i) => (
            <line
              key={i}
              x1={NET_NODES[a].x} y1={NET_NODES[a].y}
              x2={NET_NODES[b].x} y2={NET_NODES[b].y}
              stroke="#60a5fa"
              strokeOpacity={0.45}
              strokeWidth={0.5}
              style={{ animation: "jc-edgein 0.8s ease-out both",
                       animationDelay: `${i * 28}ms` }}
            />
          ))}
          {/* Traveling signals — each remounts on tick change to restart animation */}
          {activeEdges.map((edgeIdx) => {
            const [a, b] = NET_EDGES[edgeIdx];
            return (
              <JourneySignal
                key={`sig-${tick}-${edgeIdx}`}
                na={NET_NODES[a]}
                nb={NET_NODES[b]}
                gradId={`jcg-${tick}-${edgeIdx}`}
              />
            );
          })}
          {/* Nodes — staggered entrance; colored nodes pulse continuously */}
          {NET_NODES.map((n, i) => (
            <g key={i}>
              {n.c !== "#22d3ee" && (
                <circle cx={n.x} cy={n.y} r={5} fill="none" stroke={n.c} strokeWidth={1.5}
                  style={{ transformBox: "fill-box", transformOrigin: "center",
                           animation: `jc-pulse 2.8s ease-out ${600 + i * 370}ms infinite` }}
                />
              )}
              <circle cx={n.x} cy={n.y} r={3.5} fill={n.c}
                style={{ transformBox: "fill-box", transformOrigin: "center",
                         animation: "jc-nodein 0.45s ease-out both",
                         animationDelay: `${150 + i * 60}ms` }}
              />
            </g>
          ))}
        </svg>
      )}
      </div>
    </div>
  );
};

// ── 3. Impact: user-growth composed chart (area + line) ───────────────────────
export const ImpactChart = () => {
  const N = 25;
  const [data, setData] = useState(() =>
    Array.from({ length: N }, (_, i) => ({
      i,
      users: 10 + (i / N) * 75 + (Math.random() - 0.5) * 10,
      events: 20 + (i / N) * 60 + (Math.random() - 0.5) * 14,
    }))
  );

  const vRef = useRef({ users: 0, events: 0, phase: Math.random() * Math.PI * 2 });
  const visible = usePageVisible();

  useEffect(() => {
    const id = setInterval(() => {
      if (!visible.current) return;
      setData((prev) => {
        const r = vRef.current;
        r.phase += 0.065;
        const last = prev[prev.length - 1];
        const [nu, vu] = mw(last.users, r.users, 5, 100, Math.sin(r.phase) * 0.4);
        const [ne, ve] = mw(last.events, r.events, 10, 95, Math.sin(r.phase + 1.8) * 0.4);
        r.users = vu; r.events = ve;
        return [...prev.slice(1), { i: last.i + 1, users: nu, events: ne }];
      });
    }, 1300);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.14 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="ig-u" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="i" hide />
          <YAxis hide domain={[0, 110]} />
          <Area
            type="monotone"
            dataKey="users"
            stroke="#60a5fa"
            strokeWidth={2}
            fill="url(#ig-u)"
            isAnimationActive
            animationDuration={800}
          />
          <Line
            type="monotone"
            dataKey="events"
            stroke="#f472b6"
            strokeWidth={1.5}
            dot={false}
            isAnimationActive
            animationDuration={800}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

// ── 4. Ventures: two startup growth curves ────────────────────────────────────
export const VenturesChart = () => {
  const N = 25;
  const [data, setData] = useState(() =>
    Array.from({ length: N }, (_, i) => ({
      i,
      product: 10 + (i / N) * 65 + (Math.random() - 0.5) * 12,
      traction: 5 + (i / N) * 75 + (Math.random() - 0.5) * 10,
    }))
  );

  const vRef = useRef({ product: 0, traction: 0, phase: Math.random() * Math.PI * 2 });
  const visible = usePageVisible();

  useEffect(() => {
    const id = setInterval(() => {
      if (!visible.current) return;
      setData((prev) => {
        const r = vRef.current;
        r.phase += 0.055;
        const last = prev[prev.length - 1];
        const [np, vp] = mw(last.product, r.product, 8, 92, Math.sin(r.phase) * 0.4);
        const [nt, vt] = mw(last.traction, r.traction, 5, 95, Math.sin(r.phase + 2.5) * 0.4);
        r.product = vp; r.traction = vt;
        return [...prev.slice(1), { i: last.i + 1, product: np, traction: nt }];
      });
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.14 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="i" hide />
          <YAxis hide domain={[0, 100]} />
          <Line
            type="monotone"
            dataKey="product"
            stroke="#22d3ee"
            strokeWidth={2.5}
            dot={false}
            isAnimationActive
            animationDuration={900}
          />
          <Line
            type="monotone"
            dataKey="traction"
            stroke="#f472b6"
            strokeWidth={2.5}
            dot={false}
            isAnimationActive
            animationDuration={900}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// ── 5b. Inline radar — accepts data + color, renders in flow (not absolute) ───
export const InlineRadarChart = ({ data, color = "#22d3ee" }) => (
  <ResponsiveContainer width="100%" height="100%">
    <RadarChart data={data} margin={{ top: 10, right: 35, left: 35, bottom: 10 }}>
      <PolarGrid stroke={color} strokeOpacity={0.3} />
      <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 10 }} />
      <Radar
        dataKey="v"
        stroke={color}
        strokeWidth={2}
        fill={color}
        fillOpacity={0.2}
        isAnimationActive
        animationDuration={700}
        animationBegin={0}
      />
    </RadarChart>
  </ResponsiveContainer>
);

// ── 5. Education: radar / skills spider chart ─────────────────────────────────
const RADAR_SUBJECTS = ["ML & AI", "Systems", "Leadership", "Data Eng", "Cloud", "Product"];
const RADAR_BASE = [88, 92, 95, 85, 82, 80];

export const EducationChart = () => {
  const [data, setData] = useState(() =>
    RADAR_SUBJECTS.map((subject, i) => ({ subject, v: RADAR_BASE[i] }))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) =>
        prev.map((d, i) => ({
          ...d,
          v: rw(d.v, RADAR_BASE[i] - 10, RADAR_BASE[i] + 5, 4),
        }))
      );
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.16 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 20, right: 60, left: 60, bottom: 20 }}>
          <PolarGrid stroke="#22d3ee" strokeOpacity={0.35} />
          <PolarAngleAxis dataKey="subject" hide />
          <Radar
            dataKey="v"
            stroke="#22d3ee"
            strokeWidth={1.5}
            fill="#22d3ee"
            fillOpacity={0.12}
            isAnimationActive
            animationDuration={1200}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
