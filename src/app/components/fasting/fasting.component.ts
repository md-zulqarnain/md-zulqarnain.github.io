import { DataService } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-fasting',
  templateUrl: './fasting.component.html',
  styleUrls: ['./fasting.component.scss']
})
export class FastingComponent implements OnInit {  
  constructor(private dataService: DataService, private datePipe: DatePipe) { }
  monthDay: any;
  sahriTime: any;
  iftarTime: any;
  iftarTimeLeft: any;
  sahriTimeLeft: any;
  dayNum: any = 1;
  date: any = new Date();
  ngOnInit(): void {
    this.monthDay = this.date.getDate();
    this.getTimeByMonth()
  }

  getTimeByMonth() {
    let month = this.date.getMonth();
    this.dataService.getTimeByMonth(`timing-data-${month+1}`).subscribe((res) => {
      this.sahriTime = res.sahri;
      this.iftarTime = res.iftar;
      this.checkIsFastOver()
    })
  }

  checkIsFastOver() {
    let currentDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    let todayIftarTime = new Date(`${currentDate} ${this.iftarTime[this.monthDay - this.dayNum]} PM`)
    let todaySahriTime = new Date(`${currentDate} ${this.sahriTime[this.monthDay - this.dayNum]} AM`)

    let checkFastTimeInterval = setInterval(() => { 
      if (this.date.getTime() + (60000*15) > todayIftarTime.getTime()) { 
        console.log(this.monthDay, 'this.monthDay')
        this.monthDay = this.monthDay + 1;
        let date = this.date.setDate(this.date.getDate() + 1)
        this.date = new Date(date);
        clearInterval(checkFastTimeInterval)
      }
    }, 1000)
    
    let iftarTimeLeftInterval = setInterval(() => { 
      var date = new Date();
      let timeLeft = todayIftarTime.getTime() - date.getTime();
      if (timeLeft > 0) {
        var hhmmssFormat = new Date(timeLeft).toISOString().slice(11, 19);
        this.iftarTimeLeft = hhmmssFormat;
      } else { 
        clearInterval(iftarTimeLeftInterval)
      }
    }, 1000)
    
    // let sahriTimeLeftInterval = setInterval(() => { 
    //   var date = new Date();
    //   let timeLeft = todaySahriTime.getTime() - date.getTime();
    //   if (timeLeft) {
    //     var hhmmssFormat = new Date(timeLeft).toISOString().slice(11, 19);
    //     this.sahriTimeLeft = hhmmssFormat;
    //     console.log(timeLeft, 'todaySahriTime')
    //   } else { 
    //     clearInterval(sahriTimeLeftInterval)
    //   }
    // },1000)

  }

}
