const countries = {
    num: "0",
    title: "Countries",
    contents: [
        { en: "Japan", ja: "日本"},
        { en: "China", ja: "中国"},
        { en: "Korea", ja: "韓国"},
        { en: "Britain", ja: "英国"},
        { en: "France", ja: "フランス"},
        { en: "Spain", ja: "スペイン"},
        { en: "America", ja: "アメリカ"},
        { en: "Canada", ja: "カナダ"},
        { en: "Italy", ja: "イタリア"}
    ]
}
const food = {
    num: "1",
    title: "Food",
    contents: [
        { en: "Plum", ja: "梅"},
        { en: "Strawberry", ja: "苺"},
        { en: "Salt", ja: "塩"},
        { en: "Tonkatsu", ja: "とんかつ"},
        { en: "Yakiniku", ja: "焼肉"},
        { en: "Egg", ja: "玉子"},
        { en: "Beef", ja: "牛肉"},
        { en: "Fish", ja: "魚"}
    ]
}
const numbers = {
    num: "2",
    title: "Numbers",
    contents: [
        { en: "One", ja: "一"},
        { en: "Two", ja: "二"},
        { en: "Three", ja: "三"},
        { en: "Four", ja: "四"},
        { en: "Five", ja: "五"},
        { en: "Six", ja: "六"},
        { en: "Seven", ja: "七"},
        { en: "Eight", ja: "八"},
        { en: "Nine", ja: "九"},
        { en: "Ten", ja: "十"}
    ]
}
const allDecks = [countries, food, numbers]

export const getDecks = (selectedDecks) => {
    let returnDecks = []
    let i = 0
    for(let deck in selectedDecks){
        if(selectedDecks[deck]){
            returnDecks.push(allDecks[i])
        }
        i+=1
    }
    return returnDecks
}

const kana = {
    num: "3",
    title: "Kana",
    maxSides: 3,
    contents: [
        { en: "あ", ja: "ア"},
        { en: "い", ja: "イ"},
        { en: "う", ja: "ウ"},
        { en: "え", ja: "エ"},
        { en: "お", ja: "オ"},
        { en: "か", ja: "カ"},
        { en: "き", ja: "キ"},
        { en: "く", ja: "ク"},
        { en: "け", ja: "ケ"},
        { en: "こ", ja: "コ"},
        { en: "さ", ja: "サ"},
        { en: "し", ja: "シ"},
        { en: "す", ja: "ス"},
        { en: "せ", ja: "セ"},
        { en: "そ", ja: "ソ"},
        { en: "た", ja: "タ"},
        { en: "ち", ja: "チ"},
        { en: "つ", ja: "ツ"},
        { en: "て", ja: "テ"},
        { en: "と", ja: "ト"},
        { en: "な", ja: "ナ"},
        { en: "に", ja: "ニ"},
        { en: "ぬ", ja: "ヌ"},
        { en: "ね", ja: "ネ"},
        { en: "の", ja: "ノ"},
        { en: "は", ja: "ハ"},
        { en: "ひ", ja: "ヒ"},
        { en: "ふ", ja: "フ"},
        { en: "へ", ja: "ヘ"},
        { en: "ほ", ja: "ホ"},
        { en: "ま", ja: "マ"},
        { en: "み", ja: "ミ"},
        { en: "む", ja: "ム"},
        { en: "め", ja: "メ"},
        { en: "も", ja: "モ"},
        { en: "や", ja: "ヤ"},
        { en: "ゆ", ja: "ユ"},
        { en: "よ", ja: "ヨ"},
        { en: "ら", ja: "ラ"},
        { en: "り", ja: "リ"},
        { en: "る", ja: "ル"},
        { en: "れ", ja: "レ"},
        { en: "ろ", ja: "ロ"},
        { en: "わ", ja: "ワ"},
        { en: "を", ja: "ヲ"},
        { en: "ん", ja: "ン"}
    ]
}

const flashcardDecks = [countries, food, numbers, kana]

export const getFlashcardDeck = (selectedDeck) => {
    return flashcardDecks[selectedDeck]
}

export const getFlashcardList = () => {
    const flashcardInfo = []
    for(let deck in flashcardDecks){ 
        flashcardInfo.push({label: flashcardDecks[deck].title, pos: flashcardDecks[deck].num})
    }
    return flashcardInfo
}