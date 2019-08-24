Text = "";
Alphabet = {count: 0, chars: [], sort: []};
Alphabet.new_e = function (e){
 len = this.count++;
 ar = this.chars;
 ar[len] = new Object();
 ar[len].l = e;
 ar[len].c = 1;
 this.sort[len] = len;
}
Alphabet.add_e = function (e, ind){
 v = this.chars[ind];
 if(v.l != e) return -1;
 v.c++;
 return 0; 
}
Alphabet.search_e = function (e){
 m = -1;
 for(var i = 0; i < this.count; i++){
  if(this.chars[this.sort[i]].l == e){
   m = i; break;
  }
 }
 return m;
}
Alphabet.sorting = function (m){
 if(m >= this.count) return;
 if(m <= 0) return
 ind = this.sort[m];
 ar = this.chars;
 n = ar[ind].c;
 var tmp = -1;
 for(var i = m; i >= 1; i--){
  if( ar[this.sort[i-1]].c < n){
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
  this.sorting(this.count-1);
 }else{
  this.add_e(e, this.sort[m]);
  this.sorting(m);
 }
}
Alphabet.show_sorted = function(){
var sar = [];
 for(i = 0 ; i < this.count; i++){
 sar[i] = this.chars[this.sort[i]].l;
}
 return sar;
}
function gather(id){
Text = document.getElementById(id).value;
for (var i = 0; i < Text.length; i++){
 Alphabet.add(Text.charAt(i));
}

}
