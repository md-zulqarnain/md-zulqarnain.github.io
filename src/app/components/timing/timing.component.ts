import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-timing',
  templateUrl: './timing.component.html',
  styleUrls: ['./timing.component.scss']
})
export class TimingComponent implements OnInit {
  timing: any
  date: any = new Date();
  maghribTime: any
  maghribJmhTime: any
  dayNum: any = 1;
  monthDay: any;
  constructor(private userService: UserService, private dataService: DataService) { }

  
  ngOnInit(): void {
    this.getTiming()
    this.getTimeByMonth()
    this.monthDay = this.date.getDate();
  }

  getTiming() { 
    this.userService.getTiming().subscribe(data => { 
      this.timing = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as{}
        }
      })
      this.timing = this.timing[0]
    })
  }

  getTimeByMonth() {
    let month = this.date.getMonth();
    this.dataService.getTimeByMonth(`timing-data-${month + 1}`).subscribe((res) => {
      console.log(res,'ressss')
      this.maghribTime = this.addMinutes(res.iftar[this.monthDay - this.dayNum], 2)
      this.maghribJmhTime = this.addMinutes(res.iftar[this.monthDay - this.dayNum], 5)
    })
  }

  addMinutes(time: any, add: any) {
    let timeArr = time.split(':');
    let hours = +timeArr[0]
    let minutes = +timeArr[1] + add;
    if (minutes > 59) { 
      minutes -= 60
      hours += 1
    }
    return `${hours}:${minutes}`
  }
}
