//VARIABLES****************************************************************************************
var location;
var AccID;
var Password;
var userCount = 1;
//VARIABLES END************************************************************************************

var load = function()
{
    var i = 1;
    while (true)
        {
            var userIndex = "user"+i;
            if (localStorage.getItem(userIndex)==null)break;
            var item = localStorage.getItem(userIndex);
            var user1 = JSON.parse(item);
            new user(user1.name, user1.password).createUser();
            i++;
        }
}

   function previewFile()
{
       var preview = document.querySelector('img'); //selects the query named img
       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
       var reader  = new FileReader();

       reader.onloadend = function () 
       {
           preview.src = reader.result;
       }

       if (file) 
       {
           reader.readAsDataURL(file); //reads the data as a URL
       } else 
       {
           preview.src = "";
       }
  }

var search = function(userN)
{
    
    for (a=0; a<users.length; a++)
        {

            if (userN == users[a].name)
                {
                    //alert(users[a].name);
                    //login();

                }
        }
}





function showNames()
{
    alert("Account ID = " + AccID + "\n Name = " + Password);
}

var setNames = function()
{
    AccID = document.getElementById("setAccID").value;
    Password = document.getElementById("setPassword").value;
    loginCheck();
}

var createUserDetails = function()//sets values used to create user object
{
    AccID = document.getElementById("setAccID").value;
    Password = document.getElementById("setPassword").value;
}
var loginCheck = function()
    {
        if (AccID === "" || Password === "")
        {
            alert("\n You haven't entered anything, \n Please check your login and try again");
        }        
        else 
            {
               login();
            }
    }


function goToRegister()
{
    window.location.replace("register.html");
}


function login()
    {
        if (users.length==0)
            {
                alert("No users currently exist\nPlease create a user.");
            }
            else 
            {
            for (a=0; a<users.length; a++)
                {
                    
                    if (document.getElementById("setAccID").value == users[a].name && document.getElementById("setPassword").value == users[a].password)
                    {
                        console.log("login is valid")
                        window.location.replace("contactPage.html");

                    }
                    else
                    {
                        alert("You have entered incorrect login details.\nPlease try again.")

                    }
                }
            }
    }



/*function login()
    {
        if (Password==='abc123' && AccID ==='bob')
            {
                window.location.replace("index.html");
                //location = ("index.html")//change to contact manager page when done
            }
        else if (Password =='xyz456' && AccID == 'joe')
            {
                window.location.replace("index.html");
                //location = ("index.html")//change to contact manager page when done
            }
        else
        {
            alert("You have entered incorrect login details.\nPlease try again.")

        }
    }
*/
var users = [];


var changeName = function()
{

    for (a=0; a<users.length; a++)
        {
            if (document.getElementById("setAccID").value == users[a].name && document.getElementById("setPassword").value == users[a].password)
            {

                users[a].name = document.getElementById("newAccID").value;
                users[a].password = document.getElementById("newPass").value;
                localStorage.setItem("user"+users[a].userNo, JSON.stringify(users[a]));
                alert("You have successfully changed your account information.");
                window.location.replace("contactPage.html")
            }
            else
            {
                alert("You have entered incorrect details.\nPlease try again.");

            }
        }
}
var countdown = function()
    {
        window.location.replace("index.html");
    }

var user = function (name, passInput)
    {
        this.name = name;
        this.password = passInput;
        this.image;
        this.userNo;
    };
var submitUser = function()
{
    var userName = document.getElementById("setAccID").value;
    var password = document.getElementById("setPassword").value;
    new user(userName, password).createUser();
    alert("You can now login using the credentials you created.");
    window.location.replace("index.html");
}

user.prototype.createUser = function()
{
    var userIndex = "user"+userCount;
    users.push(this);
    //alert("You can now login using the credentials you chose.");
    localStorage.setItem(userIndex,JSON.stringify(users[users.length-1]));
    this.userNo = userCount;
    userIndex++;
    //window.location.replace("loginPage.html");
};
//show password
(document).ready(function(){
    $("#pw").focus(function(){
        this.type = "text";
    }).blur(function(){
        this.type = "password";
    })   
});

//Placeholder fixed for Internet Explorer
$(function() {
	var input = document.createElement("input");
	if(('placeholder' in input)==false) { 
		$('[placeholder]').focus(function() {
			var i = $(this);
			if(i.val() == i.attr('placeholder')) {
				i.val('').removeClass('placeholder');
				if(i.hasClass('password')) {
					i.removeClass('password');
					this.type='password';
				}			
			}
		}).blur(function() {
			var i = $(this);	
			if(i.val() == '' || i.val() == i.attr('placeholder')) {
				if(this.type=='password') {
					i.addClass('password');
					this.type='text';
				}
				i.addClass('placeholder').val(i.attr('placeholder'));
			}
		}).blur().parents('form').submit(function() {
			$(this).find('[placeholder]').each(function() {
				var i = $(this);
				if(i.val() == i.attr('placeholder'))
					i.val('');
			})
		});
	}
	});
