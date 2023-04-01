export const getDate = (rawDate, year) => {
    rawDate = new Date(rawDate)
    rawDate = rawDate.toISOString()
    const date = rawDate.split("T")[0].split("-")
    let jaDate = ""
    if(year){
        jaDate = jaDate + date[0] + "年" 
    }
    jaDate = jaDate + date[1] + "月" + date[2] + "日"
    return jaDate
}

export const getTime = (rawDate) => {
    const time = rawDate.split("T")[1].split(":")
    const jaTime = time[0] + "時" + time[1] + "分"
    return jaTime
}