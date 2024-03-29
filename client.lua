local thirst = nil -- integer
local hunger = nil -- integer
local player_name = nil -- String
local player_job_kay = nil -- String Job Key 
local player_gang = false -- False or True
local player_money = nil -- integer
local player_id = nil -- String or integer
local player_ping = nil -- integer
local open_bar = false -- False or True

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
        update_hungerThirst()
        if IsControlPressed(1, 39) then
            open_bar = true
        end
        SendNUIMessage({
            health = GetEntityHealth(PlayerPedId()),
            armour = GetPedArmour(PlayerPedId()),
            plyr_id = player_id,
            plyr_thirst = thirst,
            plyr_hunger = hunger,
            plyr_name = player_name,
            plyr_job_kay = player_job_kay,
            plyr_gang = player_gang,
            plyr_cash = player_money,
            plyr_ping = player_ping,
            open_bar = open_bar,
            hhud = IsPauseMenuActive()
        })
        Citizen.Wait(250)
    end
end)


RegisterNetEvent("jc_hud:updateData")
AddEventHandler("jc_hud:updateData", function(data)
    player_name = data.plyr_name
    player_job_kay = data.plyr_job
    player_gang = data.plyr_gang
    player_money = data.plyr_cash
    player_id = data.plyr_id
    player_ping = data.ping
    open_bar = data.open_bar
end)

RegisterCommand("my", function()
    open_bar = true
end, false)


