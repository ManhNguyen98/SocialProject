var user;
var listFriend=[];
socket.on('your-name',function(name){
    user = name;
    var fullname = name.firstName +" "+ name.lastName;
    var username = name.userName;
    $(".fullname").html("<span>"+fullname+"</span>");
    $(".userName").html("@"+username);
});
socket.on('your-friend',function(list,data){
    listFriend = list;
    var friendOnline1 = [];
    var friendOffline1 = [];
    var otherPeople1 = data.slice();
    if (data.length != 0){
        for (i = 0;i<data.length;i++){
            for (j = 0;j<listFriend.length;j++){
                if (listFriend[j].user == data[i].userName){
                    friendOnline1.push(listFriend[j]);
                    otherPeople1.splice(otherPeople1.indexOf(data[i]),1);
                    break;
                }
            }
        }
    }
    if (friendOnline1.length == 0) friendOffline1 = listFriend.slice();
    else{
        friendOffline1 = listFriend.slice();
        for (i = 0; i<listFriend.length;i++){
            for (j = 0; j<friendOnline1.length;j++){
                if (friendOnline1[j] == listFriend[i]){
                    friendOffline1.splice(friendOffline1.indexOf(listFriend[i]),1);
                    break;
                }
            }
        }
    }
    
    $(".listFriend ul").html("");
    friendOffline1.forEach(friend => {
        var element = '<div><img src="/images/avt1.jpg">  <span>'+friend.fullname+'</span><i class="glyphicon glyphicon-leaf off"></i></div>'
        $(".listFriend ul").append(element);
    });
    friendOffline1=[];
    friendOnline1.forEach(friend => {
        var element = '<div><img src="/images/avt1.jpg">  <span>'+friend.fullname+'</span><i class="glyphicon glyphicon-leaf "></i></div>'
        $(".listFriend ul").prepend(element);
    });
    friendOnline1 = [];
    $(".newUserList ul").html("");
    otherPeople1.forEach(function(i) {
        var onlinename = i.firstName + " " +i.lastName;
        var currentName = user.firstName + " " + user.lastName;
        var username= i.userName;
        if(currentName != onlinename){
            var element = '<div><img src="/images/avt1.jpg">  <span>'+onlinename+'</span><i class="glyphicon glyphicon-globe" onmouseover="changeImg1(this)" onmouseout="changeImg2(this)" onClick="addFriend(\'' + username + '\')"></i></div>';
            $(".newUserList ul").append(element);
            
        }
    });
    otherPeople1 = [];
});
socket.on('user-online',function(data){
    var friendOnline = [];
    var friendOffline = [];
    var otherPeople = data;
    if (data.length != 0){
        //check co phai ban dang online
    //other people online
    for (i = 0;i<data.length;i++){
        for (j = 0;j<listFriend.length;j++){
            if (listFriend[j].user == data[i].userName){
                friendOnline.push(listFriend[j]);
                otherPeople.splice(otherPeople.indexOf(data[i]),1);
                break;
            }
        }
    }
    }
    if (friendOnline.length == 0) {
     //Khong co ban nao dang online
        friendOffline = listFriend.slice();
    }
    else{
        //check ban dang online va offline
        friendOffline = listFriend.slice();
        for (i = 0; i<listFriend.length;i++){
            for (j = 0; j<friendOnline.length;j++){
                if (friendOnline[j] == listFriend[i]){
                    friendOffline.splice(friendOffline.indexOf(listFriend[i]),1);
                    break;
                }
            }
        }
    }
    $(".listFriend ul").html("");
    friendOffline.forEach(friend => {
        var element = '<div><img src="/images/avt1.jpg">  <span>'+friend.fullname+'</span><i class="glyphicon glyphicon-leaf off"></i></div>'
        $(".listFriend ul").prepend(element);
    });
    friendOnline.forEach(friend => {
        var element = '<div><img src="/images/avt1.jpg">  <span>'+friend.fullname+'</span><i class="glyphicon glyphicon-leaf "></i></div>'
        $(".listFriend ul").prepend(element);
    });
    $(".newUserList ul").html("");
    otherPeople.forEach(function(i) {
        var onlinename = i.firstName + " " +i.lastName;
        var currentName = user.firstName + " " + user.lastName;
        var username = i.userName;
        if(currentName != onlinename){
            var element = '<div><img src="/images/avt1.jpg">  <span>'+onlinename+'</span><i class="glyphicon glyphicon-globe" onmouseover="changeImg1(this)" onmouseout="changeImg2(this)" onClick="addFriend(\'' + username + '\')"></i></div>';
            $(".newUserList ul").append(element);
            
        }
    });
});
socket.on('someoneAddFriend',function(user1,user2){
    var name = user2.firstName + " " +user2.lastName;
    if(user.userName == user1) 
    var select = confirm(name+" muốn kết bạn với bạn");
    socket.emit("friendResult",select,user1,user2.userName);
    location.reload();
});
function changeImg1(x){
        x.className = "glyphicon glyphicon-plus";
}
function changeImg2(x){
    x.className = "glyphicon glyphicon-globe";
}
function addFriend(data){
    //displayDialogNotify();
    socket.emit('addfriend',data);
}
function displayDialogNotify(){
    $(".modal-title").text("Thông báo");
    $(".modal-body p").text("Kết bạn thành công");
}
socket.on('your-status',function(status){
    $(".newFeed").html("");
    for (i=1;i<status.length;i++){
        var time = status[i].time;
        var text = status[i].text;
        var element = '<div class="newPost"><div class="userCard"><img src="/images/avt1.jpg"><div class="newFeedFullName"><span>'+status[i].fullname+'</span>';
        var element = element + '<div class="dropdown"><button data-toggle="dropdown"><i class="glyphicon glyphicon-option-vertical"></i></button><ul class="dropdown-menu"><li id ="\''+i+'\'" onclick="statusHide(\''+user.userName+i+'\','+i+')">Ẩn <i class="glyphicon glyphicon-eye-close"></i></li><li>Xóa <i class="glyphicon glyphicon-trash"></i></li></ul></div></div>';
        var element = element + '<span class="timer">'+time+'</span></div><div class="userText"><br><p id ="\''+user.userName+i+'\'">'+text+'</p></div></div>';
        if (time != "")
        $(".newFeed").prepend(element);
    }
})

function statusHide(id,i){
    var x = document.getElementById(id);
    var btn = document.getElementById(i);
    if (x.style.display != "none"){
        x.style.display = "none";
        btn.innerHTML = 'Hiện <i class="glyphicon glyphicon-eye-open"></i>';
    }
    else{
        x.style.display = "block";
        btn.innerHTML = 'Ẩn <i class="glyphicon glyphicon-eye-close"></i>';
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
    //luu status vao csdl
    socket.emit("save-status",user,timer,$(".statusText").val());
    location.reload();
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