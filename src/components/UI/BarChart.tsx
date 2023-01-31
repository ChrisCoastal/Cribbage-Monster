import { nanoid } from 'nanoid';
import React, { FC } from 'react';
import ToolTip from './ToolTip';

type BarChartProps = {
  barValues: { totalValue: number; [key: string]: number }[];
  colLabels?: string[];
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
        className="relative rounded-t-sm bg-stone-900 transition-all duration-300 hover:shadow-[0_-0.1rem_0.25rem_0.25rem_#a855f755]"
        style={{ height: totalHeight }}>
        <ToolTip text={toolTip} customWrapperStyles="flex flex-col justify-end">
          {segments}
        </ToolTip>
      </div>
    );
  });

  const columnLabels = colLabels?.map((label, i) => {
    return (
      <span
        key={nanoid()}
        className={`relative row-start-2 justify-self-center whitespace-nowrap text-xs font-light tracking-wider text-stone-300`}>
        <p>{label.slice(0, 3)}</p>
      </span>
    );
  });

  return (
    <div className="grid h-[90%] w-full grid-cols-[min-content,_repeat(7,1fr)] grid-rows-[1fr,_min-content] items-end gap-1 md:gap-2">
      <div className="flex h-full flex-col items-center justify-between text-stone-300">
        <span className="text-sm font-light">{graphMax}</span>
        <span className="text-sm font-light">{graphMax / 2}</span>
        <span className="text-sm font-light">{0}</span>
      </div>
      <span className="col-start-1 row-start-2"></span>
      {bars}
      {columnLabels}
    </div>
  );
};

export default BarChart;
