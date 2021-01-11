async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var wopen_bar = false;


function close_hud() {
    if (!wopen_bar) {
        return;
    }

    wopen_bar = false;
    $(".HUD").toggleClass("active");
    $(".icon").toggleClass("active");
    $(".textdata").toggleClass("active");
}



async function add_class() {
    if (wopen_bar) {
        return;
    }
    wopen_bar = true;

    $(".HUD").toggleClass("active");
    $(".icon").toggleClass("active");
    $(".textdata").toggleClass("active");

    await sleep(7000);
    close_hud();
}


var job_kays = {
    "LSPD": "police.png"
};


function set_job(jobkay) {
    let job_img = job_kays[jobkay];
    $(".job_img").css("background-image", "url("+ job_imgs_directory + job_img +")");
}


function set_ping(ping) {
    $(".ping").html(ping);
}


function set_gang_display(gang) {
    if (gang) {
        $(".gang_img").css("display","");
    } else {
        $(".gang_img").css("display", "none");
    }
}


function updateClock() {
    var now = new Date(),
        time = (now.getHours()<10?'0':'') + now.getHours() + ':' + (now.getMinutes()<10?'0':'') + now.getMinutes();
    document.getElementsByClassName('time')[0].innerHTML = [time];
}



window.addEventListener('message', function(event) {
    var data = event.data;

    $("#health_status").css("height", (data.health / 2).toString()  + "%");
    $("#armor_status").css("height", data.armour.toString()  + "%");
    $("#thirst_status").css("height", (100-data.plyr_thirst).toString() + "%");
    $("#hunger_status").css("height", (100-data.plyr_hunger).toString() + "%");

    $(".player_name").html(data.plyr_name);
    $(".cash").html("$ " + data.plyr_cash);
    set_ping(data.plyr_ping);
    $(".the_id").html(data.plyr_id);

    set_job(data.plyr_job_kay);
    set_gang_display(data.plyr_gang);


    if (data.hhud) {
        document.getElementById("the_body").style.display = "none";
    } else {
        document.getElementById("the_body").style.removeProperty("display");
    }
    updateClock()

    if (data.open_bar) {
        add_class();
    }
});