import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare let google: any;




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  options3: any;

  @ViewChild('gaugeChart')
  gaugeChart!: ElementRef

  drawChart = () => {

    const data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Memory', 50],
      ['CPU', 99],
      ['GPU', 70],
      ['Disk', 20]
    ]);

    const options = {
      width: 400, height: 120,
      redFrom: 90, redTo: 100,
      yellowFrom: 75, yellowTo: 90,
      minorTicks: 5
    };

    const chart = new google.visualization.Gauge(this.gaugeChart.nativeElement);

    chart.draw(data, options);
    setInterval(() => {
      data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
      chart.draw(data, options);
    }, 100);
    setInterval(() => {
      data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
      chart.draw(data, options);
    }, 100);
    setInterval(() => {
      data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
      chart.draw(data, options);
    }, 100);
    setInterval(() => {
      data.setValue(3, 1, 60 + Math.round(20 * Math.random()));
      chart.draw(data, options);
    }, 100);

    chart.draw(data, options);
  }

  @ViewChild('pieChart')
  pieChart!: ElementRef;

  drawChart2 = () => {

    const data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work', 11],
      ['Eat', 2],
      ['Commute', 2],
      ['Watch TV', 2],
      ['Sleep', 7]
    ]);

    const options = {
      title: 'My Daily Activities',
      legend: { position: 'top' },
      is3D: true,
    };

    const chart = new google.visualization.PieChart(this.pieChart.nativeElement);

    chart.draw(data, options);
  }

  ngAfterViewInit() {
    google.charts.load('current', { 'packages': ['gauge'] });
    google.charts.setOnLoadCallback(this.drawChart);
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart2);
  }


  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {

    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options3 = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: data1,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: 'bar2',
          type: 'bar',
          data: data2,
          animationDelay: (idx: number) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };

  }

}
