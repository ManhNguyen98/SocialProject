
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
var popups_friend = [];

//function close pop up
function close_popups_friend(id){
    if(id.id != undefined)
    for (var i = 0; i < popups_friend.length; i++){
            if ( id.id == popups_friend[i]){
                Array.remove(popups_friend,i);
                document.getElementById(id.id).style.display = "none";
                calculate_popups_friend();
                return;
            }
        }
    else
    for (var i = 0; i < popups_friend.length; i++){
        if ( id == popups_friend[i]){
            Array.remove(popups_friend,i);
            document.getElementById(id).style.display = "none";
            calculate_popups_friend();
            return;
        }
    }
};

//display pop-up
function display_popups_friend(){
    var i = 0;
    for (i;i<total_popups;i++){
        if ( popups_friend[i] != undefined){
            var element = document.getElementById(popups_friend[i]);
            element.style.display = "block";
        }
    }

    for (var j = i; j < popups_friend.length; j++){
        var element = document.getElementById(popups_friend[j]);
        element.style.display = "none";
    }
};

//create markup for new popup and add id to popup array
function register_popups_friend(id, name){
    for (var i = 0; i<popups_friend.length; i++){
        if (id == popups_friend[i]){
            Array.remove(popups_friend,i);
            popups_friend.unshift(id);
            calculate_popups_friend();
            return;
        }
    }
    var element = '<div class="pop-up-box" id = "' + id + '"><div class="pop-up-head" onclick="hide_popup()"><div class="pop-up-left">'+name+'</div>';
    var element1 = '<div class="pop-up-right" onclick="close_popups_friend('+id+')"><div id="close">&#10005</div></div></div><div class="pop-up-mess '+id+'"></div><div class="pop-up-footer">';
    var element2 ='<input name="message" id="mess" placeholder="Nhập tin nhắn..."><button class="btnSend btnSend-'+id+'" onclick ="sendMessageFriend(\''+id+'\')">SEND</button></div></div>';
    document.getElementById("middle").innerHTML = document.getElementById("middle").innerHTML + element + element1 + element2;      
    $("#mess").focus();
    popups_friend.unshift(id);
    calculate_popups_friend();
};
//calculate totals_popup
function calculate_popups_friend(){
    var width = $("#middle").innerWidth();
    total_popups = parseInt(width/400);
    display_popups_friend();
}

function sendMessageFriend(id){
    var element = "#" + id + " #mess";
    var id = id.substr(1);
    if($(element).val()!=null && $(element).val() !=""){
        var newMessage={
            user: user.userName,
            fullname: user.firstName + " " + user.lastName,
            message: $(element).val(),
            time: getCurrentTime()
        }
        socket.emit('friend-chatting',id,newMessage,user.userName);
        $(element).val("");
    }
}
socket.on("yourMessWithFriend",function(id,newMessage){
    //if (!isNaN(id.charAt(0)))
    id = "a" + id;
    var element = '<li class="messages"><div class="messages-container-u"><div class="user-avt"><img src = "/images/avt1.jpg"></div><div class = "u-message-text">' + newMessage.message +'</div></div><div class = "message-footer u-footer">'+newMessage.time+'</div></li>';
    $('.pop-up-mess.' + id).append(element);
});
socket.on("friend-chat",function(id,newMessage){
    //if (!isNaN(id.charAt(0)))
    id = "a" + id;
    var element = "<li class='messages'><div class='messages-container-o'><div class='other-avt'><a href='#' data-toggle='tooltip' data-placement='top' title='"+newMessage.fullname+"'><img src = '/images/avt1.jpg'></a></div><div class = 'o-message-text'>" + newMessage.message +"</div></div><div class = 'message-footer o-footer'>"+newMessage.time+"</div></li>"
    $('.pop-up-mess.' + id).append(element);
    $('[data-toggle="tooltip"]').tooltip(); 
});
socket.on("OldMessageWithFriend",function(friend,message){
    friend = "a" +friend;
    message.forEach(submess => {
        if (submess.user == user.userName){
            var element = '<li class="messages"><div class="messages-container-u"><div class="user-avt"><img src = "/images/avt1.jpg"></div><div class = "u-message-text">' + submess.message +'</div></div><div class = "message-footer u-footer">'+submess.time+'</div></li>';
        }
        else{
            var element = "<li class='messages'><div class='messages-container-o'><div class='other-avt'><a href='#' data-toggle='tooltip' data-placement='top' title='"+submess.fullname+"'><img src = '/images/avt1.jpg'></a></div><div class = 'o-message-text'>" + submess.message +"</div></div><div class = 'message-footer o-footer'>"+submess.time+"</div></li>"
        }
        $('.pop-up-mess.' + friend).append(element);
        $('[data-toggle="tooltip"]').tooltip(); 
    });
});
// socket.on("room-chat",function(id, newMessage){
//     var element = "<li class='messages'><div class='messages-container-o'><div class='other-avt'><a href='#' data-toggle='tooltip' data-placement='top' title='"+newMessage.fullname+"'><img src = '/images/avt1.jpg'></a></div><div class = 'o-message-text'>" + newMessage.message +"</div></div><div class = 'message-footer o-footer'>"+newMessage.time+"</div></li>"
//     $('.pop-up-mess.' + id).append(element);
//     $('[data-toggle="tooltip"]').tooltip();  
// });

