const countries = {
    num: "0",
    title: "countries",
    contents: [
        { en: "Japan", ja: "日本" },
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
    title: "food",
    contents: [
        { en: "Plum", ja: "梅" },
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
    title: "numbers",
    contents: [
        { en: "One", ja: "一" },
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