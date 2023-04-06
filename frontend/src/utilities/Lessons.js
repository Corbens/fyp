const hiragana = {
    title: "Lesson 1: Hiragana",
    pages: [
        {
            title: "What is Hiragana?",
            type: "Information", 
            content: "Hiragana is one of three scripts used to write in Japanese. The other two are Katakana and Kanji. Hiragana is a phonetic script meaning you can always determine how the characters are pronounced just by looking at them. " // maybe have not as a string but as an array?
        },
        {
            title: "Learn Some Hiragana",
            type: "Information",
            content: "Here is a list of some hiragana to learn. Here is how they are pronounced."
        },
        {
            title: "Dakuten and Handakuten",
            type: "Information",
            content: "Dakuten and Handakuten are diacritics used above certain kana to indicate a change in the pronunciation. They look like ゛and ゜and appear at the top right of the kana. For example, か (ka) becomes が (ga). は (ha) becomes ば (ba) or ぱ (pa)."
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
            content: "This was an introduction into hiragana. Hopefully you now understand what Hiragana is, and can begin to read some characters. To practice and learn more, try out the Hiragana deck on our flashcard page."
        }
    ]
}

export const getHiragana = () => {
    return hiragana
}