
import { ICSSChartSeries } from './IReUsableInterfaces';

export interface ICssreactbarchartState {
  toggle: boolean;
  chartData: ICSSChartSeries[];
  startTime: number;
  endTime: number;
  rangeTime: number;
  startLocal: string;
  endLocal: string;
}
