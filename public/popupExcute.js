var socket = io("http://localhost:3000");
var user;

socket.on('your-name',function(data){
    user = data;
});
socket.on("old-mess-room1",function(data){
    var mess = data.split("```");
    for (var i =0;i<mess.length -1;i++){
    var submess = mess[i].split("``");
    var username = submess[0];
    var message = submess[1];
    if (username != user.userName)
    var element = "<li class='messages'><div class='messages-container-o'><div class='other-avt'><img src = '/images/avt1.jpg'></div><div class = 'o-message-text'>" + message +"</div></div><div class = 'message-footer o-footer'></div></li>";
    else
    var element = "<li class='messages'><div class='messages-container-u'><div class='user-avt'><img src = '/images/avt1.jpg'></div><div class = 'u-message-text'>" + message +"</div></div><div class = 'message-footer u-footer'></div></li>";
    $(".pop-up-mess").append(element);
    };
});

socket.on("tuvantinhcam-chat",function(data){
    var time = getCurrentTime();
    var mess = data.split("``");
    var message = mess[1];
    var element = "<li class='messages'><div class='messages-container-o'><div class='other-avt'><img src = '/images/avt1.jpg'></div><div class = 'o-message-text'>" + message +"</div></div><div class = 'message-footer o-footer'>"+time+"</div></li>"
    $(".pop-up-mess").append(element);
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
socket.on("your-mess",function(data){
    var time = getCurrentTime();
    var mess = data.split("``");
    var message = mess[1];
    var element = "<li class='messages'><div class='messages-container-u'><div class='user-avt'><img src = '/images/avt1.jpg'></div><div class = 'u-message-text'>" + message +"</div></div><div class = 'message-footer u-footer'>"+time+"</div></li>"
    $(".pop-up-mess").append(element);
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
    for (var i = 0; i < popups.length; i++){
            if ( id.id == popups[i]){
                Array.remove(popups,i);
                document.getElementById(id.id).style.display = "none";
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
    var element = "<div class='pop-up-box' id = '" + id + "'><div class='pop-up-head' onclick='hide_popup()'><div class='pop-up-left'>"+name+"</div>";
    var element1 = "<div class='pop-up-right' onclick='close_popup("+id+")'><div id='close'>&#10005</div></div></div><div class='pop-up-mess'></div><div class='pop-up-footer'>";
    var element2 ="<input name='message' id='mess' placeholder='Nhập tin nhắn...'><button class='btnSend btnSend-tuvantinhcam'>SEND</button></div></div>";
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
$(document).ready(function(){
    $("#tuvantinhcam").click(function(){
        
        if($("#tuvantinhcampopup")[0]){
            $("#tuvantinhcampopup").removeAttr('id');
        }

        register_popup('tuvantinhcampopup',$("#tuvantinhcam").text());

        socket.emit('tuvantinhcam-CreateRoom','tuvantinhcam');

        $("#tuvantinhcampopup .btnSend-tuvantinhcam").click(function(){
            if($("#tuvantinhcampopup #mess").val()!=null && $("#tuvantinhcampopup #mess").val() !=""){
                var message=user.userName + "``" + $("#tuvantinhcampopup #mess").val();
                socket.emit('tuvantinhcam-chatting',message);
                $("#tuvantinhcampopup #mess").val("");
            }
        })

        $("#tuvantinhcampopup #mess").keyup(function(e){
            if((event.keyCode === 13 ) && ($("#tuvantinhcampopup #mess").val()!=null) && ($("#tuvantinhcampopup #mess").val()!="")){
                $("#tuvantinhcampopup .btnSend-tuvantinhcam").click();
            }
        });

        $(".userStatus").click(function(event){
            if( $(event.target).closest('.statusText').length == 0 ){
                $(".userStatus").css("height","60px");
                $(".userStatusText .statusText").css("padding","10px");
                $(".btnStatus ").css("display","none");
            }
        });

        $(".userStatusText .statusText").focusin(function(){
            $(".userStatus").css("height","180px");
            $(".userStatusText .statusText").css("padding-bottom","80px");
            $(".btnStatus ").css("display","flex");
        });
    });


    $("#buonban").click(function(){
        register_popup("buonbanpopup",$("#buonban").text());
    });
    $("#congnghe").click(function(){
        var element = "<div class='pop-up-box'><div class='pop-up-head'><div class='pop-up-left'>"+$("#congnghe").text()+"</div>";
        var element1 = "<div class='pop-up-right'><div id='close'>&#10005</div></div></div><div class='pop-up-mess'></div><div class='pop-up-footer'>";
        var element2 ="<input name='message' id='mess' placeholder='Nhập tin nhắn...'><button class='btnSend btnSend-congnghe'>SEND</button></div></div>";
        if ($(".pop-up-box").length){
            $(".pop-up-box").hide();
        }
        $("#middle").append(element + element1 + element2);
        $("#close").click(function(){
            $(".pop-up-box").hide();
        })
    
        $(".pop-up-head").click(function(){
            $(".pop-up-box").hide();
        })
    });
    $("#danhchome").click(function(){
        var element = "<div class='pop-up-box'><div class='pop-up-head'><div class='pop-up-left'>"+$("#danhchome").text()+"</div>";
        var element1 = "<div class='pop-up-right'><div id='close'>&#10005</div></div></div><div class='pop-up-mess'></div><div class='pop-up-footer'>";
        var element2 ="<input name='message' id='mess' placeholder='Nhập tin nhắn...'><button class='btnSend btnSend-danhchome'>SEND</button></div></div>";
        if ($(".pop-up-box").length){
            $(".pop-up-box").hide();
        }
        $("#middle").append(element + element1 + element2);
        $("#close").click(function(){
            $(".pop-up-box").hide();
        })
    
        $(".pop-up-head").click(function(){
            $(".pop-up-box").hide();
        })
    });
});