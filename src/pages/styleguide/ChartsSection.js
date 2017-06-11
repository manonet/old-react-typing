import React from "react";

import vars from "../../variables";

// helpers
function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function PieChartDeco1 (props) {
  if (props.decorated) {
    return (
      <circle
        className="pie-decor"
        cx={props.cx}
        cy={props.cy}
        r={props.r}
        stroke={props.stroke}
        fill={props.fill}
        strokeWidth={props.strokeWidth}
        strokeDasharray={props.strokeDasharray}
        strokeDashoffset={props.strokeDashoffset || 0}
        transform={props.transform}
      />
    );
  } else {
    return null;
  }
}

function PieChartLabel (props) {
  if (props.labeled) {
    return (
      <text
        className="pie-label"
        x={props.x}
        y={props.y}
        textAnchor="middle"
      >{props.label}</text>
    );
  } else {
    return null;
  }
}

function PieChart (props) {
  // props
  let unitAll = props.unitAll;
  let unitPart = props.unitPart;
  let percent = props.percent || unitPart / unitAll * 100 || 0;

  let archWidth = props.archWidth || 10;
  let r = props.r || 50 // radius
  let rArch = r - archWidth / 2;
  let padding = props.padding || 20;
  let color = props.color || "hotpink";
  let bgcolor = props.bgcolor || "#ddd";
  let strokeLinecap = props.strokeLinecap || "butt";
  let rotation = props.rotation || 0; // 0 - default left
  let circleFill = props.circleFill || "none";
  let filter = props.filter || "none";

  // animation
  let repeatCount = props.repeatCount || 1; // 0, 1, ... indefinite
  let dur = props.dur || "2s"; // duration
  // decoration
  let decorated = props.decorated || false;
  let decoStrokeWidth = props.decoStrokeWidth || 5;
  let decoR = props.decoR - decoStrokeWidth / 2 || rArch + archWidth / 2 + 5;
  let decoStroke = props.decoStroke || "#000";
  let decoFill = props.decoFill || "none";
  let decoStrokeDashWidth = props.decoStrokeDashWidth || 2;
  let decoC = 2 * decoR * Math.PI; // circumference of deco circle
  let decoStrokeDasharray = props.decoStrokeDasharray || decoStrokeDashWidth + "," + (decoC / (unitAll || 100) - decoStrokeDashWidth)  || "1,3";
  let c = 2 * rArch * Math.PI; // circumference of deco circle
  let strokeDasharray = props.strokeDasharray || (c / (unitAll / 10) - decoStrokeDashWidth) + "," + decoStrokeDashWidth || "";

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
      <filter id="insetshadow"  x="-10" y="-10" width={width + 20} height={height + 20}>
        <feFlood floodColor="black"/>
        <feComposite operator="out" in2="SourceGraphic"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite operator="atop" in2="SourceGraphic"/>
      </filter>

      <circle
        className="pie-bg"
        cx={cx}
        cy={cy}
        r={rArch}
        stroke={bgcolor}
        fill={circleFill}
        strokeWidth={archWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={-decoStrokeDashWidth}
        transform={"rotate(" + (rotation + 180) + " " + cx + " " + cy + ")"}
      />

      <PieChartDeco1
        decorated={decorated}
        cx={cx}
        cy={cy}
        r={decoR}
        stroke={decoStroke}
        fill={decoFill}
        strokeWidth={decoStrokeWidth}
        strokeDasharray={decoStrokeDasharray}
        transform={"rotate(" + (rotation + 180) + " " + cx + " " + cy + ")"}
      />

      <path
        className="pie-path"
        d={"M" + arcStartX + " " + arcStartY +
        "A " + rArch + " " + rArch + " 0 " + largeArcFlag + " 1 " + arcEndX + " " + arcEndY
        }
        stroke={color}
        fill="none"
        strokeLinecap={strokeLinecap}
        strokeWidth={archWidth}
        strokeDasharray={s}
        strokeDashoffset={s}
        filter={filter}
      >
        <animate attributeType="XML" attributeName="stroke-dashoffset" from={s} to="0" dur={dur} repeatCount={repeatCount} fill="freeze"/>
      </path>
      <PieChartLabel
        labeled={true}
        label={parseFloat(Math.round(percent * 10) / 10).toFixed(1) + "%"}
        x={cx}
        y={cy}
      />
    </svg>
  );
}

function PieChart1 (props) {
  return (
    <PieChart
      r={100}
      percent={props.percent}
      archWidth={100}
      color="fuchsia"
      bgcolor="yellow"
      decorated={true}
    />
  )
}

function PieChart2 (props) {
  return (
    <PieChart
      r={80}
      unitAll={props.unitAll}
      unitPart={props.unitPart}
      percent={props.percent}
      rotation={90}
      archWidth={14}
      color="skyblue"
      bgcolor="#777"
      circleFill="#eee"

      decorated={true}
      decoR={"80"}
      decoStroke="#eee"
      decoFill={"none"}
      decoStrokeWidth={7}
    />
  )
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
          <PieChart1
            percent={65.5}
          />
          <PieChart2
            unitAll={150}
            unitPart={49}
          />
          <PieChart
            r={60}
            percent={82}
            rotation={-90}
            archWidth={10}
            strokeLinecap="round"
            color="#79bd9a"
            bgcolor="none"
            filter={`url(#insetshadow)`}
          />


        </section>
      )
  }
}
