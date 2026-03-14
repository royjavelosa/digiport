export const CEUIcon = ({ size = 40, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 110"
    width={size}
    height={size}
    fill={color}
  >
    {/*
      CEU shield silhouette — clean escutcheon shape
      Rectangular top, sides taper toward a rounded point at bottom
    */}
    <path d="
      M 8 8
      H 92
      V 65
      C 92 80 72 95 50 104
      C 28 95 8 80 8 65
      Z
    " />

    {/* Inner shield inset — gives depth, evenodd punches it slightly */}
    <path
      fillRule="evenodd"
      d="
        M 8 8 H 92 V 65
        C 92 80 72 95 50 104
        C 28 95 8 80 8 65 Z

        M 16 16 H 84 V 64
        C 84 76 67 89 50 97
        C 33 89 16 76 16 64 Z
      "
    />
  </svg>
);
