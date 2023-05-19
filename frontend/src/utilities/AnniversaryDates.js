const dates = [
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], // jan
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], // feb
    [
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
        {ja: "カチューシャの歌の日", fu: "", en: "Katyusha Song Day"},
        {ja: "さくらの日", fu: "", en: "Cherry Blossom Day"},
        {ja: "三つ葉の日", fu: "", en: "Mitsuba Day"},
        {ja: "マリモの日", fu: "", en: "Marimo Day"},
        {ja: "", fu: "", en: ""},
        {ja: "オーケストラの日", fu: "", en: "Orchestra Day"},
    ], // mar 
    [{ja: "", fu: "", en: ""}, {ja: "", fu: "", en: ""}, {ja: "", fu: "", en: ""}, {ja: "", fu: "", en: ""}, {ja: "", fu: "", en: ""}, {ja: "", fu: "", en: ""}, {ja: "", fu: "", en: ""}, {ja: "タイヤの日", fu: "", en: "Tire Day"}, {ja: "大仏の日", fu: "", en: "Great Buddha Day"}, {ja: "交通事故ゼロを目指す日", fu: "", en: "Aim for Zero Traffic Accidents Day"}, {ja: "メートル法公布記念日", fu: "", en: "Metric Promulgation Day"}, {ja: "", fu: "", en: ""}, {ja: "喫茶店の日", fu: "", en: "Kissaten (Coffee/Teahouse) Day"}, {ja: "オレンジデー", fu: "", en: "Orange Day"}, {ja: "ヘリコプターの日", fu: "", en: "Helicopter Day"}, {ja: "女子マラソンの日", fu: "", en: "Women's Marathon Day"}, {ja: "ハローワークの日", fu: "", en: "Hello Work Day"}, {ja: "発明の日", fu: "", en: "Invention Day"}, {ja: "地図の日", fu: "", en: "Map Day"}, {ja: "郵政記念日", fu: "", en: "Postal Service Anniversary"}, {ja: "民放の日", fu: "", en: "Commercial Broadcasting Day"}, {ja: "清掃デー", fu: "", en: "Cleaning Day"}, {ja: "地ビールの日", fu: "", en: "Craft Beer Day"}, {ja: "植物学の日", fu: "", en: "Botany Day"}, {ja: "歩道橋の日", fu: "", en: "Pedestrian Bridge Day"}, {ja: "よい風呂の日", fu: "", en: "Good Bath Day"}, {ja: "悪妻の日", fu: "", en: "Policewoman Day"}, {ja: "サンフランシスコ講和記念日", fu: "", en: "San Francisco Peace Memorial Day"}, {ja: "畳の日", fu: "", en: "Tatami Day"}, {ja: "図書館記念日", fu: "", en: "Library Anniversary Day"}], // apr 

    [{ja: "メーデー", fu: "", en: "May Day"}, {ja: "緑茶の日", fu: "", en: "Green Tea Day"}, {ja: "ゴミの日", fu: "", en: "Trash Day"}, {ja: "ラムネの日", fu: "", en: "Ramune Day"}, {ja: "自転車の日", fu: "", en: "Bicycle Day"}, {ja: "ゴムの日", fu: "", en: "Rubber Day"}, {ja: "博士の日", fu: "", en: "Doctor's Day"}, {ja: "松の日", fu: "", en: "Pine Day"}, {ja: "アイスクリームの日", fu: "", en: "Ice Cream Day"}, {ja: "愛鳥の日", fu: "", en: "Bird Day"}, {ja: "ご当地キャラの日", fu: "", en: "Local Character Day"}, {ja: "海上保安の日", fu: "", en: "Coast Guard Day"}, {ja: "メイストームデー", fu: "", en: "May Storm Day"}, {ja: "", fu: "", en: ""}, {ja: "Jリーグの日", fu: "", en: "J-League Day"}, {ja: "旅の日", fu: "", en: "Travel Day"}, {}, {}, {ja: "ボクシング記念日", fu: "", en: "Boxing Day"}, {ja: "森林の日", fu: "", en: "Forest Day"}, {ja: "小学校開校の日", fu: "", en: "Elementary School Opening Day"}, {ja: "ガールスカウトの日", fu: "", en: "Girl Scout Day"}, {ja: "キスの日", fu: "", en: "Kiss Day"}, {ja: "ゴルフ場記念日", fu: "", en: "Golf Course Anniversary Day"}, {ja: "食堂車の日", fu: "", en: "Dining Car Day"}, {ja: "県民防災の日", fu: "", en: "Disaster Prevention Day"}, {ja: "ドラゴンクエストの日", fu: "", en: "Dragon Quest Day"}, {ja: "花火の日", fu: "", en: "Fireworks Day"}, {ja: "呉服の日", fu: "", en: "Kimono Day"}, {ja: "ごみゼロの日", fu: "", en: "Zero Waste Day"}, {ja: "藻岩山の日", fu: "", en: "Moiwa Mountains Day"}], // may
    [{ja: "写真の日", fu: "", en: "Photography Day"}, {ja: "ローズの日", fu: "", en: "Rose Day"}, {ja: "測量の日", fu: "", en: "Survey Day"}, {ja: "虫の日", fu: "", en: "Insect Day"}, {ja: "環境の日", fu: "", en: "Environment Day"}, {ja: "兄の日", fu: "", en: "Brothers Day"}, {ja: "緑内障を考える日", fu: "", en: "Glaucoma Awareness Day"}, {ja: "ヴァイキングの日", fu: "", en: "Viking Day"}, {ja: "ロックの日", fu: "", en: "Rock Day"}, {ja: "路面電車の日", fu: "", en: "Tram Day"}, {ja: "傘の日", fu: "", en: "Umbrella Day"}, {ja: "バザー記念日", fu: "", en: "Bazaar Day"}, {ja: "FMの日", fu: "", en: "FM Day"}, {ja: "手羽先記念日", fu: "", en: "Chicken Wings Day"}, {ja: "信用金庫の日", fu: "", en: "Shinkin Bank Day"}, {ja: "和菓子の日", fu: "", en: "Traditional Sweets Day"}, {ja: "おまわりさんの日", fu: "", en: "Policemen's Day"}, {ja: "海外移住の日", fu: "", en: "Immigration Day"}, {ja: "朗読の日", fu: "", en: "Reading Day"}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], // jun
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], // jul
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], // aug
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], // sep
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], // oct
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], // nov
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}] // dec
]

// sourced from https://ja.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E3%81%AE%E8%A8%98%E5%BF%B5%E6%97%A5%E4%B8%80%E8%A6%A7

export const getSpecialDay = (date) => {
    return dates[date.getMonth()][date.getDate() -1]
}