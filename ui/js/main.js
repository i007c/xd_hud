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
    "weazel": "https://cdn.discordapp.com/attachments/745708329019375697/797902591681757234/weazel.png",
    "psuspend": "https://cdn.discordapp.com/attachments/745708329019375697/797902614850306068/psuspend.png",
    "realestateagent": "https://cdn.discordapp.com/attachments/745708329019375697/797902628125933578/realestateagent.png",
    "pizza": "https://cdn.discordapp.com/attachments/745708329019375697/797902693372264468/pizza.png",
    "police": "https://cdn.discordapp.com/attachments/745708329019375697/797902697453191248/police.png",
    "postal": "https://cdn.discordapp.com/attachments/745708329019375697/797902698066083890/postal.png",
    "sheriff": "https://cdn.discordapp.com/attachments/745708329019375697/797902698997481513/sheriff.png",
    "swat": "https://cdn.discordapp.com/attachments/745708329019375697/797902701509738516/swat.png",
    "tailor": "https://cdn.discordapp.com/attachments/745708329019375697/797902703254569000/tailor.png",
    "taxi": "https://cdn.discordapp.com/attachments/745708329019375697/797902704903061524/taxi.png",
    "trucker": "https://cdn.discordapp.com/attachments/745708329019375697/797902705708105758/trucker.png",
    "ambulance": "https://cdn.discordapp.com/attachments/745708329019375697/797902707025379338/ambulance.png",
    "fueler": "https://cdn.discordapp.com/attachments/745708329019375697/797902739258605568/fueler.png",
    "garbage": "https://cdn.discordapp.com/attachments/745708329019375697/797902741203582976/garbage.png",
    "lawyer": "https://cdn.discordapp.com/attachments/745708329019375697/797902743528013834/lawyer.png",
    "lumberjack": "https://cdn.discordapp.com/attachments/745708329019375697/797902745934757908/lumberjack.png",
    "mafia": "https://cdn.discordapp.com/attachments/745708329019375697/797902746845315122/mafia.png",
    "mecano": "https://cdn.discordapp.com/attachments/745708329019375697/797902748115927050/mecano.png",
    "miner": "https://cdn.discordapp.com/attachments/745708329019375697/797902749203169280/miner.png",
    "nojob": "https://cdn.discordapp.com/attachments/745708329019375697/797902751454462012/nojob.png",
    "banker": "https://cdn.discordapp.com/attachments/745708329019375697/797902922976722955/banker.png",
    "FBI": "https://cdn.discordapp.com/attachments/745708329019375697/797903076488380436/FBI.png",
    "fisherman": "https://cdn.discordapp.com/attachments/745708329019375697/797903129043664966/fisherman.png",
    "detective": "https://cdn.discordapp.com/attachments/745708329019375697/797903403308023838/detective.png",
    "cardealer": "https://cdn.discordapp.com/attachments/745708329019375697/797903708998074378/cardealer.png",
    "banksecurity": "https://cdn.discordapp.com/attachments/745708329019375697/797903757635485726/banksecurity.png",
    "unicorn": "https://cdn.discordapp.com/attachments/745708329019375697/797903834096599110/unicorn.png",
    "bus": "https://cdn.discordapp.com/attachments/745708329019375697/797904078901739520/bus.png",
};


function set_job(jobkay) {
    let job_img = job_kays[jobkay];
    $(".job_img").css("background-image", "url("+ job_imgs_directory + job_img +")");
}


function set_ping(ping) {
    if (typeof ping === "number") {
        $(".ping").html(ping.toString());
        if (ping < 70) {
            $("#pingpath1").attr("fill","#5BFF62");
            $("#pingpath2").attr("fill","#5BFF62");
            $("#pingpath3").attr("fill","#5BFF62");
        } else {
            if (ping > 120) {
                $("#pingpath1").attr("fill","#FF0000");
                $("#pingpath2").attr("fill","#8C8C8C");
                $("#pingpath3").attr("fill","#8C8C8C");
            } else {
                $("#pingpath1").attr("fill","#FFD600");
                $("#pingpath2").attr("fill","#FFD600");
                $("#pingpath3").attr("fill","#8C8C8C");
            }
        }
    }
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