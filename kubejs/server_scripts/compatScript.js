LootJS.modifiers((event) => 
{
    //chocolate
    event.addLootTypeModifier(LootType.CHEST)
      .replaceLoot("mores:chocolate", "create:bar_of_chocolate", true);
    event.addLootTypeModifier(LootType.CHEST)
    .replaceLoot("neapolitan:chocolate_bar", "create:bar_of_chocolate", true);

    //cobalt
    event.addLootTypeModifier(LootType.CHEST)
        .replaceLoot("mores:cobalt_ingot", "tconstruct:cobalt_ingot", true);

    event.addLootTypeModifier(LootType.CHEST)
        .replaceLoot("mores:cobalt_nugget", "tconstruct:cobalt_nugget", true);

        event.addLootTypeModifier(LootType.CHEST)
        .replaceLoot("neapolitan:strawberries", "pamhc2crops:strawberryitem", true);

});

ServerEvents.recipes(event =>
{
    //ORES
    roseQuartzRecipes(event);
    silverRecipes(event);
    cobaltRecipes(event);

    addCrushing(event);
    addAlloys(event);
    addMelting(event);
    addMixing(event);

    //CROPS/ FOOD
    strawberryCompat(event)
    cherryCompat(event)
    grapeCompat(event)
    tomatoCompat(event)
    blueberryCompat(event)
    lemonCompat(event)
    chocolateCompat(event)
    honeyCompat(event)

    dyeCompat(event)

    //some other stuff
    event.replaceInput(
        {id: "createcafe:mixing/blood_tea_mixing"},
        "createcafe:blood_orange",
        "#forge:fruits/blood_orange"
    )
});

ServerEvents.tags('item', event =>
{
    addRemoveTags(event);
});

function roseQuartzRecipes(event)
{
    event.replaceOutput
    (
        {id: 'biomesoplenty:rose_quartz_block'}, 
        'biomesoplenty:rose_quartz_block',
        'create:rose_quartz_block'
    )

    //Replace create quartz w/ bop quartz recipe
    event.replaceOutput
    (
        {id: 'create:crafting/materials/rose_quartz'}, 
        'create:rose_quartz',
        'biomesoplenty:rose_quartz_chunk'
    )

    //Remove create quartz block original recipe
    event.remove({id: 'create:rose_quartz_block_from_rose_quartz_stonecutting'})

    //polished rose quartz block recipesr
    event.remove({id: "create:small_rose_quartz_tiles_from_polished_rose_quartz_stonecutting"})
    event.remove({id: "create:crafting/materials/small_rose_quartz_tilesfrom_conversion"})
    event.remove({id: "create:rose_quartz_tiles_from_polished_rose_quartz_stonecutting"})
    event.remove({id: "create:crafting/materials/rose_quartz_tilesfrom_conversion"})


    event.shaped(
        Item.of('rechiseledcreate:rose_quartz_polished_block', 1), //output
        [
          'QQ',
          'QQ'
        ],
        {
          Q: "create:polished_rose_quartz"
        }
    )

    //Add quartz cutting board recipes
    var blocks =
    {
        "create:rose_quartz_block": "biomesoplenty:rose_quartz_chunk",
        "rechiseledcreate:rose_quartz_polished_block": "create:polished_rose_quartz",
        "botania:mana_quartz": "botania:quartz_mana",
        "botania:red_quartz": "botania:quartz_red",
        "botania:elf_quartz": "botania:quartz_elven",
        "botania:sunny_quartz": "botania:quartz_sunny",
        "botania:dark_quartz": "botania:quartz_dark",
        "botania:lavender_quartz": "botania:quartz_lavender",

    }

    for (const [block, result] of Object.entries(blocks))
    {
        event.custom(
        {
            "type": "farmersdelight:cutting",
            "ingredients": [
                {
                "item": block
                }
            ],
            "result": [
                {
                "count": 4,
                "item": result
                }
            ],
            "tool": {
                "type": "farmersdelight:tool_action",
                "action": "pickaxe_dig"
            }
        });
    }

}

function addRemoveTags(event)
{
    var tags =
    {
        //SILVER
        "forge:ores/silver": 
        {
            "add": ["mores:silver_ore", "mores:deepslate_silver_ore", "mores:nether_silver_ore"], 
            "remove": ["galosphere:silver_ore", "galosphere:deepslate_silver_ore"]
        },
        "forge:storage_blocks/silver_block":
        {
            "add": ["mores:silver_block"],
            "remove": ["galosphere:silver_block"]
        },
        "forge:storage_blocks/silver":
        {
            "add": ["mores:silver_block"],
            "remove": ["galosphere:silver_block"]
        },
        "forge:storage_blocks/raw_silver_block":
        {
            "add": ["mores:raw_silver_block"],
            "remove": ["galosphere:raw_silver_block"]
        },
        "forge:raw_materials/raw_silver":
        {
            "add": ["mores:raw_silver"],
            "remove": ["galosphere:raw_silver"]
        },
        "forge:raw_materials/silver":
        {
            "add": ["mores:raw_silver"],
            "remove": ["galosphere:raw_silver"]
        },
        "forge:nuggets/silver":
        {
            "add": ["mores:silver_nugget"],
            "remove": ["galosphere:silver_nugget"]
        },
        "forge:ingots/silver":
        {
            "add": ["mores:silver_ingot"],
            "remove": ["galosphere:silver_ingot"]
        },

        //COBALT
        "forge:ingots/cobalt":
        {
            "remove": ["mores:cobalt_ingot"]
        },
        "forge:nuggets/cobalt":
        {
            "remove": ["mores:cobalt_nugget"]
        },

        //ROSE QUARTZ
        "forge:gems/rose_quartz":
        {
            "remove": ["create:rose_quartz"]
        },

        //BRONZE
        "forge:storage_blocks/bronze":
        {
            "add": ["mores:bronze_block"]
        },

        //STEEL
        "forge:storage_blocks/steel":
        {
            "add": ["mores:steel_block"]
        },

        //TIN
        "forge:nuggets/tin":
        {
            "add": ["mores:tin_nugget"]
        },
        "forge:ingots/tin":
        {
            "add": ["mores:tin_ingot"]
        },
        "forge:storage_blocks/tin":
        {
            "add": ["mores:tin_block"]
        },
        "forge:storage_blocks/tin_block":
        {
            "add": ["mores:tin_block"]
        },
        "forge:storage_blocks/raw_tin":
        {
            "add": ["mores:raw_tin_block"]
        },
        "forge:raw_materials/tin":
        {
            "add": ["mores:raw_tin"]
        },
        "forge:raw_materials/raw_tin":
        {
            "add": ["mores:raw_tin"]
        },
        "forge:ores/tin":
        {
            "add": ["mores:tin_ore", "mores:deepslate_tin_ore"]
        },
        //OBSIDIAN
        "forge:ingots/obsidian":
        {
            "add": ["mores:obsidian_ingot"]
        },

        //LIMESTONE
        "cherrycraft:stone/limestone":
        {
            "add": ["meadow:limestone", "create:limestone", "quark:limestone"]
        },

        //BACON
        "cherrycraft:food/raw_bacon":
        {
            "add": ["farmersdelight:bacon", "pamhc2foodextended:rawtofaconitem"]
        },
        "cherrycraft:food/bacon":
        {
            "add": ["farmersdelight:cooked_bacon", "pamhc2foodextended:cookedtofaconitem"]
        },

        //CHERRY
        "cherrycraft:food/cherry":
        {
            "add": ["pamhc2trees:cherryitem", "vinery:cherry"]
        },

        //GRAPE
        "cherrycraft:food/red_grapes":
        {
            "add": ["pamhc2crops:grapeitem", "vinery:red_grape", "vinery:savanna_grapes_red", "vinery:taiga_grapes_red", "vinery:jungle_grapes_red"]
        },
        "cherrycraft:food/green_grapes":
        {
            "add": ["pamhc2crops:greengrapeitem", "vinery:white_grape", "vinery:savanna_grapes_white", "vinery:taiga_grapes_white", "vinery:jungle_grapes_white"]
        },

        //CABBAGE
        "cherrycraft:food/cabbage_head":
        {
            "add": ["farmersdelight:cabbage", "pamhc2crops:cabbageitem"]
        },

        //BLOOD ORANGE
        "forge:fruits/blood_orange":
        {
            "add": ["atmospheric:blood_orange", "createcafe:blood_orange"]
        }

    }

    for(const [tag, items] of Object.entries(tags))
    {
        if (Object.keys(items).includes("add"))
        {
            for(const item of items.add)
            {
                event.add(tag, item)
            }
        }
        
        if (Object.keys(items).includes("remove"))
        {
            for(const item of items.remove)
            {
                event.remove(tag, item)
            }
        }
    }


}

function silverRecipes(event)
{
    event.replaceInput
    (
        {input: 'galosphere:silver_nugget'}, 
        'galosphere:silver_nugget',
        '#forge:nuggets/silver'
    )
    event.remove({id: 'galosphere:silver_nuggets'})


    event.replaceInput
    (
        {input: 'galosphere:silver_ingot'}, 
        'galosphere:silver_ingot',
        '#forge:ingots/silver'
    )
    event.remove({id: 'galosphere:silver_ingot_from_nuggets'})
    event.remove({id: 'galosphere:silver_ingot'})

    
    event.replaceInput
    (
        {input: 'galosphere:silver_block'}, 
        'galosphere:silver_block',
        '#forge:storage_blocks/silver'
    )
    event.remove({id: 'galosphere:silver_block'})


    event.replaceInput
    (
        {input: 'galosphere:raw_silver'}, 
        'galosphere:raw_silver',
        '#forge:raw_materials/raw_silver'
    )
    event.remove({id: 'galosphere:raw_silver'})


    event.replaceInput
    (
        {input: 'galosphere:raw_silver_block'}, 
        'galosphere:raw_silver_block',
        '#forge:storage_blocks/raw_silver_block'
    )
    event.remove({id: 'galosphere:raw_silver_block'})

    //remove original crushing recipes
    event.remove({id: "create:crushing/silver_ore"})

}

function cobaltRecipes(event)
{
    event.remove({id: "mores:cobalt_ingot_from_nuggets"});
    event.remove({id: "mores:cobalt_ingot_from_cobalt_block"});
    event.remove({id: "mores:cobalt_block"});
    event.remove({id: "mores:raw_cobalt_from_raw_cobalt_block"});
    event.remove({id: "mores:raw_cobalt"});
    event.remove({id: "mores:cobalt_nugget"});

}

function addCrushing(event)
{
    //ore, raw material, stone
    var ores =
    {
        //~~~~~~~~~~ MORES ~~~~~~~~~~
        //cobalt
        'tconstruct:cobalt_ore': ['tconstruct:raw_cobalt', 'minecraft:netherrack'],
        
        //silver
        'mores:silver_ore': ['create:crushed_raw_silver', 'minecraft:cobblestone'],
        'mores:deepslate_silver_ore': ['create:crushed_raw_silver', 'minecraft:cobbled_deepslate'],
        'mores:nether_silver_ore': ['mores:silver_nugget', 'minecraft:netherrack'],
        
        //Anthracite
        "mores:anthracite_ore": ["mores:anthracite", "minecraft:cobblestone"],
        "mores:deepslate_anthracite_ore": ["mores:anthracite", "minecraft:cobbled_deepslate"],
        "mores:nether_anthracite_ore": ["mores:anthracite", "minecraft:netherrack"],

        //tourmaline
        "mores:tourmaline_ore": ["mores:tourmaline_gem", "minecraft:cobblestone"],
        "mores:deepslate_tourmaline_ore": ["mores:tourmaline_gem", "minecraft:cobbled_deepslate"],
        "mores:nether_tourmaline_ore": ["mores:tourmaline_gem", "minecraft:netherrack"],

        //Topaz
        "mores:topaz_ore": ["mores:topaz_gem", "minecraft:cobblestone"],
        "mores:deepslate_topaz_ore": ["mores:topaz_gem", "minecraft:cobbled_deepslate"],
        "mores:nether_topaz_ore": ["mores:topaz_gem", "minecraft:netherrack"],

        //ruby
        "mores:ruby_ore": ["mores:ruby_gem", "minecraft:cobblestone"],
        "mores:deepslate_ruby_ore": ["mores:ruby_gem", "minecraft:cobbled_deepslate"],
        "mores:nether_ruby_ore": ["mores:ruby_gem", "minecraft:netherrack"],

        //sapphire
        "mores:sapphire_ore": ["mores:sapphire_gem", "minecraft:cobblestone"],
        "mores:deepslate_sapphire_ore": ["mores:sapphire_gem", "minecraft:cobbled_deepslate"],
        "mores:nether_sapphire_ore": ["mores:sapphire_gem", "minecraft:netherrack"],

        //mossanite
        "mores:mossanite_ore": ["mores:mossanite_gem", "minecraft:cobblestone"],
        "mores:deepslate_mossanite_ore": ["mores:mossanite_gem", "minecraft:cobbled_deepslate"],

        //turquoise
        "mores:turquoise_ore": ["mores:turquoise_gem", "minecraft:cobblestone"],
        "mores:deepslate_turquoise_ore": ["mores:turquoise_gem", "minecraft:cobbled_deepslate"],

        //tanzanite
        "mores:nether_tanzanite_ore": ["mores:tanzanite_gem", "minecraft:netherrack"],

        //onyx
        "mores:onyx_ore": ["mores:onyx_gem", "minecraft:end_stone"],

        //~~~~~~~~~~ UNDERGARDEN ~~~~~~~~~~
        "undergarden:depthrock_coal_ore": ["minecraft:coal", "undergarden:depthrock"],
        "undergarden:shiverstone_coal_ore": ["minecraft:coal", "undergarden:shiverstone"],

        "undergarden:depthrock_iron_ore": ["minecraft:iron_nugget", "undergarden:depthrock"],
        "undergarden:shiverstone_iron_ore": ["minecraft:iron_nugget", "undergarden:shiverstone"],

        "undergarden:depthrock_gold_ore": ["minecraft:gold_nugget", "undergarden:depthrock"],
        "undergarden:shiverstone_gold_ore": ["minecraft:gold_nugget", "undergarden:shiverstone"],

        "undergarden:depthrock_diamond_ore": ["minecraft:diamond", "undergarden:depthrock"],
        "undergarden:shiverstone_diamond_ore": ["minecraft:diamond", "undergarden:shiverstone"],

        "undergarden:depthrock_cloggrum_ore": ["undergarden:raw_cloggrum", "undergarden:depthrock"],
        "undergarden:shiverstone_cloggrum_ore": ["undergarden:raw_cloggrum", "undergarden:shiverstone"],

        "undergarden:shiverstone_froststeel_ore": ["undergarden:raw_froststeel", "undergarden:shiverstone"],

        "undergarden:depthrock_utherium_ore": ["undergarden:utherium_crystal", "undergarden:depthrock"],
        "undergarden:shiverstone_utherium_ore": ["undergarden:utherium_crystal", "undergarden:shiverstone"],

        "undergarden:depthrock_regalium_ore": ["undergarden:regalium_crystal", "undergarden:depthrock"],
        "undergarden:shiverstone_regalium_ore": ["undergarden:regalium_crystal", "undergarden:shiverstone"],

        //~~~~~~~~~~ MIDNIGHT ~~~~~~~~~~

        "midnight:dark_pearl_ore": ["midnight:dark_pearl", "midnight:nightstone"],
        "midnight:rendium_ore": ["midnight:rendium_fragment", "midnight:nightstone"],
        "midnight:archaic_ore": ["midnight:archaic_shard", "midnight:nightstone"],
        "midnight:tenebrum_ore": ["midnight:raw_tenebrum", "midnight:nightstone"],
        "midnight:nagrilite_ore": ["midnight:raw_nagrilite", "midnight:nightstone"],
        "midnight:ebonite_ore": ["midnight:ebonite", "midnight:nightstone"],
        "midnight:virilux_ore": ["midnight:virilux", "midnight:nightstone"],

        //~~~~~~~~~~ MEADOW ~~~~~~~~~~
        "meadow:alpine_salt_ore": ["meadow:alpine_salt", "meadow:limestone"],
        "meadow:alpine_coal_ore": ["minecraft:coal", "meadow:limestone"],
        "meadow:alpine_gold_ore": ["create:crushed_raw_gold", "meadow:limestone"],
        "meadow:alpine_emerald_ore": ["minecraft:emerald", "meadow:limestone"],
        "meadow:alpine_iron_ore": ["create:crushed_raw_iron", "meadow:limestone"],
        "meadow:alpine_copper_ore": ["create:crushed_raw_copper", "meadow:limestone"],
        "meadow:alpine_diamond_ore": ["minecraft:diamond", "meadow:limestone"],
    };

    for(const [ingredient, results] of Object.entries(ores))
    {
        var rawMaterial  = results[0];
        var stone = results[1];
        var bonusChance = 0.75;
        var amount = "";

        //deepslate
        if(stone == "minecraft:cobbled_deepslate")
        {
            amount = "2x ";
            bonusChance = 0.25; //decrease bonus chance
        }
        
        var outputArr = 
        [
            amount + rawMaterial,
            Item.of(rawMaterial).withChance(bonusChance),
            Item.of('create:experience_nugget').withChance(0.75),
            Item.of(stone).withChance(0.12)
        ]

        //if product is nugget
        if(/.+_nugget/.test(rawMaterial))
        {
            outputArr[0] = "12x " + rawMaterial; //12 nuggets
            outputArr.splice(1, 1); //remove bonus output
        }

        event.recipes.create.crushing(
            outputArr,
            ingredient) //input
    }

    //Midnight geode
    event.recipes.create.crushing(
        ["midnight:rendium_fragment", Item.of('create:experience_nugget').withChance(0.75),],
        "midnight:geode") //input

    //alpine lapis
    event.recipes.create.crushing(
        ["10x minecraft:lapis_lazuli", Item.of("minecraft:lapis_lazuli").withChance(0.50), Item.of('create:experience_nugget').withChance(0.75), Item.of("meadow:limestone").withChance(0.12)],
        "meadow:alpine_lapis_ore") //input

    //alpine restone
    event.recipes.create.crushing(
        ["6x minecraft:redstone", Item.of("minecraft:redstone").withChance(0.50), Item.of('create:experience_nugget').withChance(0.75), Item.of("meadow:limestone").withChance(0.12)],
        "meadow:alpine_redstone_ore") //input

}

function addAlloys(event)
{
    event.remove({id: "mores:alloy_furnace"})

    var alloys = 
    [
        //STERLING SILVER
        {
            fluid: "kubejs:molten_sterling_silver",
            recipe:
            { 
                type: "tconstruct:alloy",
                inputs: [{amount: 90, tag: "tconstruct:molten_silver"}, {amount: 90, tag: "tconstruct:molten_copper"}],
                result: {amount: 90, fluid: 'kubejs:molten_sterling_silver'},
                temperature: 790
            },
            casting: ["mores:sterling_ingot", "mores:sterling_nugget", "mores:sterling_block"]
        },
        //OBSIDIAN INGOT
        {
            fluid: "tconstruct:molten_obsidian",
            casting: ["mores:obsidian_ingot"]
        },
    ]

    for(const alloy of alloys)
    {
        //alloy recipe
        if(alloy.recipe != null)
            event.custom(alloy.recipe);

        //gold and sand casts
        const castTags = ["multi", "single"]

        //all results
        for(const output of alloy.casting)
        {
            var resultType;
            var coolingTime;
            var fluidAmount;

            if(/.+_ingot/.test(output))
            {
                resultType = "ingot";
                coolingTime = 60;
                fluidAmount = 90;
            }
            else if(/.+_nugget/.test(output))
            {
                resultType = "nugget";
                coolingTime = 20;
                fluidAmount = 10;
            }
            //block ==> use basin
            else if (/.+_block/.test(output))
            {
                event.custom(
                {
                    type: "tconstruct:casting_basin",
                    cooling_time: 180,
                    fluid: {amount: 810, name: alloy.fluid},
                    result: output
                })
                continue;
            }

            //not block ==> both types of casts
            for (const castTag of castTags)
            {
                //cast consumed if single use (sand) cast
                var castConsumed = castTag == "single";

                //add casting recipe
                event.custom(
                {
                    type: "tconstruct:casting_table",
                    cast: {tag: `tconstruct:casts/${castTag}_use/${resultType}`},
                    cast_consumed: castConsumed,
                    cooling_time: coolingTime,
                    fluid:{amount: fluidAmount, name: alloy.fluid},
                    result: output
                });
            }
        }
    }
}

function addMelting(event)
{
    const vars = 
    {
        "nugget": {fluidAmount: 10, time: 20},
        "ingot": {fluidAmount: 90, time: 60},
        "block": {fluidAmount: 810, time: 180},
        "horse_armor": {fluidAmount: 630, time:151},
        "apple": {fluidAmount: 720, time: 161},

        "pickaxe": {fluidAmount: 720, time: 99, unitSize: 10},
        "axe": {fluidAmount: 720, time: 99, unitSize: 10},
        "shovel": {fluidAmount: 90, time:60, unitSize: 10},
        "sword": {fluidAmount: 180, time:80, unitSize: 10},
        "hoe": {fluidAmount: 180, time:80, unitSize: 10},
        "helmet": {fluidAmount: 450, time:130, unitSize: 10},
        "chestplate": {fluidAmount: 720, time:16, unitSize: 10},
        "leggings": {fluidAmount: 630, time:151, unitSize: 10},
        "boots": {fluidAmount: 360, time:114, unitSize: 10},

        "battleaxe": {fluidAmount: 360, time:114, unitSize: 10},
        "mace": {fluidAmount: 360, time:114, unitSize: 10},
        "dagger": {fluidAmount: 90, time:60, unitSize: 10},
        "shield": {fluidAmount: 90, time:60, unitSize: 10},
    }

    const materials = 
    [
        {
            fluid: "kubejs:molten_sterling_silver",
            prefix: "mores:sterling_",
            melting: ["nugget", "ingot", "block"],
            temp: 790
        },
        {
            fluid: "tconstruct:molten_bronze",
            prefix: "mores:bronze_",
            melting: ["nugget", "ingot", "block"],
            temp: 700
        },
        {
            fluid: "tconstruct:molten_obsidian",
            prefix: "mores:obsidian_",
            melting: ["ingot"],
            temp: 1000
        }
    ]

    for(const material of materials)
    {
        if(material.melting != null)
        {
            for(const item of material.melting)
            {
                var itemName = material.prefix + item;

                event.custom(
                {
                    type: "tconstruct:melting",
                    ingredient: {item: itemName},
                    result: {amount: vars[item].fluidAmount, fluid: material.fluid},
                    temperature: material.temp,
                    time: vars[item].time
                })
            }
        }

        if(material.damagableMelting != null)
        {
            for(const item of material.damagableMelting)
            {
                var itemName = material.prefix + item;

                event.custom(
                {
                    type: "tconstruct:damagable_melting",
                    ingredient: {item: itemName},
                    result: {amount: vars[item].fluidAmount, fluid: material.fluid, unit_size: vars[item].unitSize},
                    temperature: material.temp,
                    time: vars[item].time
                })
            }
        }
    }
}

function addMixing(event)
{
    event.recipes.create.mixing(
        Fluid.of('tconstruct:molten_steel', 90),
        [Fluid.of('tconstruct:molten_iron', 90), "minecraft:coal"])
        .heated();
    event.recipes.create.mixing(
        'mores:graphene_gem',
        ['mores:turquoise_gem', 'mores:onyx_gem'])
        .heated();
}

function strawberryCompat(event)
{
    event.replaceInput
    (
        {input: 'pamhc2foodcore:chocolatebaritem'}, 
        "pamhc2foodcore:chocolatebaritem",
        'create:bar_of_chocolate'
    )
    event.remove({id: "pamhc2foodcore:chocolatebaritem"})
    event.remove({id: "mores:chocolate"})


    event.replaceInput
    (
        {input: 'neapolitan:chocolate_bar'}, 
        'neapolitan:chocolate_bar',
        'create:bar_of_chocolate'
    )
    event.replaceOutput
    (
        {id: 'neapolitan:chocolate/chocolate_bar_from_chocolate_block'}, 
        'neapolitan:chocolate_bar',
        'create:bar_of_chocolate'
    )
    event.remove({id: "neapolitan:chocolate/chocolate_bar"})
    event.remove({id: "neapolitan:mixed/chocolate_strawberries"})

    //chocolate strawberry
    event.recipes.create.filling(
        "pamhc2foodextended:chocolatestrawberryitem", //output
        [Fluid.of("create:chocolate", 250), "pamhc2crops:strawberryitem"]

    )
    event.remove({id: "pamhc2foodextended:chocolatestrawberryitem"})

    //strawberry jam bun
    event.remove("collectorsreap:food/strawberry_jam_bun")
    event.shapeless(
        Item.of("collectorsreap:strawberry_jam_bun"), //output
        [
          '#forge:dough', //inputs
          '#collectorsreap:lime_or_slice',
          'bakery:strawberry_jam'
        ]
    )

    //remove neapolitan strawberries
    event.replaceInput(
        {id: 'neapolitan:mixed/strawberry_bean_bonbons'}, 
        'neapolitan:strawberries',
        'pamhc2crops:strawberryitem'
    )
    event.replaceInput(
        {id: 'collectorsreap:gummy/strawberry'}, 
        'neapolitan:strawberries',
        'pamhc2crops:strawberryitem'
    )
    event.remove("collectorsreap:integration/create/mixing/gummy/strawberry")
    event.remove({id: "neapolitan:strawberry/strawberry_pips"})
    event.remove({id: "neapolitan:strawberry/strawberry_pips_from_white_strawberries"})

    //BAKERY
    event.remove({id: "bakery:strawberry_seeds"})

    //strawberry jam
    event.custom(
    {
        "type": "bakery:pot_cooking",
        "ingredients":  [{"item": "pamhc2crops:strawberryitem"}, {"item": "minecraft:sugar"}],
        "container": {"item": "bakery:jar"},
        "result": {"item": "bakery:strawberry_jam"}
    });
    event.remove({id: "bakery:pot_cooking/strawberry_jam"})

    //linzer tart
    event.custom(
    {
        "type": "bakery:stove",
        "ingredients": [{"item": "pamhc2crops:strawberryitem"},{"item": "bakery:sweet_dough"},{"item": "minecraft:sugar"}],
        "item": "bakery:linzer_tart",
        "count": 1,
        "experience": 0.35
        }
    )

    event.replaceOutput(
        {id: 'bakery:strawberry_from_crate'}, 
        'bakery:strawberry',
        'pamhc2crops:strawberryitem'
    )
    event.replaceInput(
        {id: 'bakery:strawberry_crate'}, 
        'bakery:strawberry',
        'pamhc2crops:strawberryitem'
    )
}

function cherryCompat(event)
{
    //remove seed delight cherries
    event.replaceInput(
        {input: "seeddelight:cherry"},
        "seeddelight:cherry",
        "#cherrycraft:food/cherry"
    )

    event.shapeless(
    Item.of("pamhc2trees:cherryitem", 9), //output
    [
        'seeddelight:cherry_crate', //inputs
    ])

    //replace pam's cherries w/ cherry tag
    const recipes = 
    [
        "pamhc2foodextended:pineappleupsidedowncakeitem",
        "pamhc2foodextended:cherrysodaitem",
        "pamhc2foodextended:cherrycoconutchocolatebaritem",
        "pamhc2foodextended:cherrysmoothieitem",
        "pamhc2foodextended:holidaycakeitem",
        "pamhc2foodextended:cherryyogurtitem",
        "pamhc2foodextended:cherryjuiceitem",
        "pamhc2foodextended:fruitcakeitem",
        "pamhc2foodextended:meringuebombeitem",
        "pamhc2foodextended:cherrypieitem",
        "pamhc2foodextended:cherryicecreamitem",
        "pamhc2foodextended:cherryjellyitem",
        "pamhc2foodextended:pineapplehamitem",
        "createcafe:mixing/cherry_tea_mixing"
    ]

    for(const recipe of recipes)
    {
        event.replaceInput(
            {id: recipe}, 
            'pamhc2trees:cherryitem',
            '#cherrycraft:food/cherry'
        ) 
    }
    event.replaceInput(
        {id: "seeddelight:m_cherry_crate"}, 
        '#cherrycraft:food/cherry',
        'pamhc2trees:cherryitem'   
    ) 

    //chocolate covered cherry
    event.recipes.create.filling(
        "pamhc2foodextended:chocolatecherryitem", //output
        [Fluid.of("create:chocolate", 250), "#cherrycraft:food/cherry"]

    )
    event.remove("pamhc2foodextended:chocolatecherryitem")
}

function grapeCompat(event)
{
    const recipes = 
    [
        "pamhc2foodextended:grapejellyitem",
        "pamhc2foodextended:raisinsitem",
        "pamhc2foodextended:grapesodaitem",
        "pamhc2foodextended:grapepieitem",
        "pamhc2foodextended:grapesmoothieitem",
        "pamhc2foodextended:grapeyogurtitem",
        "pamhc2foodextended:grapejuiceitem",
        "createcafe:mixing/grapes_tea_mixing",
        "createcafe:mixing/grape_tea_mixing"
    ]

    for(const recipe of recipes)
    {
        event.replaceInput(
            {id: recipe}, 
            'pamhc2crops:grapeitem',
            '#cherrycraft:food/red_grapes'
        ) 
    }

    const recipes2 = 
    [
        "pamhc2foodextended:greengrapejellyitem",
        "pamhc2foodextended:greengrapepieitem",
        "pamhc2foodextended:greengrapesmoothieitem",
        "pamhc2foodextended:greengrapeyogurtitem",
        "pamhc2foodextended:greengrapejuiceitem",
    ]

    for(const recipe of recipes2)
    {
        event.replaceInput(
            {id: recipe}, 
            'pamhc2crops:greengrapeitem',
            '#cherrycraft:food/green_grapes'
        ) 
    }

}

function tomatoCompat(event)
{
    event.remove({id: "candlelight:seeds_tomato"});
    event.replaceInput(
        {id: "candlelight:tomato_crate"},
        "candlelight:tomato",
        "pamhc2crops:tomatoitem"
    )
    event.replaceOutput(
        {id: "candlelight:tomato"},
        "candlelight:tomato",
        "pamhc2crops:tomatoitem"
    )
    event.replaceInput(
        {id: "culturaldelights:smelting/smoked_tomato"},
        "farmersdelight:tomato",
        "#forge:crops/tomato"    
    )

    //cabbage
    event.replaceInput(
        {id: "farmersdelight:cutting/cabbage"},
        "farmersdelight:cabbage",
        "#cherrycraft:food/cabbage_head"    
    )
    event.replaceInput(
        {id: "farmersdelight:integration/create/mixing/cabbage_slice_from_mixing"},
        "farmersdelight:cabbage",
        "#cherrycraft:food/cabbage_head"    
    )
}

function blueberryCompat(event)
{
    event.replaceInput(
        {id: "createcafe:mixing/blueberry_tea_mixing"},
        "pamhc2crops:blueberryitem",
        "#forge:fruits/blueberries"
    )
    event.replaceInput(
        {id: "createcafe:mixing/blueberries_tea_mixing"},
        "pamhc2crops:blueberryitem",
        "#forge:fruits/blueberries"
    )
}

function lemonCompat(event)
{
    const recipes = 
    [
        "pamhc2foodextended:tortillachipsitem",
        "pamhc2foodextended:pahthaiitem",
        "pamhc2foodextended:keylimepieitem",
        "pamhc2foodextended:salsaitem",
        "pamhc2foodextended:creamofavocadosoupitem"
    ]

    for(const recipe of recipes)
    {
        event.replaceInput(
            {id: recipe}, 
            'pamhc2trees:limeitem',
            '#forge:fruits/lime'
        ) 
    }
}

function chocolateCompat(event)
{
    //some is in strawberriesCompat
    event.recipes.create.filling(
        "neapolitan:vanilla_chocolate_fingers", //output
        [Fluid.of("create:chocolate", 250), "neapolitan:dried_vanilla_pods"]

    )
    event.remove({id: "neapolitan:mixed/vanilla_chocolate_fingers"})

    event.recipes.create.filling(
        "neapolitan:mint_chocolate", //output
        [Fluid.of("create:chocolate", 250), "neapolitan:mint_leaves"]

    )
    event.remove({id: "neapolitan:mixed/mint_chocolate"})

    event.recipes.create.filling(
        "neapolitan:chocolate_spider_eye", //output
        [Fluid.of("create:chocolate", 250), "minecraft:spider_eye"]

    )
    event.remove({id: "neapolitan:chocolate/chocolate_spider_eye"})
    
    event.recipes.create.filling(
        "pamhc2foodcore:chocolatebaconitem", //output
        [Fluid.of("create:chocolate", 250), "#cherrycraft:food/bacon"]

    )
    event.remove({id: "pamhc2foodcore:chocolatebaconitem"})
    
    event.recipes.create.filling(
        "twilightdelight:chocolate_113", //output
        [Fluid.of("create:chocolate", 250), "twilightdelight:experiment_113"]

    )
    event.remove({id: "twilightdelight:chocolate_113"})
    
    event.recipes.create.filling(
        "pamhc2foodextended:chocolateorangeitem", //output
        [Fluid.of("create:chocolate", 250), "pamhc2trees:orangeitem"]

    )
    event.remove({id: "pamhc2foodextended:chocolateorangeitem"})
    
    event.recipes.create.filling(
        "pamhc2foodcore:chocolatecaramelfudgeitem", //output
        [Fluid.of("create:chocolate", 250), "create_confectionery:bar_of_caramel"]

    )
    event.remove({id: "pamhc2foodcore:chocolatecaramelfudgeitem"})
    
    event.recipes.create.filling(
        "pamhc2foodextended:chocolatecoconutbaritem", //output
        [Fluid.of("create:chocolate", 250), "pamhc2trees:coconutitem"]

    )
    event.remove({id: "pamhc2foodextended:chocolatecoconutbaritem"})
    
    event.recipes.create.filling(
        "pamhc2foodextended:chilichocolateitem", //output
        [Fluid.of("create:chocolate", 250), "pamhc2crops:chilipepperitem"]

    )
    event.remove({id: "pamhc2foodextended:chilichocolateitem"})

    event.recipes.create.filling(
        "pamhc2foodextended:chocolatepeanutbutteritem", //output
        [Fluid.of("create:chocolate", 250), "pamhc2crops:peanutitem"]

    )
    event.remove({id: "pamhc2foodextended:chocolatepeanutbutteritem"})

    event.recipes.create.filling(
        "pamhc2foodextended:honeycombchocolatebaritem", //output
        [Fluid.of("create:chocolate", 250), "minecraft:honeycomb"]

    )
    event.remove({id: "pamhc2foodextended:honeycombchocolatebaritem"})
}

function honeyCompat(event)
{
    event.remove("buzzier_bees:honey/honey_apple");

    const recipes =
    [
        {
            recipeId: "buzzier_bees:honey/glazed_porkchop",
            ingredient: "minecraft:cooked_porkchop",
            output: "buzzier_bees:glazed_porkchop"
        },
        {
            recipeId: "buzzier_bees:honey/honey_bread",
            ingredient: "minecraft:bread",
            output: "buzzier_bees:honey_bread"
        },
        {
            recipeId: "delightful:food/honey_glazed_walnut",
            ingredient: "pamhc2trees:walnutitem",
            output: "delightful:honey_glazed_walnut",
            amount: 125
        },
        {
            recipeId: "twilightdelihgt:honey_113",
            ingredient: "twilightdelight:experiment_113",
            output: "twilightdelihgt:honey_113",
        },
    ]

    for(const recipe of recipes)
    {
        var amount;
        if(recipe.amount == null)
            amount = 250;
        else
            amount = recipe.amount;

        event.recipes.create.filling(
            recipe.output, //output
            [Fluid.of("create:honey", amount), recipe.ingredient]
    
        )
        event.remove({id: recipe.recipeId})
    }

    //caramel
    event.remove({output: "corn_delight:caramel_popcorn"})
    event.recipes.create.filling(
        "corn_delight:caramel_popcorn", //output
        [Fluid.of("create_confectionery:caramel", 250), "corn_delight:popcorn"]

    )

    event.remove({id: "pamhc2foodcore:caramelappleitem"})
    event.remove({id: "pamhc2foodcore:caramelitem"})

    event.replaceInput(
        {input: "pamhc2foodcore:caramelitem"},
        "pamhc2foodcore:caramelitem",
        "create_confectionery:bar_of_caramel"
    )
}

function dyeCompat(event)
{
    //lavender
    event.replaceInput(
        {id: "pamhc2foodextended:lavendershortbreaditem"},
        "minecraft:purple_dye",
        "dyenamics:lavender_dye"
    )
    event.replaceOutput(
        {id: "biomesoplenty:purple_dye_from_lavender"},
        "minecraft:purple_dye",
        "dyenamics:lavender_dye"
    )
    event.replaceOutput(
        {id: "biomesoplenty:purple_dye_from_tall_lavender"},
        "minecraft:purple_dye",
        "dyenamics:lavender_dye"
    )
    event.replaceOutput(
        {id: "herbalbrews:purple_dye_from_lavender"},
        "minecraft:purple_dye",
        "dyenamics:lavender_dye"
    )

    //mint
    event.replaceOutput(
        {id: "delightful:integration/neapolitan/lime_dye_from_mint"},
        "minecraft:lime_dye",
        "dyenamics:mint_dye"
    )

    //peach
    event.shapeless(
        Item.of("dyenamics:peach_dye"), //output
        [
          "pamhc2trees:peachitem"
        ]
    )

    //persimmon
    event.shapeless(
        Item.of("dyenamics:persimmon_dye"), //output
        [
          "pamhc2trees:persimmonitem"
        ]
    )
    

}