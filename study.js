Study = {sym: 0, index: 0, total_time: 0, learning: 0, level: 0};
Study.init = function(switcher, object, alphabet, timer, voca){
this._goal=object;
this._switch = switcher;
this._alpha = alphabet;
this._vocabulary = voca;
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
 var sym; var invo;
 for(var i = 0; i < this._alpha.chars.length; i++){
  this.time[i] = 0;
  this.prior[i] = 0;
  sym = this._alpha.chars[i].symbol;
  invo = this._vocabulary.search(sym);
  if(invo == -1) this._vocabulary.add(sym);
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
 var max = 0; var in_voca = -1; var sym = "";
 for(var i = 0; i < this.time.length; i++){
  var sym = this._alpha.chars[i].symbol
  in_voca = this._vocabulary.search(sym);
  if(in_voca != -1 && this._vocabulary.words[in_voca].level == this.level){
   if(this.prior[i] > max){
    this.index = i;
    max = this.prior[i];
   }
  }
 }
 this.sym = this._alpha.chars[this.index].symbol;
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
 this.define();
 this.learning = 0;
}
Study.up = function(){
 this._vocabulary.level(this.sym, 1)
}
Study.down = function(){
 this._vocabulary.level(this.sym, -1)
}
Study.init("switch", "object", Alphabet, Timer, Vocabulary);
