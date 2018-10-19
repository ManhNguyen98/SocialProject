$(document).ready(function(){
    $("#tuvantinhcam").click(function(){
        var element = "<div class='pop-up-box'><div class='pop-up-head'><div class='pop-up-left'>"+$("#tuvantinhcam").text()+"</div>";
        var element1 = "<div class='pop-up-right'><div id='close'>&#10005</div></div></div><div class='pop-up-mess'></div><div class='pop-up-footer'>";
        var element2 ="<input name='message' id='mess' placeholder='Nhập tin nhắn...'><button id='btnSend'>SEND</button></div></div>";
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
    $("#buonban").click(function(){
        var element = "<div class='pop-up-box'><div class='pop-up-head'><div class='pop-up-left'>"+$("#buonban").text()+"</div>";
        var element1 = "<div class='pop-up-right'><div id='close'>&#10005</div></div></div><div class='pop-up-mess'></div><div class='pop-up-footer'>";
        var element2 ="<input name='message' id='mess' placeholder='Nhập tin nhắn...'><button id='btnSend'>SEND</button></div></div>";
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
        var element2 ="<input name='message' id='mess' placeholder='Nhập tin nhắn...'><button id='btnSend'>SEND</button></div></div>";
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
        var element2 ="<input name='message' id='mess' placeholder='Nhập tin nhắn...'><button id='btnSend'>SEND</button></div></div>";
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