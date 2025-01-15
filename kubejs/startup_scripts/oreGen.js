 // priority: 0 

 WorldgenEvents.remove(event => { var rcOreList =
[

	'galosphere:silver_ore',
    'galosphere:deepslate_silver_ore',
    'mores:cobalt_ore',
    'mores:deepslate_cobalt_ore'

];

    event.removeOres(props =>
    {

        props.blocks = rcOreList		

    });
});