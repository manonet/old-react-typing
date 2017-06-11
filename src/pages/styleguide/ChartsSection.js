import React from "react";

import vars from "../../variables";

// helpers
function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function PieChart (props) {
  // props
  let archWidth = props.archWidth || 10;
  let r = props.r || 50 // radius
  let rArch = r - archWidth / 2;
  let padding = props.padding || 20;
  let percent = props.percent || 0;
  let color = props.color || "hotpink";
  let bgcolor = props.bgcolor || "#ddd";
  let strokeLinecap = props.strokeLinecap || "butt";
  let rotation = props.rotation || 0; // 0 - default left
  let circleFill = props.circleFill || "none";
  // animation
  let repeatCount = props.repeatCount || 1; // 0, 1, ... indefinite
  let dur = props.dur || "2s"; // duration

  // calculated values
  let cx = r + padding;
  let cy = r + padding;
  let startAngle = 0 + rotation;
  let angle = percent / 100 * 360 + rotation;
  let largeArcFlag = percent > 50 ? 1 : 0;

  let arcStartX = cx - rArch * Math.cos(toRadians(startAngle));
  let arcStartY = cy - rArch * Math.sin(toRadians(startAngle));
  let arcEndX = cx - rArch * Math.cos(toRadians(angle));
  let arcEndY = cy - rArch * Math.sin(toRadians(angle));

  // svg dimensions
  let width = (r + padding) * 2;
  let height = (r + padding) * 2;

  // arc length
  let s = rArch * toRadians(angle - startAngle);


  //"L " + cx + " " + cy + " Z" // for closed shape
  // filter={`url(#dropshadow)`} // for shadow

  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <filter id="dropshadow"  x="-10" y="-10" width={width + 20} height={height + 20}>
        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
        <feOffset dx="1" dy="1" result="offsetblur"/>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <circle cx={cx}
              cy={cy}
              r={rArch}
              stroke={bgcolor}
              fill={circleFill}
              strokeWidth={archWidth}/>

      <path className="path" d={"M" + arcStartX + " " + arcStartY +
              "A " + rArch + " " + rArch + " 0 " + largeArcFlag + " 1 " + arcEndX + " " + arcEndY
              }
              stroke={color}
              fill="none"
              strokeLinecap={strokeLinecap}
              strokeWidth={archWidth}
              strokeDasharray={s}
              strokeDashoffset={s}>

        <animate attributeType="XML" attributeName="stroke-dashoffset" from={s} to="0" dur={dur} repeatCount={repeatCount} fill="freeze"/>
      </path>
    </svg>
  );
}


export default class ChartsSection extends React.Component {
  render() {

      return (
        <section class="section section--charts">

          <h2>Charts</h2>

          <h3>Pie</h3>

          <PieChart/>
          <PieChart
            r={20}
            percent={35.5}
            archWidth={5}
            strokeLinecap="round"
            color="darkviolet"
          />
          <PieChart
            r={100}
            percent={65.5}
            archWidth={100}
            color="fuchsia"
            bgcolor="yellow"
          />
          <PieChart
            r={80}
            percent={35.5}
            rotation={90}
            archWidth={15}
            strokeLinecap="round"
            color="skyblue"
            bgcolor="#777"
            circleFill="#eee"
          />
          <PieChart
            r={60}
            percent={82}
            rotation={-90}
            archWidth={10}
            strokeLinecap="round"
            color="#79bd9a"
            bgcolor="none"
          />

        </section>
      )
  }
}
