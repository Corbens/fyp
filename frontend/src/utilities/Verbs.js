const godanVerbs = [
        {verb: "聞", conjugations: [
            {en: "not listen", ja: "かない"},
            {en: "listen (polite)", ja: "きます"},
            {en: "listen (plain)", ja: "く"},
            {en: "can listen", ja: "ける"},
            {en: "let's listen", ja: "こう"}
        ]},
        {verb: "読", conjugations: [
            {en: "not read", ja: "まない"},
            {en: "read (polite)", ja: "みます"},
            {en: "read (plain)", ja: "む"},
            {en: "can read", ja: "める"},
            {en: "let's read", ja: "もう"}
        ]},
        {verb: "行", conjugations: [
            {en: "not go", ja: "かない"},
            {en: "go (polite)", ja: "きます"},
            {en: "go (plain)", ja: "く"},
            {en: "can go", ja: "ける"},
            {en: "let's go", ja: "こう"}
        ]}
]

const ichidanVerbs = [
        {verb: "食", conjugations: [
            {en: "not eat", ja: "べない"},
            {en: "eat (polite)", ja: "べます"},
            {en: "eat (plain)", ja: "べる"},
            {en: "can eat", ja: "べれる"},
            {en: "let's eat", ja: "べよう"}
        ]},
        {verb: "見", conjugations: [
            {en: "not look", ja: "ない"},
            {en: "look (polite)", ja: "ます"},
            {en: "look (plain)", ja: "る"},
            {en: "can look", ja: "れる"},
            {en: "let's look", ja: "よう"}
        ]},
        {verb: "起", conjugations: [
            {en: "not wake up", ja: "きない"},
            {en: "wake up (polite)", ja: "きます"},
            {en: "wake up (plain)", ja: "きる"},
            {en: "can wake up", ja: "きれる"},
            {en: "let's wake up", ja: "きよう"}
        ]}
]

const irregularVerbs = [
        {verb: "来", conjugations: [
            {en: "not come (plain)", ja: "ない"},
            {en: "come (polite)", ja: "ます"},
            {en: "come (plain)", ja: "る"},
            {en: "can come", ja: "れる"},
            {en: "not come (polite)", ja: "ません"}
        ]},
        {verb: "来", conjugations: [
            {en: "not come", ja: "ない"},
            {en: "come (polite)", ja: "ます"},
            {en: "come (plain)", ja: "る"},
            {en: "can come", ja: "れる"},
            {en: "let's come", ja: "よう"}
        ]},
        {verb: "来", conjugations: [
            {en: "not come", ja: "ない"},
            {en: "come (polite)", ja: "ます"},
            {en: "come (plain)", ja: "る"},
            {en: "can come", ja: "れる"},
            {en: "let's come", ja: "よう"}
        ]}
]

export const getDecks = (selectedDeck) => {
    if(selectedDeck === "Godan"){
        return godanVerbs
    }else if(selectedDeck === "Ichidan"){
        return ichidanVerbs
    }else{
        return irregularVerbs
    }
}
//https://blog.lingodeer.com/japanese-verb-conjugation-guide/#Japanese_verb_groups_Ru-Verbs_V2
//https://www.tofugu.com/japanese-grammar/verb-conjugation-groups/
//look up genki conjugation sections