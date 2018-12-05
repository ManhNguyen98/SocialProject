var socket = io("http://localhost:3000");
var user;

socket.on('your-name',function(data){
    user = data;
});

socket.on("OldMessDefaultRoom",function(data,chat){
    chat.forEach(oldMess => {    
    if (oldMess.message!=""){
    if (oldMess.user != user.userName){
        var element = "<li class='messages'><div class='message-header'>"+oldMess.fullname+"</div><div class='messages-container-o'><div class='other-avt'><a href='#' data-toggle='tooltip' data-placement='top' title='"+oldMess.fullname+"'><img src = '/images/avt1.jpg'></a></div><div class = 'o-message-text'>" +oldMess.message +"</div></div><div class = 'message-footer o-footer'></div></li>";
    }
    else
    var element = "<li class='messages'><div class='messages-container-u'><div class='user-avt'><img src = '/images/avt1.jpg'></div><div class = 'u-message-text'>" + oldMess.message +"</div></div><div class = 'message-footer u-footer'></div></li>";
    }
    $('.pop-up-mess.' +data).append(element);
    $('[data-toggle="tooltip"]').tooltip();  
    });
});

socket.on("room-chat",function(id, newMessage){
    var element = "<li class='messages'><div class='message-header'>"+newMessage.fullname+"</div><div class='messages-container-o'><div class='other-avt'><a href='#' data-toggle='tooltip' data-placement='top' title='"+newMessage.fullname+"'><img src = '/images/avt1.jpg'></a></div><div class = 'o-message-text'>" + newMessage.message +"</div></div><div class = 'message-footer o-footer'>"+newMessage.time+"</div></li>"
    $('.pop-up-mess.' + id).append(element);
    $('[data-toggle="tooltip"]').tooltip();  
});
function roomDefaultChat(id,name){
    var element = document.getElementById(id);
    if (element!=undefined){
        element.removeAttribute("id");
    }
    register_popup(id,name);
    var element1 = "#" + id + " #mess";
    $(element1).keyup(function(event){
        if((event.keyCode === 13 ) && ($(element1).val()!=null) && ($(element1).val()!="")){
            $(".btnSend-"+id).click();
        }
    });
    socket.emit('CreateRoomDefault',id);//tao phong
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
socket.on("your-mess",function(id,newMessage){
    var element = '<li class="messages"><div class="messages-container-u"><div class="user-avt"><img src = "/images/avt1.jpg"></div><div class = "u-message-text">' + newMessage.message +'</div></div><div class = "message-footer u-footer">'+newMessage.time+'</div></li>';
    $('.pop-up-mess.' + id).append(element);
});
//pop-up function
//remove array element
Array.remove = function(array, from, to) {
    var rest = array.slice((to || from) + 1 || array.length);
    array.length = from < 0 ? array.length + from : from;
    return array.push.apply(array, rest);
};

//totals of pop-up
var total_popups = 0;
//array of popup ids
var popups = [];

//function close pop up
function close_popup(id){
    if(id.id != undefined)
    for (var i = 0; i < popups.length; i++){
            if ( id.id == popups[i]){
                Array.remove(popups,i);
                document.getElementById(id.id).style.display = "none";
                calculate_popups();
                return;
            }
        }
    else
    for (var i = 0; i < popups.length; i++){
        if ( id == popups[i]){
            Array.remove(popups,i);
            document.getElementById(id).style.display = "none";
            calculate_popups();
            return;
        }
    }
};

function hide_popup(){
        $(".pop-up-mess").hide();
        $(".pop-up-footer").hide();
        $(".pop-up-head").attr('id','pop-up-hide');
        $(".pop-up-head").attr('onclick','show_popup()');
        calculate_popups();
        return;
}
function show_popup(){
    $(".pop-up-head").removeAttr('id');
    $(".pop-up-mess").show();
    $(".pop-up-footer").show();
    $(".pop-up-head").attr('onclick','hide_popup()');
}
//display pop-up
function display_popups(){
    var i = 0;
    for (i;i<total_popups;i++){
        if ( popups[i] != undefined){
            var element = document.getElementById(popups[i]);
            element.style.display = "block";
        }
    }

    for (var j = i; j < popups.length; j++){
        var element = document.getElementById(popups[j]);
        element.style.display = "none";
    }
};

//create markup for new popup and add id to popup array
function register_popup(id, name){
    for (var i = 0; i<popups.length; i++){
        if (id == popups[i]){
            Array.remove(popups,i);
            popups.unshift(id);
            calculate_popups();
            return;
        }
    }
    var element = '<div class="pop-up-box" id = "' + id + '"><div class="pop-up-head" onclick="hide_popup()"><div class="pop-up-left">'+name+'</div>';
    var element1 = '<div class="pop-up-right"><div class="room-setup" data-toggle="tooltip" data-placement="top" title="Thành viên">&#9784</div><div data-toggle="tooltip" data-placement="top" title="Đóng" id="close"onclick="close_popup('+id+')">&#10005</div></div></div><div class="pop-up-mess '+id+'"></div><div class="pop-up-footer">';
    var element2 ='<input name="message" id="mess" placeholder="Nhập tin nhắn..."><button class="btnSend btnSend-'+id+'" onclick ="sendMessage(\''+id+'\')">SEND</button></div></div>';
    document.getElementById("middle").innerHTML = document.getElementById("middle").innerHTML + element + element1 + element2;      
    $("#mess").focus();
    popups.unshift(id);
    calculate_popups();
};
//calculate totals_popup
function calculate_popups(){
    var width = $("#middle").innerWidth();
    total_popups = parseInt(width/400);
    display_popups();
}

function sendMessage(id){
   var element = "#" + id + " #mess";
    if($(element).val()!=null && $(element).val() !=""){
        var newMessage={
            user: user.userName,
            fullname: user.firstName + " " + user.lastName,
            message: $(element).val(),
            time: getCurrentTime()
        }
        socket.emit('room-chatting',id,newMessage);
        $(element).val("");
    }
}

$(document).ready(function(){
    // $("#tuvantinhcam").click(function(){
    //     if($("#tuvantinhcampopup")[0]){
    //         $("#tuvantinhcampopup").removeAttr('id');
    //     }

    //     register_popup('tuvantinhcampopup',$("#tuvantinhcam").text());

    //     socket.emit('tuvantinhcam-CreateRoom','tuvantinhcam');

    //     $("#tuvantinhcampopup #mess").keyup(function(e){
    //         if((event.keyCode === 13 ) && ($("#tuvantinhcampopup #mess").val()!=null) && ($("#tuvantinhcampopup #mess").val()!="")){
    //             $("#tuvantinhcampopup .btnSend-tuvantinhcampopup").click();
    //         }
    //     });

    //     $(".userStatus").click(function(event){
    //         if( $(event.target).closest('.statusText').length == 0 ){
    //             $(".userStatus").css("height","60px");
    //             $(".userStatusText .statusText").css("padding","10px");
    //             $(".btnStatus ").css("display","none");
    //         }
    //     });

    //     $(".userStatusText .statusText").focusin(function(){
    //         $(".userStatus").css("height","180px");
    //         $(".userStatusText .statusText").css("padding-bottom","80px");
    //         $(".btnStatus ").css("display","flex");
    //     });
    // });

});