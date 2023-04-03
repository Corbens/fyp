const backgroundImages = [
    {
        url: "https://www.google.com/maps/embed?pb=!4v1680438649260!6m8!1m7!1sStsen7XZzPvhv7mRwz8JjQ!2m2!1d35.6578754425754!2d139.7456513237!3f350.1513714103671!4f31.739788108064175!5f0.4000000000000002",
        loc: "Tokyo Tower",
        info: "This is Tokyo Tower, a communications and observation tower in Tokyo!"
    },
    {
        url: "https://www.google.com/maps/embed?pb=!4v1680449472552!6m8!1m7!1s01wPq8On8rS16bLfNCP5yQ!2m2!1d35.42876865614673!2d138.859690496626!3f236.89692255346!4f3.914499926456685!5f0.7820865974627469",
        loc: "Mt Fuji",
        info: "This is Mt. Fuji, the most famous mountain in Japan world-renowned for it's iconic appearance!"
    },
    {
        url: "https://www.google.com/maps/embed?pb=!4v1680453232386!6m8!1m7!1sCAoSLEFGMVFpcE96UENoWWJfTUNXN3dSVktPNWxBcHpGWHM4R2dyN1M3SXZGZl9x!2m2!1d34.6690626678595!2d135.5013041943312!3f224.6247775432093!4f13.502023765577249!5f0.4000000000000002",
        loc: "Dotonbori",
        info: "This is Dotonbori, a district in Osaka famous for its neon signs!"
    },
    {
        url: "https://www.google.com/maps/embed?pb=!4v1680453959551!6m8!1m7!1sOuiwMUpjICFM1NVRnNSZQQ!2m2!1d34.83546968151055!2d134.6926964560558!3f12.166086147562236!4f0.38102738476965214!5f1.3154255553525953",
        loc: "Himeji Castle",
        info: "This is Himeji Castle, the most famous castle in Japan unique for it's white exterior!"
    },
    {
        url: "https://www.google.com/maps/embed?pb=!4v1680454603905!6m8!1m7!1sCAoSLEFGMVFpcE1tTkxnckpNTFVscWY1bGE5OWFYX1YwYjhRUVNZZ0RWekJpOGxH!2m2!1d35.659482!2d139.7005596!3f187.3543470180818!4f-2.3961561923493946!5f0.4000000000000002",
        loc: "Shibuya Crossing",
        info: "This is Shibuya Crossing, one of the busiest pedestrian crossings in the world located in the Shibuya district of Tokyo!"
    }

    //
]

export const getStreetview = () => {
    let randomNum = Math.floor(Math.random() * backgroundImages.length)
    return backgroundImages[randomNum]
}

//locations: skytree, gunship island, Kyoto’s Machiya, matsushima bay, somewhere in hokkaido, beppu, hiroshima, sand-dunes in 
//https://theculturetrip.com/asia/japan/articles/the-21-most-iconic-japanese-landmarks/