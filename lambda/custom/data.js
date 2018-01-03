module.exports = {

    'appName': 'Ninja Master',
    'rounds': 2,
    'stages': 2,
    'songs': {
        "intro": "https://s3.amazonaws.com/asksounds/happyintro.mp3",
        "easy": "https://s3.amazonaws.com/asksounds/waitingtime1.mp3",
        "medium": "https://s3.amazonaws.com/asksounds/waitingtime3.mp3",
        "hard": "https://s3.amazonaws.com/asksounds/waitingtime2.mp3",
        "correct": "https://s3.amazonaws.com/asksounds/correct1.mp3"
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
                "scene": "A ninja must be limber and loose.",
                "task": "You must touch your toes {reps} times.",
                "taskSingular": "You must touch your toes {reps} time."
            },
            {
                "scene": "A ninja must be ready to leap at any moment.",
                "task": "You must jump {reps} times.",
                "taskSingular": "You must jump {reps} time."
            },
            {
                "scene": "A ninja must be quick on their toes.",
                "task": "You must do {reps} jumping jacks.",
                "taskSingular": "You must do {reps} jumping jacks."
            }
        ],
        2: [
            {
                "scene": "A ninja must be able to get up quickly in case of danger.",
                "task": "You must lie down and then jump up to your feet {reps} times.",
                "taskSingular": "You must lie down and then jump up to your feet {reps} time."
            },
            {
                "scene": "A ninja must possess an inner calmness.",
                "task": "You must balance on one foot for {reps} seconds.",
                "taskSingular": "You must balance on one foot for {reps} seconds."
            },
            {
                "scene": "A ninja must be explosive and quick.",
                "task": "You must jump up and tuck your knees to your chest {reps} times.",
                "taskSingular": "You must jump up and tuck your knees to your chest {reps} time."
            }
        ]
    },
};