Timer = {begin: 0, current: 0, time: 0, end: 0, running:0};
Timer.start = function (){
 this.begin = new Date();
 this.current = this.begin;
 this.running = 1;
 this.end = 0;
}
Timer.run = function(){
 if(this.running){
  setTimeout("Timer.run();", 100)
  this.current = new Date();
  this.time = this.current - this.begin;
 }
}
Timer.stop = function(){
 this.running = 0;
 this.current = new Date();
 this.time = this.current - this.begin;
 this.end = this.current;
}
Timer.init = function(begin,current,time,end,stop){
this._begin=begin;
this._current=current;
this._time=time;
this._end=end;
this._stop=stop;
this._show=0;
}
Timer.show = function(){
 this._show = 1;
 document.getElementById(this._begin).innerHTML = this.begin;
 document.getElementById(this._current).innerHTML = this.current;
 document.getElementById(this._time).innerHTML = this.time;
 document.getElementById(this._end).innerHTML = this.end;
}
Timer.refresh = function(){
 if(this._show == 0) this.hide();
 else if(this._show == 1){
  setTimeout("Timer.refresh();", 100)
  this.show();
 }
}
Timer.show_stop = function(){
 document.getElementById(this._stop).innerHTML = "Stop";
}
Timer.hide = function(begin,current,time,end){
 this._show = 0;
 document.getElementById(this._begin).innerHTML = "";
 document.getElementById(this._current).innerHTML = "";
 document.getElementById(this._time).innerHTML = "";
 document.getElementById(this._end).innerHTML = "";
 document.getElementById(this._stop).innerHTML = "";
}
Timer.start_and_show = function(){
 Timer.start();
 Timer.run();
 Timer.show();
 Timer.refresh();
}
Timer.init("begin","current","time","end","stop");
setTimeout("Timer.show_stop();", 100);