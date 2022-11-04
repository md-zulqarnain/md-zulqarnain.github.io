import { DataService } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-fasting',
  templateUrl: './fasting.component.html',
  styleUrls: ['./fasting.component.scss']
})
export class FastingComponent implements OnInit {  
  constructor(private dataService: DataService) { }

  fastingData: any;
  monthDay: any;
  date: any = new Date();
  ngOnInit(): void {
    this.getTimeByMonth()
  }

  getTimeByMonth() {
    let month = this.date.getMonth();
    this.monthDay = this.date.getDate();
    console.log(month, this.monthDay)
    this.dataService.getTimeByMonth(`timing-data-${month+1}`).subscribe((res) => {
      this.fastingData = res;
    })
  }

}
