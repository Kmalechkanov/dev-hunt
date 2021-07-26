import { Component, Input, OnInit, ViewChild } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels
} from "ng-apexcharts";
import { take } from "rxjs/operators";
import { HireService } from "src/app/services/hire.service";
import { Developer } from "src/app/shared/models/developer.model";
import { Hire } from "src/app/shared/models/hire.model";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: any;
};

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {
  @Input() data!: Developer;
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  hires: Hire[] = [];
  dates: Date[] = [];

  constructor(
    private hireService: HireService,
  ) {
  }

  generateSeries() {
    const day = 60 * 60 * 24 * 1000;
    var currentDate = this.dates[0].getTime() - (this.dates[0].getDay() * day);
    var stopDateUnix = this.dates[this.dates.length - 1].getTime();

    console.log('currentStart', currentDate)
    console.log('currentEnd', stopDateUnix)

    let counter = 0;
    let serie = [];
    while (currentDate <= stopDateUnix) {
      let date = this.dates.find(x => x.getTime() == currentDate);
      if (date != undefined) {
        serie.push({ x: 10, y: date.getDate(), fillColor: 'red', meta: 'test' })
      }
      else {
        serie.push({ x: 10, y: 0 })
      }

      if (counter == 7) {
        counter = 0;
        let date = new Date(currentDate).toISOString().slice(0, 10);
        this.chartOptions.series?.push({
          name: date,
          data: serie,
        });
        serie = [];
      }
      currentDate += day;
      counter++;
    }
  }

  private hiresToData(hires: Hire[]): any {
    hires.forEach(hire => {
      this.getDates(hire.startDate!, hire.endDate!);
    });
    this.sortByDate();
  }

  private getDates(startDateUnix: number, stopDateUnix: number) {
    var currentDate = startDateUnix;
    const day = 60 * 60 * 24 * 1000;

    while (currentDate <= stopDateUnix) {

      this.dates.push(new Date(currentDate));
      currentDate += day;
    }
  }

  public sortByDate(): void {
    this.dates.sort((a: Date, b: Date) => {
      return a.getTime() - b.getTime();
    });
  }

  ngOnInit(): void {
    console.log(this.data)
    this.hireService.getAllMatching$(undefined, this.data.id)
      .pipe(take(1)).subscribe(hires => {
        console.log(hires);
        this.hires = hires;
        this.hiresToData(hires);
        this.generateSeries();
      });

    this.chartOptions = {
      series: [
      ],
      chart: {
        height: 350,
        width: 900,
        type: "heatmap"
      },
      dataLabels: {
        enabled: true,
      },
      colors: ["#008FFB"],
      title: {
        text: "Hire History"
      }
    };
  }

}
