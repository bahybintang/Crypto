var text = document.getElementById("input")
var key = document.getElementById("key")

function generateKey() {
    var generatedKey = key.value.toLowerCase()

    // Return the generated key
    return generatedKey
}

function encrypt() {
    var keys = generateKey()
    var tmp = ""
    var encryptedText = text.value.toLowerCase()

    // Add character to string so its length is divisible by key length
    var len = encryptedText.length
    var keyLen = keys.length
    if (len % keyLen != 0) {
        var rem = keyLen - (len % keyLen)
        for (var i = 0; i < rem; i++) {
            encryptedText += String.fromCharCode(i + 97)
        }
    }

    // Transpose the string
    var col = []
    for (var i = 0; i < keyLen; i++) {
        col.push("")
    }
    tmp = ""

    for (var i = 0; i < encryptedText.length; i++) {
        for (var j = 0; j < keyLen; j++) {
            if (i % keyLen == j) {
                col[j] += encryptedText[i]
            }
        }
    }

    // Generate encrypted text using the priority of
    // key string
    for (var i = 0; i < 26; i++) {
        var tmpIdx = -1
        for (var j = 0; j < keyLen; j++) {
            if (keys[j] == String.fromCharCode(97 + i)) {
                tmpIdx = j;
            }
        }

        while (tmpIdx != -1 && col[tmpIdx] != "") {
            for (var j = 0; j < keyLen; j++) {
                if (keys[tmpIdx] == keys[j]) {
                    tmp += col[j][0]
                    col[j] = col[j].substr(1)
                }
            }
        }
    }

    encryptedText = tmp


    // Show the encrypted value at input box
    input.value = encryptedText
}

function decrypt() {
    var decryptedText = text.value.toLowerCase()
    var keys = generateKey()
    var keyLen = keys.length
    var tmp
    var row = decryptedText.length / keyLen

    // Put the encrypted text in column
    var col = []
    for (var i = 0; i < keyLen; i++) {
        col.push("")
    }
    tmp = ""

    // Generate rank array of keys for decryption
    var arr = []
    for (var i = 0; i < keyLen; i++) {
        arr.push(keys.charCodeAt(i))
    }

    var sorted = arr.slice().sort(function (a, b) {
        return a - b
    })
    var ranks = arr.slice().map(function (v) {
        return sorted.indexOf(v)
    });

    // Placing the col array in the right position
    var flag = []
    for (var i = 0; i < keyLen; i++) {
        flag.push(false)
    }

    for (var i = 0; i < keyLen; i++) {
        var pos = -1;
        var min = 999
        for (var j = 0; j < keyLen; j++) {
            if (!flag[j] && ranks[j] < min) {
                min = ranks[j]
                pos = j
            }
        }
        flag[pos] = true

        while (pos != -1 && col[pos].length < row) {
            for (var j = 0; j < keyLen; j++) {
                if (keys[j] == keys[pos]) {
                    flag[j] = true
                    col[j] += decryptedText[0]
                    decryptedText = decryptedText.substr(1)
                }
            }
        }
    }

    for (var i = 0; i < row; i++) {
        for (var j = 0; j < keyLen; j++) {
            tmp += col[j][i]
        }
    }

    decryptedText = tmp

    // Show the decrypted value at input box
    input.value = decryptedText
}