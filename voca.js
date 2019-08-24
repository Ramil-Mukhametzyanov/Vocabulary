Vocabulary = {words: []};
Vocabulary.add = function(w){
 var l = this.words.length;
 this.words[l] = new Object();
 this.words[l].string = w;
 this.words[l].level = 0;
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