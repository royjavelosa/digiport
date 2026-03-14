export const GoogleIcon = ({ size = 40, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width={size}
    height={size}
    fill={color}
  >
    {/*
      G shape: outer arc (300°) + crossbar + inner arc back to gap
      Outer R=43, inner r=29, center (50,50)
      Gap opens at ~60° from positive-x (top-right)
    */}
    <path d="
      M 93 44
      H 50
      V 62
      H 78
      A 29 29 0 1 1 65 24
      L 72 12
      A 43 43 0 0 1 93 44
      Z
    " />
  </svg>
);
