local thirst = nil
local hunger = nil
local player_name = nil
local player_job = nil
local player_gang = nil
local player_img = nil
local player_money = nil
local player_id = nil
local open_bar = false
local ping = nil

AddEventHandler('esx:onPlayerSpawn', function()
    TriggerServerEvent("jc_hud:serverUpdate")
end)

function update_hungerThirst()
    TriggerEvent('esx_status:getStatus', 'hunger', function(status)
        hunger = math.floor(100 - status.getPercent())
    end)

    TriggerEvent('esx_status:getStatus', 'thirst', function(status)
        thirst = math.floor(100 - status.getPercent())
    end)
end

Citizen.CreateThread(function()
    while true do
        TriggerServerEvent("jc_hud:serverUpdate")
        if IsControlPressed(1, 39) then
            open_bar = true
        end
        update_hungerThirst()
        SendNUIMessage({
            health = GetEntityHealth(PlayerPedId()),
            armour = GetPedArmour(PlayerPedId()),
            plyr_id = player_id,
            plyr_thirst = thirst,
            plyr_hunger = hunger,
            plyr_name = player_name,
            plyr_job = player_job,
            plyr_gang = player_gang,
            plyr_img = player_img,
            plyr_cash = player_money,
            open_bar = open_bar,
            hhud = IsPauseMenuActive()
        })
        Citizen.Wait(250)
    end
end)


RegisterNetEvent("jc_hud:updateData")
AddEventHandler("jc_hud:updateData", function(data)
    player_name = data.plyr_name
    player_job = data.plyr_job
    player_gang = data.plyr_gang
    player_img = data.plyr_img
    player_money = data.plyr_cash
    player_id = data.plyr_id
    ping = data.ping
    open_bar = data.open_bar
end)

RegisterCommand("my", function()
    open_bar = true
end, false)


