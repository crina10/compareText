function normalizeText(text) {
    let normalized = text;

    normalized = normalized
        .replace(/a~/g, "ă")
        .replace(/a\^/g, "â")
        .replace(/i\^/g, "î")
        .replace(/s~/g, "ș")
        .replace(/t~/g, "ț")
        .replace(/A~/g, "Ă")
        .replace(/A\^/g, "Â")
        .replace(/I\^/g, "Î")
        .replace(/S~/g, "Ș")
        .replace(/T~/g, "Ț");

    normalized = normalized.normalize("NFKD");

    normalized = normalized
        .replace(/A\u0306/g, "\u0102")
        .replace(/a\u0306/g, "\u0103")
        .replace(/A\u0302/g, "\u00c2")
        .replace(/a\u0302/g, "\u00e2")
        .replace(/I\u0302/g, "\u00ce")
        .replace(/i\u0302/g, "\u00ee")
        .replace(/\u015e/g, "\u0218")
        .replace(/\u015f/g, "\u0219")
        .replace(/\u0162/g, "\u021a")
        .replace(/\u0163/g, "\u021b");

    normalized = normalized.replace(/[\u0300-\u036f]/g, "");
    normalized = normalized.normalize("NFC");
    normalized = normalized.replace(/\s+/g, " ").trim();

    return normalized;
}

// проверка на placeholder типа {valueAmount}
function isPlaceholder(word) {
    return /^\{.*\}$/.test(word);
}

// сравнение по словам
function compareWords(t1, t2) {
    let words1 = t1.split(" ");
    let words2 = t2.split(" ");

    let maxLength = Math.max(words1.length, words2.length);
    let result = "";

    for (let i = 0; i < maxLength; i++) {
        let w1 = words1[i] || "";
        let w2 = words2[i] || "";

        if (w1 === w2 || isPlaceholder(w1) || isPlaceholder(w2)) {
            result += `<span class="word-ok">${w1}</span> `;
        } else {
            result += `<span class="word-diff">${w1 || "_"} | ${w2 || "_"}</span> `;
        }
    }

    return result;
}

// основная функция
function compareTexts() {
    let text1 = normalizeText(document.getElementById("text1").value);
    let text2 = normalizeText(document.getElementById("text2").value);

    let resultHTML = compareWords(text1, text2);

    document.getElementById("result").innerHTML = resultHTML;
}
