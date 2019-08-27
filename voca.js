Vocabulary = {words: []};
Vocabulary.add = function(w){
 var l = this.words.length;
 this.words[l] = new Object();
 this.words[l].string = w;
 this.words[l].level = 0;
}
Vocabulary.check_and_add = function(w){
 if(this.search(w) != -1) return -1;
 this.add(w);
 return 0;
}
Vocabulary.search = function(w){
 var ind = -1;
 for(var i = 0 ; i < this.words.length; i++){
  if(this.words[i].string == w){
   ind = i;
   break;
  }
 }
 return ind;
}
Vocabulary.level = function(w, mod){
 this.words[this.search(w)].level += mod;
}
Vocabulary.merge_word = function(w, text){
 con = [];
 var c = text.indexOf(w);
 if(c == -1) return -1;
 var l = 0;
 while(c != -1){
  con[l] = c; l++;
  c = text.indexOf(w, c + 1);
 }
 var ind;
 var tright = 0;
 var tleft = 0;
 for(var i = 0; i < con.length; i++){
  v = text.substring(con[i] - 1, con[i]);
  ind = this.search(v);
  if(ind != -1){
   if(this.words[ind].level >= 0){
    if(this.check_and_add(v + w) == 0) tright++;
   }
  }
  v = text.substring(con[i] + w.length, con[i] + 1 + w.length);
  ind =  this.search(v);
  if(ind != -1){
   if(this.words[ind].level >= 0){
    if(this.check_and_add(w + v) == 0) tleft++;
   }
  }
 }
 return tright + tleft;
}