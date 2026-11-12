// A day of forecast hydration need, drawn once on load. The shape follows the
// pattern the Well360 model produces: low overnight, rising through the
// morning, peaking mid-afternoon and easing in the evening.
const POINTS = [
  [0, 78], [60, 76], [120, 70], [180, 58], [240, 46], [300, 40], [360, 36],
  [420, 30], [480, 22], [540, 18], [600, 20], [660, 28], [720, 38],
  [780, 48], [840, 58], [900, 66], [960, 72],
];

// Smooth curve through the points with Catmull-Rom to cubic Bezier conversion.
const toPath = (pts) => {
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${p2[0]} ${p2[1]}`;
  }
  return d;
};

const PATH = toPath(POINTS);
const HOURS = ["06:00", "10:00", "14:00", "18:00", "22:00"];
const PEAK = POINTS[9];

const ForecastLine = () => (
  <figure className="w-full">
    <svg
      viewBox="-4 0 972 100"
      preserveAspectRatio="none"
      className="h-24 w-full overflow-visible sm:h-28"
      role="img"
      aria-label="Forecast hydration need across one day, peaking in the afternoon"
    >
      <defs>
        <linearGradient id="forecast-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--water)" stopOpacity="0.22" />
          <stop offset="1" stopColor="var(--water)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${PATH} L 960 100 L 0 100 Z`} fill="url(#forecast-area)" className="forecast-fill" />
      <path
        d={PATH}
        pathLength="1"
        fill="none"
        stroke="var(--water)"
        strokeWidth="2.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className="forecast-path"
      />
      <g className="forecast-marker" style={{ animationDelay: "2.3s" }}>
        <line x1={PEAK[0]} x2={PEAK[0]} y1={PEAK[1]} y2="100" stroke="var(--line-strong)" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" />
        <circle cx={PEAK[0]} cy={PEAK[1]} r="5" fill="var(--paper)" stroke="var(--water)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
    <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-xs text-faint">
      <ol className="flex w-full justify-between tabular-nums" aria-hidden="true">
        {HOURS.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ol>
    </figcaption>
    <p className="mt-2 max-w-xl text-sm text-faint">
      Hydration need across one day, as forecast by the Well360 model from my published research.
    </p>
  </figure>
);

export default ForecastLine;
