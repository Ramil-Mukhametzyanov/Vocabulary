Text = "";
Alphabet = {count: 0, time: 0, chars: [], sort: []};
Alphabet.new_e = function (e){
 this.count++;
 len = this.chars.length;
 ar = this.chars;
 ar[len] = new Object();
 ar[len].symbol = e; //symbol
 ar[len].counter = 1; //counter
 ar[len].time = 0; //time
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
function gather(id){
Text = document.getElementById(id).value;
for (var i = 0; i < Text.length; i++){
 Alphabet.add(Text.charAt(i));
}
}

Timer = {begin: 0, current: 0, time: 0, end: 0};
Timer.start = function (){
 this.begin = new Date();
}
Timer.init = function(begin,current,time,end,stop){
this._begin=begin;
this._current=current;
this._time=time;
this._end=end;
this._stop=stop;
}
Timer.show = function(){
 document.getElementById(this._begin).innerHTML = this.begin;
 this.current = new Date();
 document.getElementById(this._current).innerHTML = this.current;
 this.time = this.current - this.begin;
 document.getElementById(this._time).innerHTML = this.time;
 document.getElementById(this._end).innerHTML = this.end;
}
Timer.show_stop = function(){
 document.getElementById(_stop).innerHTML = "Stop";
}
Timer.hide = function(begin,current,time,end){
 document.getElementById(_begin).innerHTML = "";
 document.getElementById(_current).innerHTML = "";
 document.getElementById(_time).innerHTML = "";
 document.getElementById(_end).innerHTML = "";
 document.getElementById(_stop).innerHTML = "";
}
Timer.init("begin","current","time","end","stop");