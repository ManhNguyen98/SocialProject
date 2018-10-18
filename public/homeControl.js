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
});