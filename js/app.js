window.onload = function () {
  
    //PRELOAD THE LOCALSTORAGE VALUES
   var arrayLabels = document.querySelectorAll('label');
    
   if (localStorage.length!=0){
       for (const property in localStorage){
           arrayLabels.forEach(label => {
               var labelLower = label.innerText.toLocaleLowerCase();
               if (labelLower == property){
                   label.nextElementSibling.value = localStorage[property];
               }
           });
       }
   }

    // CATCH ELEMENTS FROM THE DOM
    var names = document.getElementById('name');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var password2 = document.getElementById('password2');
    var age = document.getElementById('age');
    var tel = document.getElementById('tel');
    var address = document.getElementById('address');
    var city = document.getElementById('city');
    var postcode = document.getElementById('postcode');
    var dni = document.getElementById('dni');
    var form = document.getElementsByTagName('form')[0];
    var formTitle = document.getElementById('formTitle');
    var buttomForm = document.getElementById('buttomForm');
    var modal = document.getElementById('modal');
    var titleModal = document.getElementById('titleModal')
    var buttomModal = document.getElementById('buttomModal');
    var sendToServer = document.getElementById('sendToServer');

    //CREATE ELEMENTS TO ERROR MSGs
    var nameMsg  = document.createElement('p');
    var emailMsg = document.createElement('p');
    var passwordMsg = document.createElement('p');
    var password2Msg = document.createElement('p');
    var ageMsg = document.createElement('p');
    var telMsg = document.createElement('p');
    var addressMsg = document.createElement('p');
    var cityMsg = document.createElement('p');
    var postcodeMsg = document.createElement('p');
    var dniMsg = document.createElement('p');
    nameMsg.classList.add('errorMsg');
    emailMsg.classList.add('errorMsg');
    passwordMsg.classList.add('errorMsg');
    password2Msg.classList.add('errorMsg');
    ageMsg.classList.add('errorMsg');
    telMsg.classList.add('errorMsg');
    addressMsg.classList.add('errorMsg');
    cityMsg.classList.add('errorMsg');
    postcodeMsg.classList.add('errorMsg');
    dniMsg.classList.add('errorMsg');
    nameMsg.id= 'nameMsg'; 
    emailMsg.id= 'emailMsg'; 
    passwordMsg.id= 'passwordMsg'; 
    password2Msg.id= 'password2Msg'; 
    ageMsg.id= 'ageMsg'; 
    telMsg.id= 'telMsg'; 
    addressMsg.id= 'addressMsg'; 
    cityMsg.id= 'cityMsg'; 
    postcodeMsg.id= 'postcodeMsg'; 
    dniMsg.id= 'dniMsg';  

 
    //EVENTS LISTENER****************************************************************************
    //EVENTS BLUR
    names.addEventListener('blur', validateName);
    email.addEventListener('blur', validateEmail);
    password.addEventListener('blur', validatePassword);
    password2.addEventListener('blur', validatePassword2);
    age.addEventListener('blur', validateAge);
    tel.addEventListener('blur',validateTel);
    address.addEventListener('blur',validateAddress);
    city.addEventListener('blur', validateCity);
    postcode.addEventListener('blur', validatePostcode);
    dni.addEventListener('blur',validateDni);
    
    //EVENTS FOCUS
    names.addEventListener('focus', focusFunction);
    email.addEventListener('focus', focusFunction);
    password.addEventListener('focus', focusFunction);
    password2.addEventListener('focus', focusFunction);
    age.addEventListener('focus', focusFunction);
    tel.addEventListener('focus',focusFunction);
    address.addEventListener('focus',focusFunction);
    city.addEventListener('focus', focusFunction);
    postcode.addEventListener('focus', focusFunction);
    dni.addEventListener('focus', focusFunction);

    // EVENT SUBMIT
    form.addEventListener('submit', submitForm);

    //EVENT KEYDOWN
    names.addEventListener('keyup', keyUpName);

    //EVENT CLICK MODAL
    buttomModal.addEventListener('click',closeModal);

   //EVENT CLICK SEND
   sendToServer.addEventListener('click',sendServer);

    //FUNCTIONS VALIDATIOS *********************************************************
    //VALIDATE NAME 
    function validateName() {
        
        var textMsg = '';

        if (names.value.length==0){  
            textMsg = 'Field empty';
        }else{
            var countSpace = 0;
            var countLetter = 0;
            var arrayNames = names.value.split('');   //create an array with all the chars as elements
            
            arrayNames.forEach(element => {
                var ascii = element.charCodeAt();
                if (element == ' ') {                 // sum the occurrences of spaces
                    countSpace++;
                }else if ( (ascii>=65 && ascii<=90)||(ascii>=97 && ascii<=122)){
                    countLetter++;                                   // sum the occurrences of letters
                }
            });

            if (countSpace == 0) {                          //validate the occurrence of at least 1 space
                textMsg += 'Must contain an space. ';
            }
            if (countLetter <= 6){
                textMsg += 'Must have at least 6 letters. ';  //validate the occurrence of at least 6 letters
            }
            if (arrayNames.length - countLetter - countSpace !=0) {   // validate the name is made of letters and spaces
                textMsg += 'Must be made only of letters and spaces. ';
            }
        }
        if (textMsg!=''){           // if exist an error, show it
            nameMsg.innerText = textMsg; 
            names.parentElement.appendChild(nameMsg);
        }
    }

    //VALIDATE EMAIL
    function validateEmail() {
        
        var textMsg = ''; 

        if (email.value.length == 0) {
            textMsg = 'Field empty';  
        } else {
            var firstAt = email.value.indexOf('@');
            var lastAt = email.value.lastIndexOf('@');
            var lastDotCom = email.value.lastIndexOf('.com');
        
            if (firstAt == -1) {
                textMsg += 'Must contain an @. ';
            }
            if (firstAt != lastAt) {          
                textMsg += 'Must contain only one @. ';   
            }
            if (lastDotCom < firstAt || lastDotCom == firstAt) {
                textMsg += 'Must contain .com ';
            }
        }
        if (textMsg!=''){           // if exist an error, show it
            emailMsg.innerText = textMsg; 
            email.parentElement.appendChild(emailMsg);
        }
    }

    //VALIDATE PASSWORD
    function validatePassword() {

        var textMsg = ''; 

        if (password.value.length == 0) {
            textMsg = 'Field empty'; 
        } else {
            var countLetter= 0;
            var countNumber = 0;
            
            var arrayPassword = password.value.split('');   //create an array with all the chars as elements
            
            arrayPassword.forEach(element => {
                var ascii = element.charCodeAt();
                if (parseInt (element) == element) {                 // sum the occurrences of numbers
                    countNumber++;
                }else if ( (ascii>=65 && ascii<=90)||(ascii>=97 && ascii<=122)){
                    countLetter++;                                   // sum the occurrences of letters
                }
            });

            if (countLetter==0 || countNumber==0){         //validate the occurrence of at least 1 number and 1  letter
                textMsg += 'Must contain at least one letter and one number. '; 
            }
            if (password.value.length<8){                  // validate the password length is greater than 6
                textMsg += 'The length must be more than 8 characters. '; 
            }
            if (password.value.length-countNumber-countLetter!=0){  //validate the password is only made of letters and numbers
                textMsg += 'Must be made only of letters and numbers.  '; 
            }
        }
        if (textMsg!=''){           // if exist an error, show it
            passwordMsg.innerText = textMsg; 
            password.parentElement.appendChild(passwordMsg);
        }
    }

    //VALIDATE PASSWORD2
    function validatePassword2() {

        var textMsg = ''; 

        if (password2.value.length == 0) {
            textMsg = 'Field empty'; 
        } else if (password2.value !== password.value){
            textMsg = 'The passwords don\'t match'; 
        }  
        if (textMsg!=''){           // if exist an error, show it
            password2Msg.innerText = textMsg; 
            password2.parentElement.appendChild(password2Msg);
        }
    }

    //VALIDATE AGE
    function validateAge() {

        var textMsg = ''; 

        if (age.value.length == 0) {
            textMsg = 'Field empty'; 
        } else if (parseInt(age.value) != age.value) {
            textMsg += 'Must be an integer. ';          
        } else if(parseInt(age.value)<18){
            textMsg += 'Must be older than 18. ';
        }
        if (textMsg!=''){           // if exist an error, show it
            ageMsg.innerText = textMsg; 
            age.parentElement.appendChild(ageMsg);
        }
    }

    //VALIDATE TEL
    function validateTel() {

        var textMsg = ''; 

        if (tel.value.length == 0) {
            textMsg = 'Field empty';
        } else {           
            var arrayTel = tel.value.split('');   //create an array with all the chars as elements
            var countNumber=0;
            
            arrayTel.forEach(element => {
                if (parseInt (element) == element) {     // sum the occurrences of numbers
                    countNumber++;
                }
            });
            
            if (countNumber!=tel.value.length){
                textMsg += 'Must be made only of numbers. ';
            }
            if (tel.value.length < 7){
                textMsg += 'The length must be more than 7 characters. '; // validate the tel length is greater than 6
            }
        }
        if (textMsg!=''){           // if exist an error, show it
            telMsg.innerText = textMsg; 
            tel.parentElement.appendChild(telMsg);
        }
    }

    //VALIDATE ADDRESS
    function validateAddress(){

        var textMsg = ''; 

        if (address.value.length == 0) {
            textMsg = 'Field empty'; 
        } else {      
            var firstSpace = address.value.indexOf(' ');
            var lastSpace = address.value.lastIndexOf(' ');
            if (firstSpace == -1){
                textMsg += 'Must contain an space. ';
            }else if (lastSpace == address.value.length-1){
                textMsg += 'The space must not be at the end. ';
            }else{
                var arrayAddress = address.value.split('');   //create an array with all the chars as elements
                var countLetter = 0;
                var countNumber = 0;
                var countSpace = 0;
                arrayAddress.forEach(element => {
                    var ascii = element.charCodeAt();
                    if ( (ascii>=65 && ascii<=90)||(ascii>=97 && ascii<=122)){
                        countLetter++;                      // sum the occurrences of letters
                    } else if(element==' '){
                        countSpace++;                      // sum the occurrences of spaces
                    } else if((parseInt (element) == element)){
                        countNumber++;                      // sum the occurrences of numbers
                    }
                });
    
                if (address.value.length < 5){
                    textMsg += 'The length must be more than 5 characters. '; //validate the occurrence of at least 5 chars
                }
                if (countLetter==0 || countNumber==0 || countSpace==0){   // validate the ocurrence of at least 1 of each char.
                    textMsg += 'Must contain at least one letter, one number and one space. ';
                }
                if (arrayAddress.length -  countLetter - countNumber - countSpace !=0) {   // validate the postcode name is made of letters, numbers and spaces
                    textMsg += 'Must be made only of letters, numbers and spaces.  ';
                }    
            }
        } 
        if (textMsg!=''){           // if exist an error, show it
            addressMsg.innerText = textMsg; 
            address.parentElement.appendChild(addressMsg);
        }
    }

    //VALIDATE CITY
    function validateCity() {

        var textMsg = ''; 

        if (city.value.length == 0) {
            textMsg = 'Field empty'; 
        } else {           
            var arrayCity = city.value.split('');   //create an array with all the chars as elements
            var countAllowedChars = 0;
            arrayCity.forEach(element => {
                var ascii = element.charCodeAt();
                if ( (ascii>=65 && ascii<=90)||(ascii>=97 && ascii<=122) ||element==' '){
                    countAllowedChars++;                      // sum the occurrences of letters and space
                }
            });

            if (city.value.length < 3){
                textMsg += 'The length must be more than 3 characters. ';  //validate the occurrence of at least 3 chars
            }
            if (arrayCity.length - countAllowedChars!=0) {   // validate the city name is made of letters and spaces
                textMsg += 'Must be made only of letters and spaces. ';
            }
        }
        if (textMsg!=''){           // if exist an error, show it
            cityMsg.innerText = textMsg; 
            city.parentElement.appendChild(cityMsg);
        }
    }

    //VALIDATE POSTCODE
    function validatePostcode() {

        var textMsg = ''; 

        if (postcode.value.length == 0) {
            textMsg = 'Field empty'; 
        } else {           
            var arrayPost = postcode.value.split('');   //create an array with all the chars as elements
            var countAllowedChars = 0;
            arrayPost.forEach(element => {
                var ascii = element.charCodeAt();
                if ( (ascii>=65 && ascii<=90)||(ascii>=97 && ascii<=122) ||element==' ' || (parseInt (element) == element) ){
                    countAllowedChars++;                      // sum the occurrences of letters, spaces & numbers
                }
            });

            if (postcode.value.length < 3){
                textMsg += 'The length must be more than 3 characters.  ';;  //validate the occurrence of at least 3 chars
            }
            if (arrayPost.length - countAllowedChars!=0) {   // validate the postcode name is made of letters, numbers and spaces
                textMsg += 'Must be made only of letters, numbers and spaces. ';;
            }
        }
        if (textMsg!=''){           // if exist an error, show it
            postcodeMsg.innerText = textMsg; 
            postcode.parentElement.appendChild(postcodeMsg);
        }
    }

    //VALIDATE DNI
    function validateDni() {

        var textMsg = ''; 

        if (dni.value.length == 0) {
            textMsg = 'Field empty'; 
        } else {           
            var arrayDni = dni.value.split('');   //create an array with all the chars as elements
            var countNumber=0;
            arrayDni.forEach(element => {
                if (parseInt (element) == element) {                 // sum the occurrences of numbers
                    countNumber++;
                }
            });
            
            if (countNumber!=dni.value.length){
                textMsg += 'Must be made only of numbers. ';
            }
            if (dni.value.length < 7 || dni.value.length > 8 ){
                textMsg += 'The length must be between 7 and 8 characters.';/// validate the dni length is equal to 7 or 8
            }
        }
        if (textMsg!=''){           // if exist an error, show it
            dniMsg.innerText = textMsg; 
            dni.parentElement.appendChild(dniMsg);
        }
    }
    // FUNCTIONS FOCUS ***********************************************************************************************
    function focusFunction(e){

        var errorMsg = e.target.nextElementSibling; //try to catch the error msg
        if(errorMsg!=null){    //if the msg exists, remove it
            e.target.parentElement.removeChild(errorMsg);
        }
    }

    //FUNCTION SUBMIT**************************************************************************************************
    // this function will show only the validation results (it wont send the info to the server)
    function submitForm(e){
        e.preventDefault();
        
        //validate all again
        validateName();
        validateEmail();
        validatePassword();
        validatePassword2();
        validateAge();
        validateTel();
        validateAddress();
        validateCity();
        validatePostcode();
        validateDni();

        //create and append an UL element into the modal
        var contentModal= document.getElementById('contentModal'); 
        ulModal = document.createElement('ul');
        ulModal.id='modalUl';
        contentModal.appendChild(ulModal);

        buttomForm.disabled =true; //disable the form buttom

        var errors= document.querySelectorAll('.errorMsg');   //catch all the errors
        if (errors.length == 0){    //pass without errors   
            
            titleModal.innerText= 'VALIDATION SUCCESSFUL';
            arrayLabels.forEach(label =>{
                ulModal.innerHTML += `<li>${label.innerText}: ${label.nextElementSibling.value}</li>`;
            });

            sendToServer.classList.toggle('hide',false); // enable the buttom to send the info to server
            modal.classList.toggle('hide',false);  
                
        }else {    //no pass: errors detected
            titleModal.innerText= 'VALIDATION FAILED';
            arrayLabels.forEach(label =>{
                ulModal.innerHTML += `<li>${label.innerText}: ${label.nextElementSibling.value}</li>`
                if (label.nextElementSibling.nextElementSibling){    //if it has an error , show it
                    ulModal.innerHTML += `<li>Error: ${label.nextElementSibling.nextElementSibling.innerText}</li>`;
                }
            }) 
            modal.classList.toggle('hide',false);  
        }
    }

    //SEND TO SERVER
    // this function will send the info to the server
    function sendServer(){

        var url = 'https://curso-dev-2021.herokuapp.com/newsletter?name='+names.value+'&email='+email.value+'&password='+password.value+'&repeat password='+password2.value+'&age='+age.value+'&tel='+tel.value+'&address='+address.value+'&city='+city.value+'&postcode='+postcode.value+'&dni='+dni.value;

        fetch(url)
            .then(function respuesta(res){
                if (res.status === 200){
                    return res.json();
                }else{
                    throw  new Error(`HTTP ${res.status}`)
                }
            })
            .then(function info(data){
                sendToServer.classList.toggle('hide',true); //hide the buttom send
                titleModal.innerText= 'SUBSCRIPTION SUCCESSFUL'
                ulModal.innerHTML = '';
                for (const property in data){
                    ulModal.innerHTML+=`<li>${property}: ${data[property]}</li>`;
                    localStorage.setItem(property, data[property]);  // save the info in localStorage
                }        
            })
            .catch(function faiulure(error){
                console.log(error)
                sendToServer.classList.toggle('hide',true); //hide the buttom send
                titleModal.innerText= 'SUBSCRIPTION FAILED'
                ulModal.innerHTML=`<li>${error}</li>`; 
            });
    }

    //BONUS FUNCTION ***********************************************************************************************
    function keyUpName(e){
        var textTitle = e.target.value.toUpperCase();
        formTitle.innerText = 'HOLA '+ textTitle;
    }
    //CLOSE MODAL
    function closeModal(){
        sendToServer.classList.toggle('hide',true); //hide the buttom send
        modal.classList.toggle('hide',true); //hide the mdoal
        contentModal.removeChild(ulModal); // remove the information to avoid it being seen from the inspector

        buttomForm.disabled = false; //enable again the form submit buttom
    }
}

