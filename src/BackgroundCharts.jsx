import React, { useState, useEffect, useRef } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
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

// ── 1. Hero: live system-monitoring area chart (3 overlapping series) ─────────
export const HeroChart = () => {
  const N = 60;
  const [data, setData] = useState(() => {
    const a = initSeries(N, 50, 95);
    const b = initSeries(N, 25, 70);
    const c = initSeries(N, 35, 80);
    return a.map((v, i) => ({ i, a: v, b: b[i], c: c[i] }));
  });
  const vRef = useRef({ a: 0, b: 0, c: 0, phase: Math.random() * Math.PI * 2 });

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const r = vRef.current;
        r.phase += 0.08;
        let next = prev;
        for (let s = 0; s < 4; s++) {
          const last = next[next.length - 1];
          const [na, va] = mw(last.a, r.a, 30, 98, Math.sin(r.phase) * 0.8, 4);
          const [nb, vb] = mw(last.b, r.b, 15, 78, Math.sin(r.phase + 2.1) * 0.8, 4);
          const [nc, vc] = mw(last.c, r.c, 20, 88, Math.sin(r.phase + 4.2) * 0.8, 4);
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

// ── 2. Journey: team & system scale bar chart across career years ─────────────
const JOURNEY_YEARS = ["'08", "'10", "'12", "'14", "'16", "'18", "'19", "'21", "'22", "'23"];
const JOURNEY_BASE =  [  28,   35,   42,   55,   48,   62,   74,   85,   88,   95  ];

export const JourneyChart = () => {
  const [data, setData] = useState(() =>
    JOURNEY_YEARS.map((y, i) => ({ y, v: JOURNEY_BASE[i] }))
  );
  const vRef = useRef({ vels: JOURNEY_YEARS.map(() => 0), phase: Math.random() * Math.PI * 2 });

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const r = vRef.current;
        r.phase += 0.05;
        return prev.map((d, i) => {
          const base = JOURNEY_BASE[i];
          const [newV, vel] = mw(d.v, r.vels[i], base - 20, base + 20, Math.sin(r.phase + i * 0.6) * 0.6, 4);
          r.vels[i] = vel;
          return { ...d, v: newV };
        });
      });
    }, 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.13 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 60, right: 30, left: 30, bottom: 0 }}
        >
          <defs>
            <linearGradient id="jg-bar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#818cf8" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <XAxis dataKey="y" hide />
          <YAxis hide domain={[0, 115]} />
          <Bar
            dataKey="v"
            fill="url(#jg-bar)"
            radius={[4, 4, 0, 0]}
            isAnimationActive
            animationDuration={900}
          />
        </BarChart>
      </ResponsiveContainer>
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

  useEffect(() => {
    const id = setInterval(() => {
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

  useEffect(() => {
    const id = setInterval(() => {
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
