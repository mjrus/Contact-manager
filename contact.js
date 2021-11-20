var noGroups = 0;
var load = function(){
    var i = 1;
    while(true){
        
        if(localStorage.getItem(i) === null) break;
        
        var item = localStorage.getItem(i);
     
        var contact = JSON.parse(item);

        var newContact = new Contact(contact.name, contact.firstName, contact.lastName, contact.gender, contact.dob, contact.note);
        
        for(var j = 0; j < contact.address.length; j++){
            newContact.postcode.push(contact.postcode[j]);
            newContact.address.push(contact.address[j]);
        }
        for(var j = 0; j < contact.emailAddress.length; j++)    newContact.emailAddress.push(contact.emailAddress[j]); 
        for(var j = 0; j < contact.phoneNo.length; j++)    newContact.phoneNo.push(contact.phoneNo[j]);
        
        newContact.addContact();
        i++
    }
    var i = 1
    while(true){
       
        if(localStorage.getItem("group"+i) === null) break;
        
        var group = JSON.parse(localStorage.getItem("group"+i));
        
        var newGroup = new Group(group.name);
        
        for(var j = 0; j< group.inGroup.length; j++){    newGroup.inGroup.push(group.inGroup[j])};

    
        newGroup.addGroup();
        i++;
    }
    
     var i = 1;
    while(true){
       var messageStorage = "message" + i;
       var reviewIndex = "starRating" + i;
       if(localStorage.getItem(messageStorage) == null||localStorage.getItem(reviewIndex) == null)break;
       var mesg = localStorage.getItem(messageStorage);
       var star = localStorage.getItem(reviewIndex);
       makeReview(star, mesg);
       i++;
        
    }
    
}


var noContacts = 0;
var Contact = function(name,firstname, lastname, gender, dob, note){
    this.contactNo;
    this.name = name; 
    this.image = 'userPlaceholder.png';
    this.firstName = firstname;
    this.lastName = lastname;
    this.gender = gender;
    this.dob = new Date(dob);
    this.note = note;
    this.address = [];
    this.postcode = [];
    this.emailAddress = [];
    this.phoneNo = [];
}
Contact.prototype.addContact = function(){
    noContacts++
    contacts.push(this);

    this.contactNo = noContacts;
    
    var contact = contacts[contacts.length - 1];
   // alert(contact.getName() + ", " + contacts.length + ", " + contact.contactNo);
    contact.makeContact('#contactList');
    
    contact.addInfoPage();

    localStorage.setItem(this.contactNo, JSON.stringify(contact));
}
Contact.prototype.makeContact = function(list){
    $(list).append(
        $('<div></div>',{"class":'contactContainer'})
        .append($('<img>',{"class":'contactImage'}).attr('src',this.image))
        .append($('<div></div>',{"class":'contactName'}).append($('<span></span>',{"class":'contactName2'}).append(this.getName())))
        .append($('<input>',{type: "button","class":'showContactInfo', onclick:'showContactPage(this.name)'}).attr("name",this.getName()))
    );
}
Contact.prototype.addInfoPage = function(){
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    $('#centerContainer').append(
        $('<div></div>',{"class":'contactInfoContainer'}).attr("id", this.getName())
        .append($('<div></div>',{"class":'contactInfoHeader'})
                .append($('<div></div>',{"class":'contactImagesContainer'})
                    .append($('<img>',{"class":'contactInfoHeaderImage'}).attr("src", this.image))
                    .append($('<div>',{"class":'birthdayContainer'}).append($('<img>',{"class": "isBirthDay"}).attr("src",this.isBirthDay())))
                )
                .append($('<div></div>',{"class":'contactInfoHeaderText'})
                        .append($('<div></div>',{"class":'contactInfoHeaderTitle'})
                                .append($('<div></div>',{"class": 'contactInfoTitleUsername'}).append(this.getName()))
                                .append($('<div></div>', {"class": 'contactEditAndCloseContainer'})
                                        .append($('<input>',{"class":'contactInfoPageEdit', "type":'button', "value":'Edit', "onclick": 'editInfoPage(this.name)'}).attr("name", this.getName()))
                                        .append($('<input>',{"class":'contactInfoPageClose', "type": 'button', "value":'Close', onclick:'centerCoHide()'}))
                                        .on('click', '.contactInfoPageClose', function(){$('.contactInfoContainer').hide();})
                     
                                       )
                                )
                        .append($('<div></div>',{"class":'contactBasicInfoSection'})
                                .append($('<div></div',{"class": 'basicInfoContainer'}).append($('<div></div>',{"class": 'basicInfoTitle'}).append('Name')).append($('<div></div>',{"class": 'basicInfo'}).append(this.getFullName())))
                                .append($('<div></div',{"class": 'basicInfoContainer'}).append($('<div></div>',{"class": 'basicInfoTitle'}).append('Age')).append($('<div></div>',{"class": 'basicInfo'}).append(this.getAge())))
                                .append($('<div></div',{"class": 'basicInfoContainer'}).append($('<div></div>',{"class": 'basicInfoTitle'}).append('Date of Birth')).append($('<div></div>',{"class": 'basicInfo'}).append(this.dob.getDate() + " " + month[this.dob.getMonth()] + " " + this.dob.getFullYear()))) 
                                .append($('<div></div',{"class": 'basicInfoContainer'}).append($('<div></div>',{"class": 'basicInfoTitle'}).append('Gender')).append($('<div></div>',{"class": 'basicInfo'}).append(this.gender)))
                                .append($('<div></div',{"class": 'basicNoteContainer'}).append($('<div></div>',{"class": 'basicNoteTitle'}).append('Note')).append($('<div></div>',{"class": 'basicNoteText'}).append(this.note)))
                               )
                       )
               )
                .append($('<div></div>',{"class": 'contactAddressTab'}))
        .append($('<div></div>',{"class": 'contactAddressContainer'}))
        .append($('<div></div>',{"class": 'contactEmailTab'}))
        .append($('<div></div>',{"class": 'contactEmailContainer'}))
        .append($('<div></div>',{"class": 'contactPhoneNoTab'}))
        .append($('<div></div>',{"class": 'contactPhoneNoContainer'}))
    );
    var address;
    for(var i = 0; i < this.address.length;i++){
        var addressCount = i + 1;
        address = this.address[i];
        $('.contactAddressTab').append($('<input>',{"class": 'showAddressButton', "type": "button", "onclick": 'showAddress(this.name)'}).attr("name",i).attr("value","Address " + addressCount));
        $('.contactAddressContainer').append($('<div></div>',{"class":'addressContainer'})
                                             .append($('<div></div>',{"class":'addressTitle'}).append("Address"))
                                             .append($('<div></div>',{"class":'addressText'}).append(address))
                                             .append($('<div></div',{"class":'postcodeTitle'}).append("Postcode"))
                                             .append($('<div></div>',{"class":'postcodeText'}).append(this.postcode[i]))
                                             .addClass("address"+i)
                                            ); 
    }
    var email;
    for(var i = 0; i < this.emailAddress.length;i++){
        var emailCount = i + 1;
        email = this.emailAddress[i];
      
        $('.contactEmailTab').append($('<input>',{"class": 'showEmailButton', "type": "button", "onclick": 'showEmail(this.name)'}).attr("name",i).attr("value","Email " + emailCount));
        $('.contactEmailContainer').append($('<div></div>',{"class":'emailContainer'})
                                            .append($('<div></div>',{"class":'emailTitle'}).append("Email"))
                                            .append($('<div></div>',{"class":'emailText'}).append(email))
                                            .addClass("email"+i)
                                            );    
    }
    var phoneNo;
    for(var i = 0; i < this.phoneNo.length;i++){
        var phoneNoCount = i + 1;
        phoneNo = this.phoneNo[i];
      
        $('.contactPhoneNoTab').append($('<input>',{"class": 'showPhoneNoButton', "type": "button", "onclick": 'showPhoneNo(this.name)'}).attr("name",i).attr("value","Phone No. " + phoneNoCount));
        $('.contactPhoneNoContainer').append($('<div></div>',{"class":'phoneNoContainer'})
                                            .append($('<div></div>',{"class":'phoneNoTitle'}).append("Phone Number"))
                                            .append($('<div></div>',{"class":'phoneNoText'}).append(phoneNo))
                                            .addClass("phoneNo"+i)
                                            );    
        
    }
}
var showAddress = function(name){
    $('.addressContainer').hide();
    $('.address'+name).show();
}
var showEmail = function(name){
    $('.emailContainer').hide();
    $('.email' + name).show();
}
var showPhoneNo = function(name){
    $('.phoneNoContainer').hide();
    $('.phoneNo' + name).show();
}
Contact.prototype.showInfoPage = function(){
    $('#' + this.getName()).show();
}
var showContactList = function(){
    $('#contactList').show();
    $('#contactListHeader').on("click", hideContactList);
}
var hideContactList = function(){
    $('#contactList').hide();
    $('#contactListHeader').off("click", hideContactList);
}
var savedChanges = false;
var editInfoPage = function(name){
    var contact;    
    for(i = 0; contacts.length; i++){if(name === contacts[i].getName()){ contact = contacts[i]; break;}}
    
    $('#' + contact.getName()).hide();
    $('#basicInfoTitleName').append(contact.getName());
    
    $('#submitInfo').attr("name", contact.getName());
    
    $('#fullnameButton').attr("name", contact.getName());
    $('#genderButton').attr("name", contact.getName());
    $('#dobButton').attr("name", contact.getName());
    $('#noteButton').attr("name", contact.getName());
    $('#addressButton').attr("name", contact.getName());
    $('#emailButton').attr("name", contact.getName());
    $('#phoneNoButton').attr("name", contact.getName());
    
    $('#editInfoPageContainer').show();
}

var sumbitInfo = function(name){
    savedChanges = true;
    var contact;
     for(var i = 0; contacts.length; i++){if(name === contacts[i].getName()){ contact = contacts[i]; break;}}

    localStorage.setItem(contact.contactNo, JSON.stringify(contact));
    location.reload();
}
var cancelEdit = function(){
    if(window.confirm("You're about to cancel without saving.")) location.reload();
}
var checkName = function(name){
    var index;    
    for(var i = 0; contacts.length; i++){if(name == contacts[i].getName()){ index = i; break;}}
   
    var firstName = $('#contactFirstName').val();
    var lastName = $('#contactLastName').val();

    if(!(/^[a-zA-Z\s]*$/.test(firstName))){
       alert("this is not a valid first name");
       return;
    }
    if(!(/^[a-zA-Z\s]*$/.test(lastName))){
       alert("this is not a valid last name");
       return;
    }
    contacts[index].firstName = firstName;
    contacts[index].lastName = lastName;
}

var checkGender = function(name){
    var contact; 
    for(var i = 0; contacts.length; i++){if(name === contacts[i].getName()){ contact = contacts[i]; break;}}
    
    contact.gender = $('#genderSelector').find(":selected").text();
}

var checkDate = function(name){
   
    var year = $('#yearInput').val();
    var month = $('#MonthSelector').find(":selected").text();
    var day = $('#dayInput').val();
    var min = 1;
    var max;
    switch(month){
        case "January"  : month = 0 ; max = 31; break;
        case "February" : month = 1 ; if(year % 4 == 0)   max = 29;   else   max = 28;    break;
        case "March"    : month = 2 ; max = 31; break;
        case "April"    : month = 3 ; max = 30; break;
        case "May"      : month = 4 ; max = 31; break;
        case "June"     : month = 5 ; max = 31; break;
        case "July"     : month = 6 ; max = 31; break;
        case "August"   : month = 7 ; max = 31; break;
        case "September": month = 8 ; max = 30; break;
        case "october"  : month = 9 ; max = 31; break;
        case "November" : month = 10; max = 30; break;
        case "December" : month = 11; max = 31; break;
        default: alert("No month selected");return; 
    }
    if(day > max || day < min){
        alert("This is not a valid day");
        return;
    }
    var contact;    
    for(i = 0; contacts.length; i++){if(name === contacts[i].getName()){ contact = contacts[i]; break;}}
    contact.dob.setMonth(month);
    contact.dob.setDate(day);
    contact.dob.setFullYear(year);
}

$('#contactNote').on('change',function(){$('#noteButton').show();});
    


var checkNote = function(name){
     var contact; 
    for(i = 0; contacts.length; i++){if(name === contacts[i].getName()){ contact = contacts[i]; break;}}
    
    var note = $('#contactNote').val();
    if(typeof(note) == 'undefined' || note == null || note == ''){
        alert("You must write something to submit the note");
        $('#contactNote').val('');
        return;
    }
    contact.note = note;
}
       
var checkAddress = function(name){
    var contact; 
    for(i = 0; contacts.length; i++){if(name === contacts[i].getName()){ contact = contacts[i]; break;}}
    
    var addressSelected;
    switch($('#addressSelector').find(":selected").text()){
        case "Address 1": addressSelected = 0;break;
        case "Address 2": addressSelected = 1;break;
        case "Address 3": addressSelected = 2;break;
        case "Address 4": addressSelected = 3;break;
        case "Address 5": addressSelected = 4;break;
        case "Address 6": addressSelected = 5;break;
        case "Address 7": addressSelected = 6;break;
        case "Address 8": addressSelected = 7;break;
        case "Address 9": addressSelected = 8;break;
        case "Address 10":addressSelected = 9;break;
    }
    
    var houseNo = $('#houseNumberInput').val(); 
    var streetName = $('#streetNameInput').val();
    var townName  = $('#townNameInput').val();
    var countryName = $('#countryNameInput').val();
    var postcode = $('#postcode').val();
    if(!($.isNumeric(houseNo)) || houseNo < 0){
        $('#houseNumberInput').val(''); 
        alert("this is a invalid house number");
        return;
    };
    if(!(/^[a-zA-Z\s]*$/.test(streetName))){
        $('#streetNameInput').val('');
        alert("this is a invalid street name");
        return;
    }
    if(!(/^[a-zA-Z\s]*$/.test(townName))){
        $('#townNameInput').val('');
        alert("this is a invalid town name");
        return;
    }
    if(!(/^[a-zA-Z\s]*$/.test(countryName))){
        $('#townNameInput').val('');
        alert("this is a invalid town name");
        return;
    }
    if(!(/^[a-zA-Z0-9]*$/.test(postcode)) || !(postcode.length == 6) ){
        $('#postcode').val('');
        alert("this is a invalid town name");
        return;
    }
    var address = houseNo + ", " + streetName + "\n" +townName + "\n" + countryName;
    if(addressSelected == contact.address.length){
    contact.address.push(address);
    contact.postcode.push(postcode);
    }else{
        contact.address[addressSelected] = address;
        contact.postcode[addressSelected] = postcode;
    }
}

var checkEmail = function(name){
    var contact; 
    for(i = 0; contacts.length; i++){if(name === contacts[i].getName()){ contact = contacts[i]; break;}}
    
    var emailSelected;
    switch($('#emailSelector').find(":selected").text()){
        case "email 1": emailSelected = 0;break;
        case "email 2": emailSelected = 1;break;
        case "email 3": emailSelected = 2;break;
        case "email 4": emailSelected = 3;break;
        case "email 5": emailSelected = 4;break;
        case "email 6": emailSelected = 5;break;
        case "email 7": emailSelected = 6;break;
        case "email 8": emailSelected = 7;break;
        case "email 9": emailSelected = 8;break;
        case "email 10":emailSelected = 9;break;
    }
    
    var email = $('#emailInput').val();
    if(!(/^[a-zA-Z0-9\s@.]*$/.test(email))||email == null){
        alert("This is not a valid email address");
        return;
    }
    if(emailSelected == contact.emailAddress.length){
        contact.emailAddress.push(email);

    }else{
        contact.emailAddress[emailSelected] = email;

    }
}

var checkPhoneNo = function(name){
    var contact; 
    for(i = 0; contacts.length; i++){if(name === contacts[i].getName()){ contact = contacts[i]; break;}}
    
    var numberSelected;
    switch($('#phoneNoSelector').find(":selected").text()){
        case "PhoneNo 1": numberSelected = 0;break;
        case "PhoneNo 2": numberSelected = 1;break;
        case "PhoneNo 3": numberSelected = 2;break;
        case "PhoneNo 4": numberSelected = 3;break;
        case "PhoneNo 5": numberSelected = 4;break;
        case "PhoneNo 6": numberSelected = 5;break;
        case "PhoneNo 7": numberSelected = 6;break;
        case "PhoneNo 8": numberSelected = 7;break;
        case "PhoneNo 9": numberSelected = 8;break;
        case "PhoneNo 10":numberSelected = 9;break;
    }
    
    var phoneNo = $('#phoneNoInput').val();
   
    if(!($.isNumeric(phoneNo))||!(phoneNo.length == 11)){
        
        alert("This is not a valid phone number");
        return;
    }
    if(numberSelected == contact.phoneNo.length){
        contact.phoneNo.push(phoneNo);

    }else{
        contact.phoneNo[numberSelected] = phoneNo;

    }
}
Contact.prototype.showInfoPage = function(){
    $('#' + this.getName()).show();
}
Contact.prototype.getName = function(){
    return this.name;
}
Contact.prototype.getFullName = function(){
    
    if(this.firstName === '')
        return '';
    else{
      
        return this.firstName + ' ' + this.lastName;
    }
    
}
Contact.prototype.getAge = function(){
    var today = new Date(Date.now());
    if(today.getMonth() < this.dob.getMonth()){
        return today.getYear() - this.dob.getYear();
    }
    else if(today.getDate() === this.dob.getDate()){
        return today.getYear() - this.dob.getYear();
    }
    return today.getYear() - this.dob.getYear() - 1;
}
Contact.prototype.isBirthDay = function(){
    
    var dob = this.dob;
    var today = new Date(Date.now());
    if(today.getDate() === dob.getDate() && today.getMonth() === dob.getMonth()){
        return 'birthday.png';
    }else{
        return '';
    }
}
var contacts = [];

var showContactForm = function(){
    $('#contactForm').show();
}

var sumbitContactInfo = function(){
    var contactUsername = $('#contactUsername').val();
    if(!(/^[a-zA-Z0-9]*$/.test(contactUsername) || contactUsername.length < 6  || contactUsername.length > 24)){
        alert("This is not a valid username");
        $('#contactUsername').val('');
        return;
    }
    for(var i = 0; i < contacts.length;i++){
        
        if(contactUsername.toUpperCase() == contacts[i].getName().toUpperCase()){
            alert("There is already a contact with this username");
            $('#contactUsername').val('');
            return;
        }
    }
    
    $('#contactUsername').val('');
    
    $('#contactForm').hide();
    var timeMs = Date.now();
    new Contact(contactUsername, '', '', '', timeMs, '').addContact();
   
}
var cancelContactForm = function(){
    $('#contactUsername').val('');
    $('#contactForm').hide();
}

var showContactPage = function(name){
    var index;
    $('#centerContainer').show();
    for(var i = 0; contacts.length; i++){
        if(name == contacts[i].getName()){
            
            index = i; 
            break;  
        }   
        
    }
    contacts[index].showInfoPage();
}

var showGroupFrom = function(){
    $('#groupForm').show();
}

var cancelGroupFrom = function(){
    $('#groupForm').hide();
}

var Group = function (name) {
    this.groupNo;
    this.name = name;
    this.image = 'groupIMG.png';
    this.inGroup = [];
};

Group.prototype.addGroup = function(){
    noGroups++;
    groups.push(this);
    
    this.groupNo = noGroups;
    
    var group = groups[groups.length - 1];
    
    group.makeGroup("#groupList");
    var groupContact;
    for(var i = 0; i < group.inGroup.length; i++){
        groupContact = group.inGroup[i];
        for(var j = 0; j < contacts.length;j++){
            if(groupContact == contacts[j].name){
                contacts[j].makeContact('#group'+group.name);
            }
        }
    }
    localStorage.setItem("group" + this.groupNo, JSON.stringify(group));
}
Group.prototype.getName = function(){ 
     return this.name;
};

Group.prototype.makeGroup = function(list){
    $(list).append(
        $('<div></div>', {"class":'groupContainer'})
        .append($('<img>', {"class":'groupImage'}).attr('src', this.image))
        .append($('<div></div>',{"class": 'groupName'}).append($('<span></span>',{"class":'groupName2'}).append(this.getName())))
        .append($('<div></div>',{"class": 'groupButtonContainer'})
            .append($('<input>',{"class":'addGroupContact', "type": 'button', "onclick":'addGroupContactForm(this.name)', value: "Add"}).attr("name", this.getName()))
            .append($('<input>', {"class":'showGroupContacts', "type":'button', "onclick":'showGroupContacts(this.name)', value: "Show"}).attr("name", this.getName()))
        )
    )
    .append($('<div></div>', {"class": 'contactList'}).attr("id","group" + this.getName()));
}
var groups = [];
var groupContacts = [];

var showGroupList = function(){
    $('#groupList').show();
    $('#showGroupList').on("click",hideGroupList);
}
var hideGroupList = function(){
    $('#groupList').hide();
    $('#showGroupList').off("click",hideGroupList);
}
var addGroupContactForm = function(name){
    $('#groupContactSumbit').attr("name",name);
    $('#addGroupContactForm').show();

}
var sumbitGroupContact = function(name){
    var contact;
    var group;
    for(var i = 0; i < groups.length; i++){
        if(name == groups[i].name){
            group = groups[i];
        }
    }
    for(var i = 0; i < contacts.length; i++){
        if($('#submitGroupContact').val().toUpperCase() == contacts[i].getName().toUpperCase()){
            contact = contacts[i];
        }
        else{
            alert("Contact does not exist");
            $('#submitGroupContact').val('')
            return;
        }
    }
    
    for(var i = 0; i < group.inGroup.length; i++){
        if(contact.getName() == group.inGroup[i]){
            alert("This contact is already in this group.");
            $('#submitGroupContact').val('');
            return;
        }
    }
    group.inGroup.push(contact.name);
    contact.makeContact('#group'+group.name);
    localStorage.setItem("group"+group.groupNo, JSON.stringify(group));
    $('#submitGroupContact').val('');
    $('#addGroupContactForm').hide();
}  
var showGroupContacts = function(name){
    
    $('#group'+name).show();
    $('.showGroupContacts').attr("value", "hide");
    $('.showGroupContacts').on("click",hideGroupContact);
}
var cancelGroupContactForm = function(){
    $('#submitGroupContact').val('');
    $('#addGroupContactForm').hide();
}
var hideGroupContact = function(){
    $('.contactList').hide();
    $('.showGroupContacts').attr("value", "show");
    $('.showGroupContacts').off("click",hideGroupContact);
 
}

var submitGroupForm = function(){
    var groupName = $('#groupNameInput').val();
    if(!(/^[a-zA-Z0-9]*$/.test(groupName) || groupName.length < 6  || groupName.length > 24)){
        alert("This is not a valid group name");
        $('#groupNameInput').val('');
        return;
    }
    for(var i = 0; i < groups.length;i++){
        if(groupName.toUpperCase() == groups[i].name.toUpperCase()){
            alert("There is already a group with this name");
            $('#contactUsername').val('');
            return;
        }
    }
    $('#groupNameInput').val('');

    $('#groupForm').hide();
    new Group(groupName).addGroup();
    
}

var centerCoHide = function(){
       $('#centerContainer').hide();
}

























