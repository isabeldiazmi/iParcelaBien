
   
function add_vegetal(src) {
    // console.log("src", src)
    var arrSrc = src.split("/")
    var im = arrSrc[arrSrc.length - 1];
    // console.log("im", im)
    var img = document.createElement("img");
    img.src = "assets/img/" + im;
    img.style.width = "52px";
    img.style["border-radius"] = "17px";
    img.onclick = function () {
        console.log("img clicked")
        $.ajax({
            url:'http://localhost:3000', 
            data: {
                active: 1,
                type: 'onion'
            }, 
            method: 'post'
        }).done(function(data) { console.log(data) })
    }
    var ul = document.getElementById("parcelas");
    var li = document.createElement("li");
    li.appendChild(img);
    ul.insertBefore(li, ul.childNodes[0])
    // ul.appendChild(li)
    var inst = $('[data-remodal-id=modal]').remodal();
     inst.close();
}

function vegetablesMenu() {
     var inst = $('[data-remodal-id=modal]').remodal();
     inst.open();
}

module.exports = {
    add_vegetal: add_vegetal,
    vegetablesMenu: vegetablesMenu
}