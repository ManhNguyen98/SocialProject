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
    var otherPeople = data.slice();
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
    var select = confirm(name+" muốn kết bạn với bạn");
    socket.emit("friendResult",select,user1,user2.userName);
    location.reload();
});
socket.on('your-room',function(room){
    $(".userRoomList ul").html("");
    room.splice(0,1);
    room.forEach(subRoom => {
        var element = '<li onclick="roomChat(\''+subRoom.roomName+'\')">'+subRoom.roomName+'</li>';
        $(".userRoomList ul").prepend(element);
    });
    
});
function roomChat(id){
    var element = document.getElementById(id);
    if (element!=undefined){
        element.removeAttribute("id");
        register_popup(id,id);
    }
    else
    register_popup(id,id);
    socket.emit('CreateRoomWithIDName',id,user.userName);//tao phong
}
socket.on("OldMessageOfRoom",function(nameOfRoom,OldMessage){

    OldMessage.forEach(message => {
    if (message.message != ""){
        if (message.user != user.userName){
            var element = "<li class='messages'><div class='messages-container-o'><div class='other-avt'><a href='#' data-toggle='tooltip' data-placement='top' title='"+message.fullname+"'><img src = '/images/avt1.jpg'></a></div><div class = 'o-message-text'>" + message.message +"</div></div><div class = 'message-footer o-footer'></div></li>";
        }
        else{
            var element = "<li class='messages'><div class='messages-container-u'><div class='user-avt'><img src = '/images/avt1.jpg'></div><div class = 'u-message-text'>" + message.message +"</div></div><div class = 'message-footer u-footer'></div></li>";
        }
    }
        $('.pop-up-mess.' + nameOfRoom).append(element);
        $('[data-toggle="tooltip"]').tooltip();  
    });
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
    var x = document.getElementById("\'"+id+"\'");
    var btn = document.getElementById("\'"+i+"\'");
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
    $(".createRoom p").click(function(){
        var friendAdded =[];
        //display listFriend
        $(".addFriend-form").html("");
        $(".roomName input").val("")
        listFriend.forEach(friend => {
            var element = '<div class="addFriend"><img src="/images/avt1.jpg"> <span>'+friend.fullname+'</span><button class="btn btn-default" id="'+friend.user+'">Thêm</button></div>';
            $(".addFriend-form").append(element);
        });
        $(".addFriend button").click(function(){
            friendAdded.push($(this).attr('id'));
            $(this).prop("disabled","true");
        });
        
        $(".roomCreated").click(function(){
            var roomName = $(".roomName input").val();
            if (roomName == "" || roomName == null){
            alert("Nhập tên phòng");
            }else{
                //kiem tra phong co ton tai
                var found = 0
                for (i =0;i<user.room.length;i++){
                    if(user.room[i].roomName == roomName){
                        found = 1;
                    }
                }
                if (found == 1){
                    alert("Phòng đã tồn tại");
                }
            else{
                $(".roomCreated").attr("data-dismiss","modal");
                $(".roomCreated").attr("data-toggle","modal");
                $(".roomCreated").attr("data-target","#myModal");
                var newRoom = {
                    name: roomName,
                    listFriendAdded: friendAdded
                }
                socket.emit("newRoomCreated",newRoom);
                
            }
        }
        });
    });
});