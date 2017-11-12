$(window).scroll(function(){
    var scrollTop     = $(window).scrollTop(),
        elementOffset = $('.searchBar').offset().top,
        distance      = (elementOffset - scrollTop);

    console.log(distance);
    if(distance <= 100){
        $('.searchBar').css({
            "position": "fixed",
            "left": 0,
            "top": "110px",
            "z-index": 999,
            "border-radius": 0,
            "width": "100%",
            "background": "#333",
            "color": "#FFF",
            "padding-left": 220
        });

        $('.searchBtn').css({
            "position": "fixed",
            "right": 800,
            "top": "110px",
            "color": "#AAA"

        });

        var scrollTop2     = $(window).scrollTop(),
            elementOffset2 = $('.searchContainer').offset().top,
            distance2      = (elementOffset2 - scrollTop2);

        if(distance2 >= 80){

            $('.searchBar').css({
                "position": "",
                "left": "",
                "top": "",
                "z-index": "",
                "border-radius": "",
                "padding-left": "",
                "background": "",
                "color": "",
                "width": ""
            });


            $('.searchBtn').css({
                "position": "",
                "right": "",
                "top": "",
                "height": "",
                "width": "",
                "font-size": "",
                "padding:": ""

            });

        }

    }else{

        $('.searchBar').css({
            "position": "",
            "left": "",
            "top": "",
            "z-index": "",
            "border-radius": "",
            "padding-left": "",
            "width": ""
        });

        console.log("YES");
    }
});

$(document).ready(function(){
    $.adaptiveBackground.run();
});