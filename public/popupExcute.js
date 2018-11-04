var socket = io("http://localhost:3000");

socket.on("tuvantinhcam-chat",function(data){
    var time = getCurrentTime();
    var message = "<li class='messages'><div class='messages-container-o'><div class='other-avt'><img src = '/images/avt1.jpg'></div><div class = 'o-message-text'>" + data +"</div></div><div class = 'message-footer o-footer'>"+time+"</div></li>"
    $(".pop-up-mess").append(message);
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
    var message = "<li class='messages'><div class='messages-container-u'><div class='user-avt'><img src = '/images/avt1.jpg'></div><div class = 'u-message-text'>" + data +"</div></div><div class = 'message-footer u-footer'>"+time+"</div></li>"
    $(".pop-up-mess").append(message);
});

$(document).ready(function(){
    $("#tuvantinhcam").click(function(){
        var element = "<div class='pop-up-box'><div class='pop-up-head'><div class='pop-up-left'>"+$("#tuvantinhcam").text()+"</div>";
        var element1 = "<div class='pop-up-right'><div id='close'>&#10005</div></div></div><div class='pop-up-mess'></div><div class='pop-up-footer'>";
        var element2 ="<input name='message' id='mess' placeholder='Nhập tin nhắn...'><button class='btnSend btnSend-tuvantinhcam'>SEND</button></div></div>";
        if ($(".pop-up-box").length){
            $(".pop-up-box").hide();
        }
        $("#middle").append(element + element1 + element2);
        $("#close").click(function(){
            $(".pop-up-box").hide();
        })
        $("#mess").focus();
        $(".pop-up-head").click(function(){
            $(".pop-up-box").hide();
        })

        socket.emit('tuvantinhcam-CreateRoom','tuvantinhcam');

        $(".btnSend-tuvantinhcam").click(function(){
            socket.emit('tuvantinhcam-chatting',$("#mess").val());
            $("#mess").val("");
        })

        $("#mess").keyup(function(e){
            if((event.keyCode === 13 ) && ($("#mess").val()!=null) && ($("#mess").val()!="")){
                $(".btnSend-tuvantinhcam").click();
            }
        });

    });


    $("#buonban").click(function(){
        var element = "<div class='pop-up-box'><div class='pop-up-head'><div class='pop-up-left'>"+$("#buonban").text()+"</div>";
        var element1 = "<div class='pop-up-right'><div id='close'>&#10005</div></div></div><div class='pop-up-mess'></div><div class='pop-up-footer'>";
        var element2 ="<input name='message' id='mess' placeholder='Nhập tin nhắn...'><button class='btnSend btnSend-buonban'>SEND</button></div></div>";
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