
ItemEvents.tooltip(event =>
{  
    addDisabledToolTip(event);
})

var disabledItems = 
[
    ['create:rose_quartz', "Replaced with Biomes O' Plenty rose quartz chunk"],
    ['mores:cobalt_ore', 'Replaced with Tinkers Construct cobalt'],
    ['mores:deepslate_cobalt_ore', 'Replaced with Tinkers Construct cobalt'],
    ['mores:raw_cobalt', 'Replaced with Tinkers Construct cobalt'],
    ['mores:cobalt_ingot', 'Replaced with Tinkers Construct cobalt'],
    ['mores:cobalt_block', 'Replaced with Tinkers Construct cobalt'],
    ['mores:raw_cobalt_ore', 'Replaced with Tinkers Construct cobalt'],
    ['mores:cobalt_nugget', 'Replaced with Tinkers Construct cobalt'],
    ['mores:alloy_furnace', 'Replaced with Tinkers Smeltery & Create Mixer']
    ['mores:chocolate', 'Replaced with Create bar of chocolate']

]


function addDisabledToolTip(event)
{
    for(let item of disabledItems)
    {
        var tooltip = "DISABLED: " + item[1];
        event.add(item[0], Text.red(tooltip));
    }
}