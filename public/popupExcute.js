var socket = io("http://localhost:3000");

socket.on("tuvantinhcam-chat",function(data){
    var message = "<div class='messages'>" + data +"<div>";
    $(".pop-up-mess").append(message);
});

socket.on("your-mess",function(data){
    var message = "<div class='messages u-messages'>" + data +"<div>";
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
    
        $(".pop-up-head").click(function(){
            $(".pop-up-box").hide();
        })

        socket.emit('tuvantinhcam-CreateRoom','tuvantinhcam');

        $(".btnSend-tuvantinhcam").click(function(){
            socket.emit('tuvantinhcam-chatting',$("#mess").val());
            $("#mess").val("");
        })
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