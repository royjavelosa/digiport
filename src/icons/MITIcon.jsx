export const MITIcon = ({ size = 40, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 165 75"
    width={size}
    height={size}
    fill={color}
  >
    {/* M — three equal pillars connected by a top bar */}
    <rect x="0"  y="15" width="14" height="60" />
    <rect x="23" y="15" width="14" height="60" />
    <rect x="46" y="15" width="14" height="60" />
    <rect x="0"  y="15" width="60" height="14" />

    {/* i — dot + body */}
    <rect x="75" y="1"  width="14" height="13" />
    <rect x="75" y="18" width="14" height="57" />

    {/* T — wide top bar + centred vertical */}
    <rect x="97"  y="15" width="68" height="14" />
    <rect x="123" y="15" width="16" height="60" />
  </svg>
);
