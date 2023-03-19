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
  data: any;
  addDay: Number = 2
  todayDate: any = new Date()
  ngOnInit(): void {
    this.monthDay = this.date.getDate();
    this.getTimeByMonth()
  }

  getTimeByMonth() {
    let month = this.date.getMonth();
    this.dataService.getTimeByMonth(`timing-data-${month + 1}`).subscribe((res) => {
      this.data = res;
      this.sahriTime = this.addMinutes(res.sahri[this.monthDay - this.dayNum], this.addDay)
      this.iftarTime = this.addMinutes(res.iftar[this.monthDay - this.dayNum], this.addDay)
      this.checkIsFastOver()
    })
  }

  checkIsFastOver() {
    let currentDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    let todayIftarTime = new Date(`${currentDate} ${this.iftarTime} PM`)
    let todaySahriTime = new Date(`${currentDate} ${this.sahriTime} AM`)

    console.log('data')
    
    let checkFastTimeInterval = setInterval(() => { 
      if ((''+this.todayDate.getDate() + this.todayDate.getMonth() + this.todayDate.getFullYear()) == (''+this.date.getDate() + this.date.getMonth() + this.date.getFullYear())) {
          console.log('satisfied')
          if (this.date.getTime() - (60000 * 15) > todayIftarTime.getTime()) {
            console.log('trestst')
            let date = this.date.setDate(this.date.getDate() + 1)
            this.date = new Date(date);
            this.monthDay = this.date.getDate();
            this.sahriTime = this.addMinutes(this.data.sahri[this.monthDay - this.dayNum], this.addDay)
            this.iftarTime = this.addMinutes(this.data.iftar[this.monthDay - this.dayNum], this.addDay)
            clearInterval(checkFastTimeInterval)
          }
        } 
      }, 1000)
     
    let iftarTimeLeftInterval = setInterval(() => { 
      if ((''+this.todayDate.getDate() + this.todayDate.getMonth() + this.todayDate.getFullYear()) == (''+this.date.getDate() + this.date.getMonth() + this.date.getFullYear())) {
        var date = new Date();
        let timeLeft = todayIftarTime.getTime() - date.getTime();
        if (timeLeft > 0) {
          var hhmmssFormat = new Date(timeLeft).toISOString().slice(11, 19);
          this.iftarTimeLeft = hhmmssFormat;
        } else {
          clearInterval(iftarTimeLeftInterval)
        }
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
  addMinutes(time: any, add: any) {

    let timeArr = time.split(':');
    let hours:any = +timeArr[0]
    let minutes:any = +timeArr[1] + add;

    if (minutes > 59) { 
      minutes -= 60
      hours += 1
    }
    minutes = Array.from(String(minutes), num=> Number(num)).length == 1 ? `0${minutes}`: minutes
    hours = Array.from(String(hours), num=> Number(num)).length == 1 ? `0${hours}`: hours
    return `${hours}:${minutes}`
  }

  onSwipeUp(e:any) { 
    console.log(e,'Swipeup')
  }
  previousDay() { 
    let date = this.date.setDate(this.date.getDate() - 1)
    this.monthDay = this.date.getDate();
    this.date = new Date(date);
    this.getTimeByMonth()
  }
  nextDay() { 
    let date = this.date.setDate(this.date.getDate() + 1)
    this.monthDay = this.date.getDate();
    this.date = new Date(date);
    this.getTimeByMonth()
  }
}
