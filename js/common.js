const contents = document.querySelectorAll("#main > section")
let pos1 = $("#content1").position().left
let pos2 = $("#content2").position().left
let pos3 = $("#content3").position().left
let pos4 = $("#content4").position().left
let windowN = 1
let windowMvState = 0
let mvPos, mvPoint;
let firstN = 1;
let slideState = 0;
// 숫자 버튼 인덱스 뽑기 위해서
const articles = document.querySelectorAll("#articleWrap article")

// 가장 처음에 화면
// 로고가 투명해지면서 작아진다. 배경은 마지막에 다 움직이고 나서 투명해짐
setTimeout(function() {
    $("#firstWindow").addClass("active")
    let time = parseInt($("#firstWindow").css("transition-duration"))*1000
    setTimeout(function() {
        $("#firstWindow").fadeOut(500, function() {
            $(this).hide()
            // 글자 타이핑
            setTimeout(print, 200)
            // 처음에 얼마간 이모지 움직이고 있기
            setTimeout(function() {
                $(".bg1 img").attr("src", "images/imoge1.png")
            }, 2000)
        })
    }, time)
}, 500)

// 윈도우 사이즈를 변경할 시에
let timer;
window.addEventListener("resize", function() {
    // 항상 그 포지션에 고정
    $("#main").css({marginLeft: -window.innerWidth*(windowN-1)})
    clearTimeout(timer)
    timer = setTimeout(slidePosition, 500)
})

// 가장 처음 메뉴에 일단 on 클래스 부가
$("#gnb > li > a").eq(0).addClass("on")
// 전체 움직임(옆으로 움직여야 한다.)
window.addEventListener("wheel", function(e) {
    if (windowMvState == 0) {
        windowMvState = 1;
        if (e.wheelDelta < 0) { // 아래로 휠
            if (windowN < contents.length) {
                windowN++;
                $("#gnb > li > a").removeClass("on")
                $("#gnb > li > a").eq(windowN-1).addClass("on")
                mvPos = $(window).innerWidth()
                $("#main:not(:animated)").animate({marginLeft: "-=" + mvPos}, 600, function() {
                    windowMvState = 0
                    line_ani()
                    c4_arrive()
                })
            }
        }
        else { // 위로 휠
            if (windowN > 1) {
                windowN--;
                $("#gnb > li > a").removeClass("on")
                $("#gnb > li > a").eq(windowN-1).addClass("on")
                mvPos = $(window).innerWidth()
                $("#main:not(:animated)").animate({marginLeft: "+=" + mvPos}, 600, function() {
                    windowMvState = 0
                    line_ani()
                    c4_arrive()
                })
            }
            
        }
    }    
})
// 메뉴 클릭 시 부드럽게 이동
$("#gnb > li > a").on("click", function(e) {
    e.preventDefault();
    windowMvState = 1
    $("#gnb > li > a").removeClass("on")
    $(this).addClass("on")
    mvPoint = $(this).attr("href").substr(8, 1)
    windowN = parseInt(mvPoint)
    mvPos = $("#content1").innerWidth() * (windowN - 1)
    $("#main").stop().animate({marginLeft: -mvPos}, 1000, function() {
        windowMvState = 0
        line_ani()
        c4_arrive()
    })
})
// 새로 고침 시 가장 앞으로 이동
window.addEventListener("load", function() {
    setTimeout(function() {
        scrollTo(0, 0)
    }, 20)
})
console.log($("#gnb li").outerWidth(true))
// section1 - 인트로

// 타이핑 효과
const hi = document.querySelector("#pWrap p")
let hiText = "안녕하세요!`이제 막 웹개발에 발걸음을 뗀N입니다.`국비 지원 교육 과정 전 약 2 ~ 3 개월 간 기초 언어인 C언어, Python 그리고 Linux 를 배웠고 현재 HTML, CSS, Javascript, jQuery를 배웠습니다. 아직은 부족한 능력이지만, 남은 기간 동안 열심히 노력해서 스스로 만족할만한 실력을 갖추는 것이 목표입니다!!"
let i = 0;

function print() {
    if (i < hiText.length) {
        if(hiText[i] === "`") hi.innerHTML += "<br />"
        else if(hiText[i] === "N") hi.innerHTML += "<em>김보령</em>"
        else hi.innerHTML += hiText[i]
        i++
        setTimeout(print, 30)
    }
}
// p 태그에 스크롤 바 생긴거 윈도우 움직임 막기
$("#pWrap").hover(function() {
    windowMvState = 1;
}, function() {
    windowMvState = 0;
})

// imoge에 마우스 올려보세요 글자 깜빡이기
setInterval(function() {
    $(".bg1 p").animate({opacity: 1}, 500, function() {
        $(this).animate({opacity: 0.2}, 500)
    })
}, 500)

// 마우스 올리면 imoge 변경
$("img").on("mouseenter", function() {
    windowMvState = 0;
    let _this = $(this).attr("src").substr(12, 1)
    $(this).attr("src", "images/imoge" + _this + ".gif")
})
$("img").on("mouseleave", function() {
    windowMvState = 0;
    let _this = $(this).attr("src").substr(12, 1)
    $(this).attr("src", "images/imoge" + _this + ".png")
})

// section2 - study

// study 화면 도착 시 라인 나타나기
function line_ani() {
    if(windowN == 2 && windowMvState == 0) {
        setTimeout(function() {
            $(".subject:eq(0) li").addClass("stretch")
        }, 300)
        setTimeout(function() {
            $(".subject:eq(1) li").addClass("stretch")
        }, 1300)
    }
    else if (windowN != 2) $(".subject li").removeClass("stretch")
}

// 링크 이미지 넣기
const link = document.querySelectorAll("#link ul li a")
let imgPath;
for (let i=0; i<link.length; i++) {
    imgPath = link[i].getAttribute("data-svgName")
    console.log(imgPath)
    link[i].style.backgroundImage = "url(" + imgPath + ".svg)"
}
$("#link ul li").on("mouseenter", function() {
    imgPath = $(this).children("a").attr("data-svgName")
    $(this).children("a").css({
        backgroundImage: "url(" + imgPath + "_on.svg)"
    })
    $(this).css({color: "#FFE000"})
    if($(this).index() % 2 == 0) $(this).css({transform: "translateY(20px)"})
    else $(this).css({transform: "translateY(-30px)"})
})
$("#link ul li").on("mouseleave", function() {
    imgPath = $(this).children("a").attr("data-svgName")
    $(this).children("a").css({
        backgroundImage: "url(" + imgPath + ".svg)"
    })
    $(this).css({color: "#fff"})
    if($(this).index() % 2 == 0) $(this).css({transform: "translateY(50px)"})
    else $(this).css({transform: "translateY(0)"})
})

// 노트 클릭 시 나타나기
$("#link p").on("click", function() {
    if ($(this).width() == $("#link ul").width()) {
        $("#link ul").not(":animated").animate({width: "100%", height: "100%"}, 800, function() {
            $("#link p").css({backgroundImage: "url(images/arrowR.png)"})
            $("#link ul").css({overflow: "visible"})
        })
        $("#link ul li").each(function() {
            let iNum = $(this).index()
            $(this).delay(400*(iNum+1)).animate({opacity: 1, marginTop: 0})
        })
    }
    else {
        $("#link ul").css({overflow: "hidden"})
        $("#link ul").not(":animated").animate({width: 30, height: 30}, function() {
            $("#link p").css({backgroundImage: "url(images/arrowL.png)"})
            
        })
        $("#link ul li").each(function() {
            let iNum = $("#link ul li").length - 1 - $(this).index()
            $(this).css({opacity: 0, marginTop: 50})
        })
    }
})
$("#link p").on("mouseenter", function() {
    if ($("#link ul").width() == $(this).width()) $(this).css({backgroundImage: "url(images/arrowL_on.png)"})
    else $(this).css({backgroundImage: "url(images/arrowR_on.png)"})
})
$("#link p").on("mouseleave", function() {
    if ($("#link ul").width() == $(this).width()) $(this).css({backgroundImage: "url(images/arrowL.png)"})
    else $(this).css({backgroundImage: "url(images/arrowR.png)"})
})

// section3 - Like

// content3 슬라이드 만들기
// 각방향으로 마우스가 올라가면 addClass("on")
$("#content3").on("mousemove", function(e) {
    if (e.clientX < $("#content3").innerWidth()*0.1) {
        $("#posNum a").removeClass("on")
        $("#posNum a:eq(0)").addClass("on")
    }
    else if (e.clientX > $("#content3").innerWidth()*0.9) {
        $("#posNum a").removeClass("on")
        $("#posNum a:eq(1)").addClass("on")
    }
    else $("#posNum a").removeClass("on")
})
$("#numBtn li a").eq(0).addClass("on")
// 각 슬라이드 기본 위치 잡기 1, 0, 2
function slidePosition() {
    if (window.innerWidth > 950) {
        $("#articleWrap article").removeClass("active")
        $("#articleWrap").prepend($("#articleWrap article:last"))
    }
    else {
        $("#articleWrap article").removeClass("active").css({opacity: 0})
        $("#articleWrap article:first").addClass("active").css({opacity: 1})
    }
}
slidePosition()

// 우 버튼 누르면 슬라이드 이동
$("#posNum a:eq(1)").on("click", function(e) {
    e.preventDefault();
    if (window.innerWidth > 950) {
        firstN = parseInt($("#articleWrap article:eq(1)").attr("class").substr(5, 1))

        setTimeout(function() {
            $("#articleWrap").append($("#articleWrap article:eq(0)"))
            $("#articleWrap article").css({animationDuration: "0s"})
        }, 1000)
        $("#articleWrap article").each(function() { // 0-1 / 1-2 / 2-0
            let n = $(this).index() + 1;
            if (n == 3) n = 0
            $(this).css({animationName: "list" + n, animationDuration: "1s"})
        })
    }
    else {
        firstN = parseInt($("#articleWrap article:eq(0)").attr("class").substr(5, 1))

        $("#articleWrap article").not(":eq(1)").animate({opacity: 0})
        $("#articleWrap article:eq(1):not(:animated)").addClass("active")
                        .animate({opacity: 1}, 500, function() {
                            $("#articleWrap").append($("#articleWrap article:first"))
                            $("#articleWrap article:last").removeClass("active")
                        })
    }
    firstN++
    if(firstN == 4) firstN = 1
    $("#numBtn li a").removeClass("on")
    $("#numBtn li a").eq(firstN-1).addClass("on")
})

// 좌 버튼 누를 시
$("#posNum a:eq(0)").on("click", function(e) {
    e.preventDefault();
    if (window.innerWidth > 950) {
        firstN = parseInt($("#articleWrap article:eq(1)").attr("class").substr(5, 1))
        setTimeout(function() {
            $("#articleWrap").prepend($("#articleWrap article:eq(2)"))
            $("#articleWrap article").css({animationDuration: "0s"})
        }, 1000)
        $("#articleWrap article").each(function() {
            let n = $(this).index();
            $(this).css({animationName: "list" + n, animationDuration: "1s"})
        })
    }
    else {
        firstN = parseInt($("#articleWrap article:eq(0)").attr("class").substr(5, 1))
        
        $("#articleWrap article").not(":last").animate({opacity: 0})
        $("#articleWrap article:last:not(:animated)").addClass("active")
                        .animate({opacity: 1}, 500, function() {
                            $("#articleWrap").prepend($("#articleWrap article:last"))
                            $("#articleWrap article:eq(1)").removeClass("active")
                        })
    }
    firstN--
    if(firstN == 0) firstN = 3
    $("#numBtn li a").removeClass("on")
    $("#numBtn li a").eq(firstN-1).addClass("on")
})
// 숫자 버튼 없앤다.
$("#numBtn li a").on("click",function(e) {
    e.preventDefault();
})

// section4 - 끝인사
function c4_arrive() {
    if(windowN == 4 && windowMvState == 0) {
        $("body").animate({backgroundColor: "#fff"}, function() {
            // 인사말 위로 올리기
            if ($(window).innerHeight() > 750) {
                $("#infoWrap").animate({bottom: "10%"}, 1500, "easeOutBounce")
            }
            else {
                $("#infoWrap").animate({bottom: "0"}, 1500, "easeOutBounce")
            }
            // 이미지 투명도 증가시키기
            $("#content4 div:eq(0)").animate({opacity: 1})
            // 별 넣기
            for(let i=0; i<50; i++) {
                $("#stars").append("<div></div>")
                let rWidth = Math.ceil(Math.random() * 10)
                let rX = Math.floor(Math.random() * $(window).innerWidth())
                let rY =  Math.floor(Math.random() * $(window).innerHeight())
                $("#stars div:last").css({width: rWidth, height: rWidth, position: "absolute", top: rY, left: rX})
            }
            $("#content4 div img").attr("src", "images/imoge2.gif")
            // 처음에 얼마간 이모지 움직이고 있기
            setTimeout(function() {
                $("#content4 div img").attr("src", "images/imoge2.png")
            }, 2000)
        })
        // 뒤에 로고 처럼 크게 나오는 거 검은색으로 변경
        $(".c_head").animate({color: "rgba(0, 0, 0, 0.1)"})
        // 로고 그림 변경
        $("#header h1").css({backgroundImage: "url(svg/logo_b.svg)"})
        // 메뉴색 변경
        $("#gnb > li > a").addClass("c4")
    }
    else if (windowN != 4) {
        $("#infoWrap").css({bottom: "-50%"})
        $("#content4 div:eq(0)").css({opacity: 0})
        $("body").animate({backgroundColor: "#000"})
        $("#header h1").css({backgroundImage: "url(svg/logo_w.svg)"})
        $(".c_head").animate({color: "rgba(255, 255, 255, 0.1)"})
        $("#gnb > li > a").removeClass("c4")
        $("#stars div").remove()
    }
}
setInterval(function() {
    $("#stars div").each(function() {
        let _this = $(this).index()
        if (_this < 10) $(this).css({top: "+=" + 0.1})
        else if (_this < 20) $(this).css({top: "+=" + 0.5})
        else if (_this < 30) $(this).css({top: "+=" + 1})
        else if (_this < 40) $(this).css({top: "+=" + 1.5})
        else $(this).css({top: "+=" + 2})

        if (parseInt($(this).css("top")) > $(window).innerHeight() + 100) $(this).css({top: "-10px"})
    })
}, 1)
