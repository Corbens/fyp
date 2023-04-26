const general = [{
        question: <h4>Who is this website for?</h4>,
        answer: <p>This website is for English speakers wanting to learn Japanese at a beginner level.</p>
    },
    {
        question: <h4>What does this website cover?</h4>,
        answer: <p>This website covers some basics of the Japanese language, as well as showing off some other aspects of Japan and Japanese culture along the way.</p>
    },
    {
        question: <h4>What are Kanji?</h4>,
        answer: <p>Kanji are Chinese Characters that are used to help write Japanese.</p>
    },
    {
        question: <h4>What is a reading?</h4>,
        answer: <p>Kanji Characters can be pronounced in multiple ways and these are called readings. The two most common types of readings are Kun, which originates from Japanese, and On, which originates from Chinese. </p>
    },
    {
        question: <h4>How is XP earned?</h4>,
        answer: <p>XP is earned through completing activities such as Drag & Drop Games, Kanji Games or Flashcard Reviews.</p>
    },
    {
        question: <h4>What does this emoji mean with my results?</h4>,
        answer: <p>Hovering over an emoji will often give you a brief description of what it means.</p>
    },
]

const home = [{
        question: <h4>What are the dates shown on the home page?</h4>,
        answer: <p>These are 'special' days in Japan designated for reasons such as to commemorate an event, recognise a group of people or raise awareness about a topic.</p>
    },
]

const lessons = [{
        question: <h4>What do lessons teach?</h4>,
        answer: <p>These lessons give you an introduction into the topic they cover. This should provide you with enough knowledge to tackle the activities available on this website, as well as to start learning more about the topics. </p>
    },
    {
        question: <h4>How are lessons structured?</h4>,
        answer: <p>Lessons are structured through a series of 'slides'. You can navigate through these at your own pace reading through the material. Some slides may have an interactive element where you can test your understanding.</p>
    },
]

const dragdrop = [{
        question: <h4>How does this game work?</h4>,
        answer: <p>This game works by being given a list of cards and dragging the Japanese cards to the English cards that match.</p>
    },
    {
        question: <h4>What is the goal of this game?</h4>,
        answer: <p>The goal of this game is to help the user recognise and understand Japanese terms and topics such as a set of vocabulary.</p>
    },
]

const flashcards = [{
        question: <h4>What is the difference between practice and review mode?</h4>,
        answer: <p>Practice mode allows you full control over the deck you are using, much like a physical deck of cards, whereas review mode follows an SRS system where you are tested on specific flashcards.</p>
    },
    {
        question: <h4>What does SRS stand for and what does it mean?</h4>,
        answer: <p>SRS stands for spaced repetition schedule. The idea behind SRS is to show information someone understands well less frequently, forcing them to think harder to recall the information, and showing information that someone understands less well more frequently, so they have the opportunity to recall it.</p>
    },
]

const kanji = [{
        question: <h4>How does this game work?</h4>,
        answer: <p>This game works by selecting the chosen 'components' that make up the Kanji characters described. The hints on the side can be used to aid you.</p>
    },
    {
        question: <h4>What is the goal of this game?</h4>,
        answer: <p>The goal of this game is to get the user used to looking at Kanji Characters. Often, learners have little to no exposure to these characters and can struggle to differentiate between them and this hopes to help the user begin to spot the differences.</p>
    },
]

export const getGeneral = () => {
    return general
}

export const getHome = () => {
    return home
}

export const getLessons = () => {
    return lessons
}

export const getDragdrop = () => {
    return dragdrop
}

export const getFlashcards = () => {
    return flashcards
}

export const getKanji = () => {
    return kanji
}