import { ResponsiveBarCanvas } from '@nivo/bar'
import { useUsage } from '../hooks/useUsage';

const UsageChart = () => {
  
  const { filteredUsages, costs } = useUsage();

  const dailyCosts = filteredUsages.reduce((acc: { [date: string]: number }, usage) => {
    const cost = costs.find(c => c.model === usage.model);
    const usageCost = (cost ? (cost.input * usage.usage_input + cost.output * usage.usage_output) : 0);

    if (!acc[usage.created_at]) acc[usage.created_at] = 0;
    acc[usage.created_at] += usageCost;
    return acc;
  }, {});

  const data = Object.entries(dailyCosts).map(([date, cost]) => ({ date, cost }));

  return(
    <ResponsiveBarCanvas
        data={data}
        keys={[
            'cost',
        ]}
        indexBy="date"
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        pixelRatio={1}
        padding={0.15}
        innerPadding={0}
        minValue="auto"
        maxValue="auto"
        groupMode="grouped"
        layout="vertical"
        reverse={false}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'red_blue' }}
        colorBy="id"
        borderWidth={0}
        borderRadius={0}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 90,
            legendPosition: 'middle',
            legendOffset: 36,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        enableGridX={true}
        enableGridY={false}
        enableLabel={true}
        enableTotals={false}
        totalsOffset={10}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        isInteractive={true}
        legends={[]}
    />
  )
}

export default UsageChart