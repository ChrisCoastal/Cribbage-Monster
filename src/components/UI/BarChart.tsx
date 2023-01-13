import { nanoid } from 'nanoid';
import React, { FC } from 'react';
import ToolTip from './ToolTip';

type BarChartProps = {
  barValues: { totalValue: number; [key: string]: number }[];
  colLabels?: string[] | number[];
};

const BarChart: FC<BarChartProps> = ({ barValues, colLabels }) => {
  const numCols = barValues.length;
  const maxBarValue = Math.max(...barValues.map((value) => value.totalValue));
  const graphMax = maxBarValue - (maxBarValue % 10) + 10;
  const barValueTotals: number[] = [];

  // function bars() {
  //   const maxValue = Math.max(...barValueTotals);
  // }

  const bars = barValues.map((bar, i) => {
    const { totalValue, ...segmentValues } = bar;
    const totalHeight = `${(totalValue / graphMax) * 100}%`;
    const segments: JSX.Element[] = [];
    let won, lost;

    for (const key in segmentValues) {
      won = segmentValues[key];
      lost = Math.abs(segmentValues[key] - bar.totalValue);
      console.log(won, lost);

      const segment = (
        <div
          key={nanoid()}
          className="w-full bg-gradient-to-b from-purple-500 to-purple-700"
          style={{
            height: `${segmentValues[key] ? (segmentValues[key] / bar.totalValue) * 100 : 0}%`
          }}></div>
      );

      segments.push(segment);
    }
    const toolTip = `${won} wins | ${lost} losses`;

    return (
      <div
        key={nanoid()}
        className="relative flex flex-col justify-end rounded-t-sm bg-stone-900 transition-all duration-300 hover:shadow-[0_-0.1rem_0.25rem_0.25rem_#a855f755]"
        style={{ height: totalHeight }}>
        <ToolTip text={toolTip} />
        {segments}
      </div>
    );
  });

  const labels = colLabels?.map((label, i) => {
    return (
      <span key={nanoid()} className={`row-start-2 justify-self-center`}>
        {label}
      </span>
    );
  });
  console.log(labels);

  return (
    <div className="grid h-[90%] w-full grid-cols-8 grid-rows-[1fr,_min-content] items-end gap-1 md:gap-2">
      <div className="flex h-full flex-col items-center justify-between text-white">
        <span>{graphMax}</span>
        <span className="relative">{graphMax / 2}</span>
        <span>{0}</span>
      </div>
      <span className="col-start-1 row-start-2"></span>
      {bars}
      {labels}
    </div>
  );
};

export default BarChart;
