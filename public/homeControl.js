var user;

socket.on('your-name',function(data){
    user = data;
    var name = data.firstName +" "+ data.lastName;
    var username = data.userName;
    $(".fullname").html("<span>"+name+"</span>");
    $(".userName").html("@"+username);
});
function getCurrentTime(){
    var d = new Date();
    var day = d.getDate();
    if (day < 10 ) day = "0" + day;
    var month = d.getMonth() + 1;
    if (month<10) month = "0" + month;
    var hours = d.getHours();
    if (hours<10) hour = "0"+hours;
    var minute = d.getMinutes();
    if (minute<10) minute = "0" + minute;
    var time = day + "/"+month+"/" + d.getFullYear() + " " + hours + ":" + minute;
    return time;
}
function postStatus(){
    var name = user.firstName + " " + user.lastName;
    if ($(".statusText").val()!= null && $(".statusText").val()!=""){
    var element = "<div class='newPost'><div class='userCard'><img src='/images/avt1.jpg'><div class='newFeedFullName'><span>"+name+"</span>";
    var element = element + "<div class='dropdown'><button data-toggle='dropdown'><i class='glyphicon glyphicon-option-vertical'></i></button><ul class='dropdown-menu'><li>Ẩn <i class='glyphicon glyphicon-eye-close'></i></li><li>Xóa <i class='glyphicon glyphicon-trash'></i></li></ul></div></div>";
    var element = element + "<span class='timer'>"+getCurrentTime()+"</span></div><div class='userText'><p>"+$(".statusText").val()+"</p></div></div>";
    $(".newFeed").prepend(element);
    //luu status vao csdl
    socket.emit("save-status",user.userName,$(".statusText").val());
    $(".statusText").val("");
}
}
$(document).ready(function(){
    $(".userStatusText .statusText").focusin(function(){
        $(".userStatus").css("height","180px");
        $(".userStatusText .statusText").css("padding-bottom","80px");
        $(".btnStatus ").css("display","flex");
    });
    $(".userStatus").click(function(event){
        if( $(event.target).closest('.statusText').length == 0 ){
            $(".userStatus").css("height","60px");
            $(".userStatusText .statusText").css("padding","10px");
            $(".btnStatus ").css("display","none");
        }
    });
    
    $(".statusText").keyup(function(e){
        if((event.keyCode === 13 ) && ($(".statusText").val()!=null) && ($(".statusText").val()!=""))
        postStatus();
    });    
});