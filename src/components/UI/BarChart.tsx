import React, { FC } from 'react';

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
    const segments = [];

    for (const height in segmentValues) {
      const segment = (
        <div
          className="hover:b w-full bg-green-400 bg-gradient-to-b from-purple-500 to-purple-700"
          style={{
            height: `${segmentValues[height] ? (segmentValues[height] / bar.totalValue) * 100 : 0}%`
          }}></div>
      );
      segments.push(segment);
    }

    return (
      <div
        key={i}
        className="flex flex-col justify-end rounded-t-sm bg-stone-900 transition-all duration-300 hover:shadow-[0_0_0.25rem_0.25rem_#a855f755]"
        style={{ height: totalHeight }}>
        {segments}
      </div>
    );
  });

  const labels = colLabels?.map((label, i) => {
    return (
      <span key={i} className={`row-start-2 justify-self-center`}>
        {label}
      </span>
    );
  });

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
