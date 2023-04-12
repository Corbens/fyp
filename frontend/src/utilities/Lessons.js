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
            content: [<p>Here is a table containing a list of Hiragana kana. They are pronounced my matching the bold row entry with the bold column entry. Some fields are empty and these are kana which are no longer used in modern Japanese.</p>, <KanaTable katakana={false}/>]
        },
        {
            title: "Dakuten and Handakuten",
            type: "Information",
            content: [<p>Dakuten and Handakuten are diacritics used above certain kana to indicate a change in the pronunciation. They look like ゛and ゜and appear at the top right of the kana. For example, か (ka) becomes が (ga). は (ha) becomes ば (ba) or ぱ (pa).</p>]
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
            content: [<p>This was an introduction into hiragana. Hopefully you now understand what Hiragana is, and can begin to read some characters. To practice and learn more, try out the Hiragana deck on our flashcard page.</p>]
        }
    ]
}

export const getHiragana = () => {
    return hiragana
}