ESX = nil

TriggerEvent("esx:getSharedObject", function(obj)
    ESX = obj
end)


RegisterNetEvent("jc_hud:serverUpdate")
AddEventHandler("jc_hud:serverUpdate", function()

    local source = source
    local xPlayer = ESX.GetPlayerFromId(source)
    local job

    if xPlayer ~= nil then
        if xPlayer.job.label == xPlayer.job.grade_label then
            job = xPlayer.job.grade_label
        else
            job = xPlayer.job.label .. "- " .. xPlayer.job.grade_label
        end

        local info = {
            plyr_id = xPlayer.source,
            plyr_name = xPlayer.getName(),
            plyr_job = job,
            plyr_gang = false,
            plyr_cash = xPlayer.getMoney(),
            ping = GetPlayerPing(source),
            open_bar = false
        }

        TriggerClientEvent("jc_hud:updateData", source, info)
    else
        local info = {
            plyr_id = "N / A",
            plyr_name = "N / A",
            plyr_job = "No Job",
            plyr_gang = false,
            plyr_cash = "N / A",
            ping = "N / A",
            open_bar = false
        }
        TriggerClientEvent("jc_hud:updateData", source, info)
    end
end)
