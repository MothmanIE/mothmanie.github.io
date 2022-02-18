function mouseOver() {
 document.getElementById("textcolour").style.color = "#8fcb9b";
}
function mouseOut() {
 document.getElementById("textcolour").style.color = "white";
}

document.getElementById("textcolour").onmouseover = function() {mouseOver()};
document.getElementById("textcolour").onmouseout = function() {mouseOut()};