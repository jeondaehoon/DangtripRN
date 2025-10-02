export default function getKmaDateTime() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    let baseDate = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
    let baseTime = "";

    const releaseTimes = [2, 5, 8, 11, 14, 17, 20, 23];

    let targetHour = 0;
    for (let i = releaseTimes.length - 1; i >= 0; i--) {
        const releaseHour = releaseTimes[i];

        // 데이터는 발표 시간 + 10분 이후에 가능
        if (currentHour > releaseHour || (currentHour === releaseHour && currentMinutes >= 10)) {
            targetHour = releaseHour;
            break;
        }
    }

    if (targetHour === 0) {
        // 아직 오늘 발표된 게 없으면 → 어제 23시로
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        baseDate = `${yesterday.getFullYear()}${String(yesterday.getMonth() + 1).padStart(2, "0")}${String(yesterday.getDate()).padStart(2, "0")}`;
        baseTime = "2300";
    } else {
        baseTime = String(targetHour).padStart(2, "0") + "00";
    }

    // 🚨 보정: 발표 직후(예: 02:00~02:09) 구간에서는 데이터 없음 → 이전 발표 시간으로 fallback
    if (currentHour === targetHour && currentMinutes < 10) {
        const idx = releaseTimes.indexOf(targetHour);
        if (idx > 0) {
            const prevHour = releaseTimes[idx - 1];
            baseTime = String(prevHour).padStart(2, "0") + "00";

            // 02시 직후 → 전날 23시 데이터로 보정
            if (prevHour === 23 && targetHour === 2) {
                const yesterday = new Date(now);
                yesterday.setDate(now.getDate() - 1);
                baseDate = `${yesterday.getFullYear()}${String(yesterday.getMonth() + 1).padStart(2, "0")}${String(yesterday.getDate()).padStart(2, "0")}`;
            }
        }
    }

    return { baseDate, baseTime };
}
