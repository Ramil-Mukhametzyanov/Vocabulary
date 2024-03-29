Study = {sym: 0, index: 0, total_time: 0, learning: 0, level: 0, type:'mastering', mtime: 0, text: ""};
Study.init = function(switcher, object, alphabet, timer, voca){
this._goal=object;
this._switch = switcher;
this._alpha = alphabet;
this._vocabulary = voca;
this._timer = timer;
this.time = [];
this.freq = [];
this.prior = [];
this.symbols = [];
 for(var i = 0; i < alphabet.chars.length; i++){
  this.time[i] = 0;
  this.prior[i] = 0;
 }
}
Study.gather = function(id){
 this.text = document.getElementById(id).value;
 this._alpha.gather(this.text);
 var sym; var invo;
 for(var i = 0; i < this._alpha.chars.length; i++){
  this.time[i] = 0;
  this.prior[i] = 0;
  this.freq[i] = this._alpha.chars[i].counter/this._alpha.count;
  this.symbols[i] = this._alpha.chars[i].symbol;
  sym = this.symbols[i];
  invo = this._vocabulary.search(sym);
  if(invo == -1) this._vocabulary.add(sym);
 }
// setTimeout("Study.update_prior();", 1000);
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
//  goal = this._alpha.chars[i].counter/this._alpha.count;
  goal = this.freq[i];
  cur = this.time[i]/this.total_time;
  this.prior[i] = goal - cur;
 }
 if(this.type == 'mastering'){
  var max = 0; var in_voca = -1; var sym = "";
  for(var i = 0; i < this.time.length; i++){
//   var sym = this._alpha.chars[i].symbol
   var sym = this.symbols[i]
   in_voca = this._vocabulary.search(sym);
   if(in_voca != -1 && this._vocabulary.words[in_voca].level == this.level){
    if(this.prior[i] > max){
     this.index = i;
     max = this.prior[i];
    }
   }
  }
 }else if(this.type == 'information'){
  var min = 1000000; var in_voca = -1; var sym = "";
  for(var i = 0; i < this.time.length; i++){
//   var sym = this._alpha.chars[i].symbol
   var sym = this.symbols[i];
   in_voca = this._vocabulary.search(sym);
   if(in_voca != -1 && this._vocabulary.words[in_voca].level == this.level){
    if(this.prior[i] > 0 && this.prior[i] < min){
      this.index = i;
      min = this.prior[i];
    }
   }
  }
 }
 this.sym = this.symbols[this.index];
// this.sym = this._alpha.chars[this.index].symbol;
 if(this._vocabulary.search(this.sym) == -1) this._vocabulary.add(this.sym);
}
Study.begin = function(){
 document.getElementById(this._goal).innerHTML = this.sym;
 Timer.start_and_show();
// Timer.start();
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
 var s = this._vocabulary.search(this.sym);
 if(s != 0 && this._vocabulary.words[s].level >= 0){
  var arr = [];
  this._vocabulary.merge_max(this.sym, this.text, arr);
  num = arr.length;
  if(num > 0){
   var len = this.symbols.length;
   var word;
   for(var i = num; i >= 1; i--){
    word = arr[num - i];
    this.symbols[len - i] = word;
    this.time[len - i] = 0;
    this.prior[len -i] = 0;
    this.freq[len - i] = this.get_freq(word);
   }
  }
 }
 this.define();
 this.learning = 0;
}
Study.up = function(){
 this._vocabulary.level(this.sym, 1)
}
Study.down = function(){
 this._vocabulary.level(this.sym, -1)
}
 /*
Study.update_prior = function(){
  setTimeout("Study.update_prior()",1000);
  goal = this._alpha.chars[this.index].counter/this._alpha.count;
  var t = this._timer.time;
  cur = (this.time[this.index] + t)/(this.total_time + t);
  var pr = goal - cur;
  if(pr < 0 && t >= this.mtime){
   Study.stop();
   Study.begin();
  }
  var tg = (goal*this.total_time-this.time[this.index])/(1-goal)
  var ipr = this.prior[this.index];
  var twopi = 2*Math.PI;
  var f = twopi*t/((6/5)*tg);
  var r = Math.floor(255*Math.cos(f));
  var g = Math.floor(255*Math.cos(f + twopi/3));
  var b = Math.floor(255*Math.cos(f - twopi/3));
  var c = "rgb(" + r + "," + g + "," + b + ")";
  document.getElementById(this._goal).style="color:" + c + "; font-size: 200px; width: 200px; height: 250px; border: 3px solid " + c + "; align: center;";
  document.getElementById("prior").innerHTML = pr;
}
*/
Study.period = function(t){
 setTimeout("Study.period(" + t + ");", t);
 Study.stop();
 Study.begin();
}
Study.get_freq = function(word){
 var len = word.length;
 var sum = 0;
 for(var i = 0; i < len; i++){
  sum += this._alpha.get_freq(word.substring(i, i + 1));
 }
 return sum/len;
}
Study.init("switch", "object", Alphabet, Timer, Vocabulary);
//Study.type = "information";
