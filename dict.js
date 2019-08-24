Text = "";
Alphabet = {count: 0, chars: [], sort: []};
Alphabet.new_e = function (e){
 this.count++;
 len = this.chars.length;
 ar = this.chars;
 ar[len] = new Object();
 ar[len].symbol = e; //symbol
 ar[len].counter = 1; //counter
 this.sort[len] = len;
}
Alphabet.add_e = function (e, ind){
 this.count++;
 v = this.chars[ind];
 if(v.symbol != e) return -1;
 v.counter++;
 return 0; 
}
Alphabet.search_e = function (e){
 m = -1;
 for(var i = 0; i < this.chars.length; i++){
  if(this.chars[this.sort[i]].symbol == e){
   m = i; break;
  }
 }
 return m;
}
Alphabet.sorting = function (m){
 if(m >= this.chars.length) return;
 if(m <= 0) return
 ind = this.sort[m];
 ar = this.chars;
 n = ar[ind].counter;
 var tmp = -1;
 for(var i = m; i >= 1; i--){
  if( ar[this.sort[i-1]].counter < n){
   this.sort[i] = this.sort[i-1];
   this.sort[i-1] = ind;
  }
  else break;
 }
}
Alphabet.add = function (e){
 m = this.search_e(e);
 if(m == -1){
  this.new_e(e);
  this.sorting(this.chars.length-1);
 }else{
  this.add_e(e, this.sort[m]);
  this.sorting(m);
 }
}
Alphabet.show_sorted = function(){
var sar = [];
 for(i = 0 ; i < this.chars.length; i++){
 sar[i] = this.chars[this.sort[i]].symbol;
}
 return sar;
}
Alphabet.gather = function(id){
 Text = document.getElementById(id).value;
 for (var i = 0; i < Text.length; i++){
  this.add(Text.charAt(i));
 }
}

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
Study = {sym: 0, index: 0, total_time: 0, learning: 0};
Study.init = function(switcher, object, alphabet, timer){
this._goal=object;
this._switch = switcher;
this._alpha = alphabet;
this._timer = timer;
this.time = [];
this.prior = [];
 for(var i = 0; i < alphabet.chars.length; i++){
  this.time[i] = 0;
  this.prior[i] = 0;
 }
}
Study.gather = function(id){
 this._alpha.gather(id);
 for(var i = 0; i < this._alpha.chars.length; i++){
  this.time[i] = 0;
  this.prior[i] = 0;
 }
}
Study.define = function(){
 if(this.total_time == 0){
  this.index = this._alpha.sort[0];
  this.sym = this._alpha.chars[this.index].symbol;
  return; 
 }
 var goal;
 var cur;
 for(var i = 0; i < this.time.length; i++){
  goal = this._alpha.chars[i].counter/this._alpha.count;
  cur = this.time[i]/this.total_time;
  this.prior[i] = goal - cur;
 }
 var max = 0;
 for(var i = 0; i < this.time.length; i++){
  if(this.prior[i] > max){
   this.index = i;
   max = this.prior[i];
  }
 }
 this.sym = this._alpha.chars[this.index].symbol;
}
Study.begin = function(){
 document.getElementById(this._goal).innerHTML = this.sym;
 Timer.start_and_show();
 this.learning = 1;
}
Study.refresh = function(){
 if(this.learning == 1){
  document.getElementById(this._switch).innerHTML = "<div onclick=\"Study.stop(); Study.refresh();\">Stop</div>";
 }else if(this.learning == 0){
  document.getElementById(this._switch).innerHTML = "<div onclick=\"Study.begin(); Study.refresh();\">Study</div>";
 }
}
Study.stop = function(){
 this._timer.stop();
 var t = this._timer.time;
 this.time[this.index] += t;
 this.total_time += t;
 this.define();
 this.learning = 0;
}

Timer.init("begin","current","time","end","stop");
Study.init("switch", "object", Alphabet, Timer);
setTimeout("Timer.show_stop();", 100);