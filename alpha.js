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
Alphabet.gather = function(Text){
 for (var i = 0; i < Text.length; i++){
  this.add(Text.charAt(i));
 }
}
Alphabet.get_freq = function(sym){
 for(var i = 0; i < this.chars.length; i++){
  if(this.chars[this.sort[i]].symbol == sym) return this.chars[this.sort[i]].counter/this.count;
 }
 return 0;
}