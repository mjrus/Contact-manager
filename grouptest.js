var groupContacts = {};
var Group = function (name, image) 
{
    this.name = name;
    this.image = image;
    
    
};


Group.prototype.addContact = function (name, image) 
{
   Group[Group.length] =  new Group(name, image);
   
   for (var i = 0; i < Group.length; i++)
   {
    for(var j = 0; j < contacts.length; j++)
    {   
        if (contacts[j].name === document.getElementById("cName").value )
        {   
            contacts[j].makeContact('.group-content');
            groupContacts[groupContacts.length] = contacts[j];
            Group.showContacts();
        }
        else
        {
            alert("contact does not exist");
        }
    }
        
   }
};

Group.prototype.getName = function ()
{ 
     return this.name;
};

Group.prototype.displayGroups = function(list)
{
    $(list).append(
        $('<div></div>', {"class":'groupContainer'})
        .append($('<img>', {"class":'groupImage'}).attr('src', this.image))
        .append($('<input>', {"class":'showGroupMembers', "type":'button', onclick:'showGroupDiv(this.value)'}).attr("value":this.getName()))
        
    ) .append($('<div></div>', {"class": 'contactList'}).attr("id", this.getName()));
}


var showGroupDiv = function(name)
{
    $('#'+ name).show();
}
 /*$('#createGroupForm').submit(function(e)
{
    e.preventDefault();
    var $inputs = $('#createFormGroup :input');       
    var values = {};
     
    $inputs.each(function ()
    {
        values[$(this).attr("name")] = $(this).val();
    });
                
        localStorage.setItem('test',JSON.stringify(values));        
});
*/


