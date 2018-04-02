function getSearchParams(k){
    var p={};
    location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v})
    return k?p[k]:p;
}

$("#campaign_id").val(getSearchParams('idCampaign'));

var captcha = false;

function recaptchaCallback() {
    captcha = true;
};

$('#form').submit(function(){
    $.ajax({
        url: 'https://ripley-campanas.appspot.com/campaign/get/',
        type: 'GET',
        data : $('#form').serialize(),
        success: function(data){
            console.log(data);
        }, error: function(error){
            console.log(error);
        }
    });
    event.preventDefault();
});


$('#form').submit(function(){
    $.ajax({
        url: 'https://ripley-campanas.appspot.com/campaign/add_user/',
        type: 'POST',
        data : $('#form').serialize(),
        success: function(){
            window.location.href= 'message.html';
        }, error: function(error){
            if(errors.hasOwnProperty(error.responseJSON.errorCode)){
                alert(error[error.responseJSON.errorCode]);
            } else{
                alert(error['default']);
            }
            console.log(error.responseJSON);
        }
    });
    event.preventDefault();
});

function isCellPhone(cellPhone) {
    var regex = /^\d+$/;
    return regex.test(cellPhone) && cellPhone.length === 8;
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function isRut(rut) {
    return $.validateRut(rut);
}

function validate() {
    if($("#rut").val() != "" && isRut($("#rut").val()) &&
        $("#first_name").val() != "" && $("#last_name").val() != "" &&
        $("#cellphone").val() != "" && isCellPhone($("#cellphone").val()) &&
        $("#email").val() != "" && isEmail($("#email").val()) &&
        $("#checkbox").is(":checked") == true &&
        captcha){
        $("#submit").removeAttr("disabled");
        $("#submit").removeClass( "grey-btn" ).addClass( "red-btn" );
    } else {
        $("#submit").attr("disabled", "disabled");
        $("#submit").removeClass( "red-btn" ).addClass( "grey-btn" );
    }
}

$("input[type='text']").on("keyup", function(){
    validate();
});

$("#rut").on("change keyup", function(){
    if (isRut($(this).val())){
        $("#errorRut").addClass( "hide-item" );
    } else{
        $("#errorRut").removeClass( "hide-item" );
    }
});

$("#cellphone").on("change keyup", function(){
    if (isCellPhone($(this).val())){
        $("#errorCel").addClass( "hide-item" );
    } else{
        $("#errorCel").removeClass( "hide-item" );
    }
});

$("#email").on("change keyup", function(){
    if (isEmail($(this).val())){
        $("#errorMail").addClass( "hide-item" );
    } else{
        $("#errorMail").removeClass( "hide-item" );
    }
});

$("#checkbox").on("change", function(){
    validate();
});

$("input#rut").rut({
    formatOn: 'keyup'
});
