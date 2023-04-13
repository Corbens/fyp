import KanaTable from "../components/extra/KanaTable"

const hiragana = {
    title: "Lesson 1: Hiragana",
    pages: [
        {
            title: "What is Hiragana?",
            type: "Information", 
            content: [<p>Hiragana is one of three scripts used to write in Japanese. The other two are Katakana and Kanji. Hiragana is a phonetic script meaning you can always determine how the characters are pronounced just by looking at them.</p>]
        },
        {
            title: "Learn Some Hiragana",
            type: "Information",
            content: [<p>Here is a table containing a list of Hiragana. They are pronounced my matching the bold row entry with the bold column entry. Some fields are empty and these are kana which are no longer used in modern Japanese.</p>, <KanaTable katakana={false}/>]
        },
        {
            title: "Dakuten, Handakuten and Other Changes",
            type: "Information",
            content: [<p>Dakuten and Handakuten are diacritics used above certain kana to indicate a change in the pronunciation and they look like 「゛」and 「゜」respectively. They appear at the top right of kana</p>, <p>Dakuten causes 'k' sounds to turn to 'g' sounds, 't' sounds to turn to 'd' sounds, 's' sounds to turn to 'z' sounds and 'h' sounds to turn to 'b' sounds. Handakuten causes 'h' sounds to turn to 'p'</p>, <p>For example, か (ka) becomes が (ga) and は (ha) becomes ば (ba) or ぱ (pa).</p>, <p>An additional kana not shown before as it doesn't follow the pattern of the others is ん which makes an 'n' sound. </p>]
        },
        {
            title: "Testing Your Knowledge",
            type: "Test",
            content: [
                {
                    task: "Click the English sound that matches the following Hiragana. The correct sound will be highlighted.",
                    display: "は",
                    choices: [{
                            value: "ha",
                            right: true
                        },
                        {
                            value: "ho",
                            right: false
                        },
                        {
                            value: "he",
                            right: false
                        }
                    ]
                },
                {
                    task: "Click the English sound that matches the following Hiragana. The correct sound will be highlighted.",
                    display: "け",
                    choices: [{
                            value: "ki",
                            right: false
                        },
                        {
                            value: "ka",
                            right: false
                        },
                        {
                            value: "ke",
                            right: true
                        }
                    ]
                },
                {
                    task: "Click the English sound that matches the following Hiragana. The correct sound will be highlighted.",
                    display: "つ",
                    choices: [{
                            value: "tsu",
                            right: true
                        },
                        {
                            value: "chi",
                            right: false
                        },
                        {
                            value: "ta",
                            right: false
                        }
                    ]
                },

            ] 
        },
        {
            title: "Conclusion",
            type: "Information",
            content: [<p>This was an introduction into Hiragana. Hopefully you now understand what Hiragana is and can begin to read some characters. To practice and learn more, try out the Hiragana deck on the flashcard page.</p>]
        }
    ]
}

const katakana = {
    title: "Lesson 2: Katakana",
    pages: [
        {
            title: "What is Katakana?",
            type: "Information", 
            content: [<p>Hiragana is one of three scripts used to write in Japanese. The other two are Hiragana and Kanji. Katakana is a phonetic script meaning you can always determine how the characters are pronounced just by looking at them. It is commonly used when writing out loan words, words with foreign origin or foreign names. </p>]
        },
        {
            title: "Learn Some Katakana",
            type: "Information",
            content: [<p>Here is a table containing a list of Katakana. They are pronounced my matching the bold row entry with the bold column entry. Some fields are empty and these are kana which are no longer used in modern Japanese.</p>, <KanaTable katakana={true}/>]
        },
        {
            title: "Dakuten, Handakuten and Other Changes",
            type: "Information",
            content: [<p>Dakuten and Handakuten are diacritics used above certain kana to indicate a change in the pronunciation and they look like 「゛」and 「゜」respectively. They appear at the top right of kana</p>, <p>Dakuten causes 'k' sounds to turn to 'g' sounds, 't' sounds to turn to 'd' sounds, 's' sounds to turn to 'z' sounds and 'h' sounds to turn to 'b' sounds. Handakuten causes 'h' sounds to turn to 'p'</p>, <p>For example, カ (ka) becomes ガ (ga) and ハ (ha) becomes バ (ba) or パ (pa).</p>, <p>An additional kana not shown before as it doesn't follow the pattern of the others is ン which makes an 'n' sound. </p>]
        },
        {
            title: "Testing Your Knowledge",
            type: "Test",
            content: [
                {
                    task: "Click the English sound that matches the following Hiragana. The correct sound will be highlighted.",
                    display: "ポ",
                    choices: [{
                            value: "zo",
                            right: false
                        },
                        {
                            value: "ho",
                            right: false
                        },
                        {
                            value: "po",
                            right: true
                        }
                    ]
                },
                {
                    task: "Click the English sound that matches the following Hiragana. The correct sound will be highlighted.",
                    display: "タ",
                    choices: [{
                            value: "ta",
                            right: true
                        },
                        {
                            value: "ma",
                            right: false
                        },
                        {
                            value: "chi",
                            right: false
                        }
                    ]
                },
                {
                    task: "Click the English sound that matches the following Hiragana. The correct sound will be highlighted.",
                    display: "ス",
                    choices: [{
                            value: "ma",
                            right: false
                        },
                        {
                            value: "su",
                            right: true
                        },
                        {
                            value: "fu",
                            right: false
                        }
                    ]
                },

            ] 
        },
        {
            title: "Conclusion",
            type: "Information",
            content: [<p>This was an introduction into Katakana. Hopefully you now understand what Katakana is and can begin to read some characters. To practice and learn more, try out the Katakana deck on the flashcard page.</p>]
        }
    ]
}

export const getHiragana = () => {
    return hiragana
}

export const getKatakana = () => {
    return katakana
}