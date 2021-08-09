function timeConvert(n) {
  var num = n;
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);

  if( n < 60 ){
    return rminutes + "m";
  } else {
    return rhours + "h " + rminutes + "m";
  }
}

export default timeConvert;