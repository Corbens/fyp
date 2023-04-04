const kanji = [
    {
        kanji: "右",
        english: "Right",
        kunReading: "みぎ",
        onReading: "う",
        components: [
            {char: "一", present: true},
            {char: "ノ", present: true},
            {char: "口", present: true},
            {char: "｜", present: false},
            {char: "人", present: false},
            {char: "目", present: false},
            {char: "丁", present: false},
            {char: "田", present: false},
            {char: "⼇", present: false}
        ],
        description: ""
    },
    {
        kanji: "左",
        english: "Left",
        kunReading: "ひだり",
        onReading: "サ",
        components: [
            {char: "一", present: true},
            {char: "ノ", present: true},
            {char: "工", present: true},
            {char: "｜", present: false},
            {char: "人", present: false},
            {char: "目", present: false},
            {char: "丁", present: false},
            {char: "田", present: false},
            {char: "口", present: false}
        ],
        description: ""
    },
    {
        kanji: "犬",
        english: "Dog",
        kunReading: "いぬ",
        onReading: "ケン",
        components: [
            {char: "大", present: true},
            {char: "丶", present: true},
            {char: "口", present: false},
            {char: "｜", present: false},
            {char: "王", present: false},
            {char: "目", present: false},
            {char: "丁", present: false},
            {char: "一", present: false},
            {char: "ノ", present: false}
        ],
        description: ""
    },
    {
        kanji: "四",
        english: "Four",
        kunReading: "よん",
        onReading: "シ",
        components: [
            {char: "儿", present: true},
            {char: "口", present: true},
            {char: "ノ", present: false},
            {char: "｜", present: false},
            {char: "人", present: false},
            {char: "丶", present: false},
            {char: "丁", present: false},
            {char: "田", present: false},
            {char: "一", present: false}
        ],
        description: ""
    },
    {
        kanji: "国",
        english: "Country",
        kunReading: "くに",
        onReading: "コク",
        components: [
            {char: "丶", present: true},
            {char: "囗", present: true},
            {char: "王", present: true},
            {char: "｜", present: false},
            {char: "人", present: false},
            {char: "目", present: false},
            {char: "丁", present: false},
            {char: "田", present: false},
            {char: "⼇", present: false}
        ],
        description: ""
    }
]

export const getKanji = () => {
    return kanji
}