function normalizeText(text) {
    let normalized = text;
    normalized = normalized
        .replace(/a~/g, "ă")
        .replace(/a\^/g, "â")   // a^ → â
        .replace(/i\^/g, "î")   // i^ → î
        .replace(/s~/g, "ș")
        .replace(/t~/g, "ț");

    normalized = normalized
        .replace(/A~/g, "Ă")
        .replace(/A\^/g, "Â")
        .replace(/I\^/g, "Î")
        .replace(/S~/g, "Ș")
        .replace(/T~/g, "Ț");


    // unicode
    normalized = normalized.normalize("NFKD");

    // Ă/ă
    normalized = normalized
        .replace(/A\u0306/g, "\u0102")
        .replace(/a\u0306/g, "\u0103")
        .replace(/\u0102/g, "\u0102")
        .replace(/\u0103/g, "\u0103");

    // Â/â
    normalized = normalized
        .replace(/A\u0302/g, "\u00c2")
        .replace(/a\u0302/g, "\u00e2")
        .replace(/\u00c2/g, "\u00c2")
        .replace(/\u00e2/g, "\u00e2");

    // Î/î
    normalized = normalized
        .replace(/I\u0302/g, "\u00ce")
        .replace(/i\u0302/g, "\u00ee")
        .replace(/\u00ce/g, "\u00ce")
        .replace(/\u00ee/g, "\u00ee");

    // Ș/ș
    normalized = normalized
        .replace(/\u015e/g, "\u0218")
        .replace(/\u015f/g, "\u0219")
        .replace(/S\u0327/g, "\u0218")
        .replace(/s\u0327/g, "\u0219")
        .replace(/\u0218/g, "\u0218")
        .replace(/\u0219/g, "\u0219");

    // Ț/ț
    normalized = normalized
        .replace(/\u0162/g, "\u021a")
        .replace(/\u0163/g, "\u021b")
        .replace(/T\u0327/g, "\u021a")
        .replace(/t\u0327/g, "\u021b")
        .replace(/\u021a/g, "\u021a")
        .replace(/\u021b/g, "\u021b");

    normalized = normalized.replace(/[\u0300-\u036f]/g, "");

    //  NFC
    normalized = normalized.normalize("NFC");

    // space
    normalized = normalized.replace(/\s+/g, " ").trim();

    return normalized;
}

function compareChars(t1, t2) {
    let maxLength = Math.max(t1.length, t2.length);
    let result = "";

    for (let i = 0; i < maxLength; i++) {
        let c1 = t1[i] || "";
        let c2 = t2[i] || "";

        if (c1 === c2) {
            result += `<span class="char-ok">${c1}</span>`;
        } else {
            result += `<span class="char-diff">${c1 || "_"}|${c2 || "_"}</span>`;
        }
    }

    return result;
}

function compareTexts() {
    let text1 = normalizeText(document.getElementById("text1").value);
    let text2 = normalizeText(document.getElementById("text2").value);

    let resultHTML = compareChars(text1, text2);

    document.getElementById("result").innerHTML = resultHTML;
}

