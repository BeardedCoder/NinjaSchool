module.exports = {

    'appName': 'Ninja Master',
    'helpText': "You can try: 'start Ninja School' or 'Alexa, ask Ninja School to start'",
    'byeText': "Farewell ninja, return soon.",
    'songs': {
        "intro": "https://s3.amazonaws.com/asksounds/happyintro.mp3",
        "easy": "https://s3.amazonaws.com/asksounds/waitingtime1.mp3",
        "medium": "https://s3.amazonaws.com/asksounds/waitingtime3.mp3",
        "hard": "https://s3.amazonaws.com/asksounds/waitingtime2.mp3",
        "correct": "https://s3.amazonaws.com/asksounds/correct1.mp3"
    },
    'tasks': {
        'one': [
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
        ]
    },
};