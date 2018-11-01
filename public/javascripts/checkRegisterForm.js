function checkForm(){
    $(".error").html('');
    var ho = $("#RHo").val();
    var ten = $("#RTen").val();
    if (ho == ''|| ten == ''){
        $(".error-name").html("Họ tên là bắt buộc");
        $("#RHo").focus();
        return false;
    }
    var username = $("#RuserName").val();
    if (username == ''){
        $(".error-username").html("Tên đăng nhập là bắt buộc");
        $("#RuserName").focus();
        return false;
    }
    var email = $("#Remail").val();
    if (email == ''){
        $(".error-email").html("Email là bắt buộc");
        $("#Remail").focus();
        return false;
    }
    var passwd = $("#RpassWord").val();
    if (passwd == ''){
        $(".error-passwd").html("Mật khẩu là bắt buộc");
        $("#RpassWord").focus();
        return false;
    }
    var passwd2 = $("#RpassWord2").val();
    if (passwd2 == ''){
        $(".error-passwd2").html("Nhập lại mật khẩu");
        $("#RpassWord2").focus();
        return false;
    }
    if (passwd != passwd2){
        $(".error-passwd2").html("Mật khẩu không đúng");
        $("#RpassWord2").val('');
        $("#RpassWord2").focus();
        return false;
    }
    
}