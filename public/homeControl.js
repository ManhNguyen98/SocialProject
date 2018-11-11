var user;

socket.on('your-name',function(data){
    user = data;
    var name = data.firstName +" "+ data.lastName;
    var username = data.userName;
    $(".fullname").html("<span>"+name+"</span>");
    $(".userName").html("@"+username);
});
socket.on('user-online',function(data){
    $(".newUserList ul").html("");
    data.forEach(i => {
        var onlinename = i.firstName + " " +i.lastName;
        var element = "<div><img src='/images/avt1.jpg'><span>"+onlinename+"</span><i class='glyphicon glyphicon-globe'></i></div>";
        $(".newUserList ul").append(element);
    });
});
function load_status(){
socket.on('your-status',function(status){
    var name = user.firstName + " " + user.lastName;
    var userstatus = status.split("```");
    for (var i = 0;i<userstatus.length-1;i++){
        var info = userstatus[i].split("``");
        var time = info[0];
        var text = info[1];
        var element = "<div class='newPost'><div class='userCard'><img src='/images/avt1.jpg'><div class='newFeedFullName'><span>"+name+"</span>";
        var element = element + "<div class='dropdown'><button data-toggle='dropdown'><i class='glyphicon glyphicon-option-vertical'></i></button><ul class='dropdown-menu'><li id ='"+i+"' onclick='statusHide("+user.userName+i+","+i+")'>Ẩn <i class='glyphicon glyphicon-eye-close'></i></li><li>Xóa <i class='glyphicon glyphicon-trash'></i></li></ul></div></div>";
        var element = element + "<span class='timer'>"+time+"</span></div><div class='userText'><br><p id ='"+user.userName+i+"'>"+text+"</p></div></div>";
        $(".newFeed").prepend(element);
    }
})
}
function statusHide(id,i){
    var x = document.getElementById(id);
    var btn = document.getElementById(i);
    if (x.style.display != "none"){
        x.style.display = "none";
        btn.innerHTML = "Hiện <i class='glyphicon glyphicon-eye-open'></i>";
    }
    else{
        x.style.display = "block";
        btn.innerHTML = "Ẩn <i class='glyphicon glyphicon-eye-close'></i>";
    }
}
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
function createId(){
    var d = new Date();
    return "" + d.getDate() + d.getMonth() + d.getFullYear() + d.getHours() + d.getMinutes() + d.getMilliseconds();
}
function postStatus(){
    var timer = getCurrentTime();
    if ($(".statusText").val()!= null && $(".statusText").val()!=""){
    var status = timer + "``" + $(".statusText").val();
    //luu status vao csdl
    socket.emit("save-status",user,status);
    location.reload();
}
}
$(document).ready(function(){
    load_status();
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