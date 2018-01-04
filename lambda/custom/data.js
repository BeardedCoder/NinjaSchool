module.exports = {

    'appName': 'Ninja Master',
    'rounds': 2,
    'stages': 3,
    'songs': {
        'intro': 'https://s3.amazonaws.com/asksounds/happyintro.mp3',
        'easy': 'https://s3.amazonaws.com/asksounds/waitingtime1.mp3',
        'medium': 'https://s3.amazonaws.com/asksounds/waitingtime3.mp3',
        'hard': 'https://s3.amazonaws.com/asksounds/waitingtime2.mp3',
        'correct': 'https://s3.amazonaws.com/asksounds/correct1.mp3'
    },
    'ranks': [
        '',
        'Novice {name}',
        'Apprentice {name}',
        '{name} the Great',
        '{name} the Strong',
        'Ranger {name}',
        'Shogun {name}',
        'Master {name}'
    ],
    //Dragonlord, Protector, Ranger, Squire, the Strong
    'tasks': {
        1: [
            {
                'scene': 'A ninja must be limber and loose.',
                'task': 'Touch your toes {reps} times.',
                'taskSingular': 'Touch your toes {reps} time.'
            },
            {
                'scene': 'A ninja must be ready to leap at any moment.',
                'task': 'Jump {reps} times.',
                'taskSingular': 'Jump {reps} time.'
            },
            {
                'scene': 'A ninja must be quick on their toes.',
                'task': 'Do {reps} jumping jacks.',
                'taskSingular': 'Do {reps} jumping jacks.'
            },
            {
                'scene': 'A ninja must be a master of stealth.',
                'task': 'Sneak on your tippy toes for {reps} seconds.',
                'taskSingular': 'Sneak on your tippy toes for {reps} seconds.'
            },
            {
                'scene': 'A ninja must be able to mimic anyone at any time.',
                'task': 'Pretend to be an baby for {reps} seconds.',
                'taskSingular': 'Pretend to be an baby for {reps} seconds.'
            }
        ],
        2: [
            {
                'scene': 'A ninja must be able to get up quickly in case of danger.',
                'task': 'Lie down and then jump up to your feet {reps} times.',
                'taskSingular': 'Lie down and then jump up to your feet {reps} time.'
            },
            {
                'scene': 'A ninja must possess an inner calmness.',
                'task': 'Balance on one foot for {reps} seconds.',
                'taskSingular': 'Balance on one foot for {reps} seconds.'
            },
            {
                'scene': 'A ninja must be explosive and quick.',
                'task': 'Jump up and tuck your knees to your chest {reps} times.',
                'taskSingular': 'Jump up and tuck your knees to your chest {reps} time.'
            },
            {
                'scene': 'A ninja must be like the wind.',
                'task': 'Spin in a cirlce like a tornado {reps} times.',
                'taskSingular': 'Spin in a cirlce like a tornado {reps} time.'
            }
        ],
        3: [
            {
                'scene': 'A ninja must be a master of illusion.',
                'task': 'Pretend to be an adult for {reps} seconds.',
                'taskSingular': 'Pretend to be an adult for {reps} seconds.'
            },
            {
                'scene': 'A ninja must possess an inner calmness.',
                'task': 'Balance on one foot with your hands in the air for {reps} seconds.',
                'taskSingular': 'Balance on one foot  with your hands in the air for {reps} seconds.'
            },
            {
                'scene': 'A ninja must be explosive and quick.',
                'task': 'Jump up and tuck your knees to your chest {reps} times.',
                'taskSingular': 'Jump up and tuck your knees to your chest {reps} time.'
            },
            {
                'scene': 'A ninja must be sneaky.',
                'task': 'Slither on your belly like a snake for {reps} seconds.',
                'taskSingular': 'Slither on your belly like a snake for {reps} seconds.'
            }
        ]
    },
    'speechConsCorrect': [
        'Booya',
        'All righty',
        'Bam',
        'Bazinga',
        'Bingo',
        'Boom',
        'Bravo',
        'Cha Ching',
        'Cheers',
        'Dynomite',
        'Hip hip hooray',
        'Hurrah',
        'Hurray',
        'Huzzah',
        'Oh dear.  Just kidding.  Hurray',
        'Kaboom',
        'Kaching',
        'Oh snap',
        'Phew',
        'Righto',
        'Way to go',
        'Well done',
        'Whee',
        'Woo hoo',
        'Yay',
        'Wowza',
        'Yowsa'
    ],
    'speechConsWrong': [
        'Argh',
        'Aw man',
        'Blarg',
        'Blast',
        'Boo',
        'Bummer',
        'Darn',
        'D\'oh',
        'Dun dun dun',
        'Eek',
        'Honk',
        'Le sigh',
        'Mamma mia',
        'Oh boy',
        'Oh dear',
        'Oof',
        'Ouch',
        'Ruh roh',
        'Shucks',
        'Uh oh',
        'Wah wah',
        'Whoops a daisy',
        'Yikes'
    ]
};