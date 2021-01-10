$(document).ready(function(){
    $(".btn").click(function(){
        $(".HUD").toggleClass("active");
        $(".icon").toggleClass("active");
        $(".textdata").toggleClass("active");
    });
})


var job_kays = {
    "LSPD": "police.png"
};


var gang_kays = {
    "LSPD": "police.png"
};


var job_imgs_directory = "img/";
var gang_imgs_directory = "img/";

function set_job(jobkay) {
    let job_img = job_kays[jobkay];
    $(".job_img").css("background-image", "url("+ job_imgs_directory + job_img +")");
}

function set_gang(gangkay) {
    let gang_img = gang_kays[gangkay];
    $(".gang_img").css("background-image", "url("+ gang_imgs_directory + gang_img +")");
}


function setPlayerDatas() {
    $("#health_status").css("height", "67%");
    $("#armor_status").css("height", "44%");
    $("#thirst_status").css("height", "100%");
    $("#hunger_status").css("height", "47%");
    set_job("LSPD");
    set_gang("LSPD");
}

setPlayerDatas();