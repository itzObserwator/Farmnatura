export default function ApproachDiagram() {
  return (
    <section className="kg-approach" aria-label="Our approach">
      <div className="kg-approach-stage">
        <svg className="kg-radial" viewBox="0 0 1000 1000" fill="none" aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i}>
              <path
                className="kg-spoke"
                d={`M500 500L${500 + Math.cos((i * Math.PI) / 4) * 440} ${500 + Math.sin((i * Math.PI) / 4) * 440}`}
              />
              <text
                className="kg-spoke-label"
                x={500 + Math.cos((i * Math.PI) / 4) * 470}
                y={500 + Math.sin((i * Math.PI) / 4) * 470}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          ))}
        </svg>
        <h2 className="kg-approach-first">
          <span className="kg-approach-line">
            <span>Rooted & Real</span>
          </span>
          <span className="kg-approach-line">
            <span>Essential</span>
          </span>
        </h2>
        <h2 className="kg-approach-second">
          <span className="kg-approach-line">
            <span>Simplicity & Care</span>
          </span>
          <span className="kg-approach-line">
            <span>in Every Season</span>
          </span>
        </h2>
      </div>
    </section>
  );
}
