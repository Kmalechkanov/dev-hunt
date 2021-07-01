import { Component, Input, OnInit } from '@angular/core';
import 'cal-heatmap';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {
  @Input() data!: any;

  constructor() {
  }

  ngOnInit(): void {
    var cal = new CalHeatMap();
    cal.init({
      itemSelector: "#heatmap",
      domain: "month",
      range: 5,
      data: this.data,
      cellSize: 8,
      displayLegend: false,
      animationDuration: 500,
      nextSelector: "#heatmap-next",
      previousSelector: "#heatmap-previous"
    });
  }

}
