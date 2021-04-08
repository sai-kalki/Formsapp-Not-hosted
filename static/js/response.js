$(document).on('visibilitychange', function() {
   document.myform.onsubmit = true
   document.myform.submit()
});
function timer(minutes){
   var secs = 59
   var min = minutes - 1
   setInterval(function(minutes){
   if(secs<9){
      document.getElementById("sec").innerHTML = "0"+secs
   }
   else{
      document.getElementById("sec").innerHTML = secs
   }
   
   secs--
   if(min==0&&secs==0){
      console.log("check")
      document.myform.onsubmit = true
      document.myform.submit()
      // clearInterval()
   }
   if(secs==0){
      min--
      secs = 59
   }
   if(min<9){
      document.getElementById("min").innerHTML = "0"+min
   }
   else{
      document.getElementById("min").innerHTML = min
   }
   
   
   
},1000)
}




function choice(num){
   document.getElementById("clear-"+num).classList.remove("disabled")
}



function check(num){

   console.log(num)
   options = document.getElementsByClassName("option-"+num)
   for(var i=0;i<options.length;i++){
      console.log(i)
      options[i].checked = false
   }
   document.getElementById("clear-"+num).classList.add("disabled")
}


function validate(){
   var req = document.getElementsByClassName("options required")
   // console.log(req)
   if (req==NaN) {
      return true
   }
   var bool = true
   for(i=0;i<req.length;i++){
      var options = req[i].getElementsByClassName("option")
      // console.log("options")
      // console.log(options)
      var bool1 = false
      for(j=0;j<options.length;j++){
         if (options[j].checked){
            bool1 = bool1 || true
            // console.log("checked")
         }
         else{
            bool1 = bool1 || false
            // console.log("unchecked")
         }
      }
      bool = bool && bool1
      if (bool1==false){
         req[i].classList.add("fail")
         req[i].querySelector("#mention").style.display = "block"
      }
      if (bool1==true){
      if (req[i].classList.contains("fail")){
         req[i].classList.remove("fail")
         req[i].querySelector("#mention").style.display = "none"
      }
      }
      bool1 = false
   }
   if (bool==false){
      alert("Pick any answer for required questions")
      
   }
   // console.log(1)
   // console.log(bool)
   return bool
}