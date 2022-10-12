import { Component, OnInit } from '@angular/core';
import { graphic } from 'echarts';

@Component({
  selector: 'app-trends-graph',
  templateUrl: './trends-graph.component.html',
  styleUrls: ['./trends-graph.component.scss'],
})
export class TrendsGraphComponent implements OnInit {
  options: any;
  private readonly MAX_X = 22;
  private readonly MAX_Y = 50;
  private readonly Y_DELTA = 2;
  constructor() {}

  ngOnInit(): void {
    // const xAxisData = [];
    const data = [];
    // const data2 = [];

    for (let i = 0; i < this.MAX_X; i++) {
      data.push(i);
    }

    this.options = {
      color: ['#DFE0EB', '#3751FF'],
      legend: {
        data: ['Today', 'Yesterday'],
        align: 'left',
      },
      tooltip: {
        trigger: 'axis',
        renderMode: 'html',
        // showContent: false,
        // className: 'echarts-tooltip echarts-tooltip-dark',
        appendToBody: true,
        position: function (point: any) {
          // fixed at top
          return [point[0], '10%'];
        },
        backgroundColor: '#fff',
        borderColor: 'rgba(1, 1, 1, 0)',
        padding: 3,
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.0);',
        axisPointer: {
          type: 'none',
        },
      },
      xAxis: {
        type: 'category',
        data: data,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        position: 'right',
      },

      series: [
        {
          data: this.generateData(),
          type: 'line',
          smooth: true,
          showSymbol: false,
        },

        {
          data: this.generateData(),
          type: 'line',
          smooth: true,
          showSymbol: false,
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0.5,
                color: '#3751FF22',
              },
              {
                offset: 0.9,
                color: '#3751FF00',
              },
            ]),
          },
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  }

  private generateData() {
    let prev = this.generateRandomStep(this.MAX_Y / 2);
    const randomData = [];
    for (let i = 0; i < this.MAX_X; i++) {
      const iterationResult = this.generateRandomStep(prev);
      prev = iterationResult;
      randomData.push(iterationResult);
    }
    return randomData;
  }

  private generateRandomStep(prev: number): number {
    const randomInCorrectRange =
      ~~(Math.random() * this.Y_DELTA) * this.generateRandomSign();
    const result = prev + randomInCorrectRange;
    return result <= this.MAX_Y && result >= 0 && result !== prev
      ? result
      : this.generateRandomStep(prev);
  }

  private generateRandomSign(): -1 | 1 {
    const result = ~~(Math.random() * 2);
    if (result == 0) return -1;
    else return 1;
  }
}
