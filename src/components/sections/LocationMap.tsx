/** An illustrative connectivity diagram, deliberately not a geographic navigation map. */
export default function LocationMap() {
  return (
    <div className="location-map">
      <svg
        viewBox="0 0 520 330"
        role="img"
        aria-label="Illustrative connection from Hyderabad through Tukkuguda to Farm Natura in Kandukur"
      >
        <defs>
          <pattern id="contour" width="70" height="70" patternUnits="userSpaceOnUse">
            <path
              d="M0 20Q35-15 70 20M0 35Q35 0 70 35M0 50Q35 15 70 50"
              fill="none"
              stroke="#d0d7c2"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="520" height="330" fill="url(#contour)" />
        <path
          d="M80 48C70 125 295 96 280 169S380 216 420 273"
          fill="none"
          stroke="#8f9c7c"
          strokeWidth="8"
        />
        <path
          d="M80 48C70 125 295 96 280 169S380 216 420 273"
          fill="none"
          stroke="#e8ecdd"
          strokeWidth="2"
          strokeDasharray="7 6"
        />
        <path d="M280 169L120 210" stroke="#8f9c7c" strokeWidth="5" />
        <circle cx="80" cy="48" r="8" fill="#2b402e" />
        <text x="102" y="53" fill="#2b402e" fontSize="17" fontFamily="Arial">
          Hyderabad
        </text>
        <circle cx="280" cy="169" r="7" fill="#2b402e" />
        <text x="300" y="162" fill="#2b402e" fontSize="15" fontFamily="Arial">
          Tukkuguda ORR
        </text>
        <circle cx="120" cy="210" r="7" fill="#2b402e" />
        <text x="33" y="241" fill="#2b402e" fontSize="14" fontFamily="Arial">
          International Airport
        </text>
        <circle cx="420" cy="273" r="22" fill="#2b402e" />
        <path
          d="M420 284V265m0 7c-10-1-13-7-12-14 9 0 14 5 12 14Zm0-5c0-8 5-12 12-12 0 8-4 12-12 12Z"
          fill="#e6ead8"
          stroke="#e6ead8"
          strokeWidth="1.2"
        />
        <text x="323" y="316" fill="#2b402e" fontSize="16" fontFamily="Arial">
          Farm Natura · Kandukur
        </text>
      </svg>
      <span className="map-label">Connectivity illustration · Not to scale</span>
    </div>
  );
}
