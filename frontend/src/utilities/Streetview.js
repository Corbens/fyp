const backgroundImages = [
    {
        url: "https://www.google.com/maps/embed?pb=!4v1680438649260!6m8!1m7!1sStsen7XZzPvhv7mRwz8JjQ!2m2!1d35.6578754425754!2d139.7456513237!3f350.1513714103671!4f31.739788108064175!5f0.4000000000000002",
        loc: "Tokyo Tower",
        info: "This is Tokyo Tower, a communications and observation tower in Tokyo!"
    },
    { 
        url: "https://www.google.com/maps/embed?pb=!4v1680531918537!6m8!1m7!1sZOw3yY0IrDxoKFvkDluiAg!2m2!1d35.51490808102519!2d138.7361479887599!3f150.72087470164425!4f-0.41687054173078764!5f0.4000000000000002",
        loc: "Mt Fuji / Lake Kawaguchi",
        info: "This is Lake Kawaguchi offering great views of Mt. Fuji!"
    },
    {
        url: "https://www.google.com/maps/embed?pb=!4v1680453232386!6m8!1m7!1sCAoSLEFGMVFpcE96UENoWWJfTUNXN3dSVktPNWxBcHpGWHM4R2dyN1M3SXZGZl9x!2m2!1d34.6690626678595!2d135.5013041943312!3f224.6247775432093!4f13.502023765577249!5f0.4000000000000002",
        loc: "Dotonbori",
        info: "This is Dotonbori, a district in Osaka famous for its neon signs!"
    },
    { 
        url: "https://www.google.com/maps/embed?pb=!4v1680532288019!6m8!1m7!1sCAoSLEFGMVFpcE03YUtxWkFxclVXU05PX2Fld2Q5ZjFsOTJtV3c0N2NPbXVzc1ln!2m2!1d34.836688!2d134.6947142!3f202.60508542384133!4f-0.519690308767423!5f0.4000000000000002",
        loc: "Himeji Castle",
        info: "This is Himeji Castle, the most famous castle in Japan unique for it's white exterior!"
    },
    {
        url: "https://www.google.com/maps/embed?pb=!4v1680454603905!6m8!1m7!1sCAoSLEFGMVFpcE1tTkxnckpNTFVscWY1bGE5OWFYX1YwYjhRUVNZZ0RWekJpOGxH!2m2!1d35.659482!2d139.7005596!3f187.3543470180818!4f-2.3961561923493946!5f0.4000000000000002",
        loc: "Shibuya Crossing",
        info: "This is Shibuya Crossing, one of the busiest pedestrian crossings in the world located in the Shibuya district of Tokyo!"
    },
    {
        url: "https://www.google.com/maps/embed?pb=!4v1680528671698!6m8!1m7!1sCAoSLEFGMVFpcE5RckZ6X3pwY0dyeWFnUS0zT1BkRnJMa3l4bW52d2I2cTZxanZn!2m2!1d34.9669822!2d135.7747387!3f132.18708748450516!4f-1.8176806069799056!5f0.4000000000000002",
        loc: "Fushimi Inari Taisha",
        info: "This is Fushimi Inari Taisha, a Shinto Shrine in Kyoto home to thousands of Torii Gates!"
    },
    {
        url: "https://www.google.com/maps/embed?pb=!4v1680528265912!6m8!1m7!1sW1TYe3QY5DJfIvj5hJ9vGg!2m2!1d35.01651852967026!2d135.6703647940099!3f56.98943475712669!4f-0.9317106319556956!5f0.4000000000000002",
        loc: "Arashiyama Bamboo Forest",
        info: "This is Arashiyama Bamboo Forest located in the Arashiyama district of Kyoto!"
    },
    {
        url: "https://www.google.com/maps/embed?pb=!4v1680529157738!6m8!1m7!1sCAoSLEFGMVFpcFA0ZkdpMmdHM1BBRy1iNVFVMHZQX1JZaFBBZ1N4dTVoU3Z4SXVy!2m2!1d35.0396361!2d135.7283448!3f124.49891636980747!4f7.027124668943699!5f0.4000000000000002",
        loc: "Kinkaku-ji",
        info: "This is Kinkaku-ji a golden temple located in Kyoto!"
    },
    {
        url: "https://www.google.com/maps/embed?pb=!4v1680530245487!6m8!1m7!1sFEL3NwoSLElHKVrXwTTF7w!2m2!1d35.31669216468902!2d139.5357000438444!3f12.658903228761393!4f9.228598807491736!5f0.4000000000000002",
        loc: "Daibutsu",
        info: "This is the Great Buddha of Kamakura / Kamakura Daibutsu, an 11.4 metre tall bronze Buddha statue first cast in 1252!"
    },
    {
        url: "https://www.google.com/maps/embed?pb=!4v1680530960158!6m8!1m7!1sCAoSLEFGMVFpcE9lUVNZQ2hFWlg3VHFCWWlSeEx0ZFNGVE5EeWwtZTkxWUZfSFll!2m2!1d35.67969009999999!2d139.7554566!3f309.44820772859254!4f4.198025198102471!5f0.4000000000000002",
        loc: "Nijubashi Bridge",
        info: "This is Nijubashi Brdige located in Tokyo's Imperial Palace Grounds!"
    },
    {
        url: "https://www.google.com/maps/embed?pb=!4v1680531622692!6m8!1m7!1sbPBX129eFk0Is3nC1Mvwpw!2m2!1d34.39377377987431!2d132.4528252006845!3f188.49227277257103!4f-7.792866709613861!5f0.4000000000000002",
        loc: "Hiroshima Peace Park",
        info: "This is the Hiroshima Peace Park dedicated to the victims of the world's first nuclear attack."
    }
]

//Other locations: Ishibei-Koji Lane, Matsushima Bay, Monkey Park, Osaka Castle, Kyomizudera Temple, Gunship Island, Hokkaido, Okinawa, Tottori Sand Dunes

export const getStreetview = () => {
    let randomNum = Math.floor(Math.random() * backgroundImages.length)
    return backgroundImages[randomNum]
}
