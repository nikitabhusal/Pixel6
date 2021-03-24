function lettersAndSpaceCheck(name)
{
var name = form["name"].value;

var regEx = /^[a-z][a-z\s]*$/;
if(name.value.match(regEx))
{
return true;
}
else
{
alert("Please enter letters and space only.");
return false;
}
}

var form = document.getElementById("form-validation");
form.onsubmit = validateForm;