var text = document.getElementById("input")
var key = document.getElementById("key")

function generateKey() {
    var generatedKey = ""

    // Generate a flag boolean array that indicates 
    // the existence of character in the key string 
    var flag = []
    for (var i = 0; i < 26; i++) {
        flag.push(false)
    }

    // Checking whether the character already exist 
    // in previous key string
    keyVal = key.value.toLowerCase()
    for (i of keyVal) {
        if (!flag[i.charCodeAt() - 97]) {
            flag[i.charCodeAt() - 97] = true
            generatedKey += i
        }
    }

    // Fill the rest of the key with alphabet thats 
    // not already in key string alphabetically
    if (generatedKey.length < 26) {
        for (var i = 0; i < 26; i++) {
            if (!flag[i]) {
                generatedKey += String.fromCharCode(i + 97)
            }
        }
    }

    // Return the generated key
    return generatedKey
}

function encrypt() {
    var keys = generateKey()
    var tmp = ""
    var encryptedText = text.value.toLowerCase()

    // First step of encryption : Subtitution
    for (var i = 0; i < encryptedText.length; i++) {
        // encryptedText = setCharAt(encryptedText, i, keys[encryptedText.charCodeAt(i) - 97])
        tmp += keys[encryptedText.charCodeAt(i) - 97]
    }
    encryptedText = tmp

    // Second step of encryption : Transposition
    // The transposition is grouped by 4 column and
    // read bottom up from column 0 - 3

    // Add character to string so its length is divisible by 4
    var len = encryptedText.length
    if (len % 4 != 0) {
        var rem = 4 - (len % 4)
        for (var i = 0; i < rem; i++) {
            encryptedText += String.fromCharCode(i + 97)
        }
    }
    console.log(encryptedText)

    // Transpose the string
    var col = ["", "", "", ""]
    tmp = ""
    for (var i = 0; i < encryptedText.length; i++) {
        if (i % 4 == 0) {
            col[0] += encryptedText[i]
        } else if (i % 4 == 1) {
            col[1] += encryptedText[i]
        } else if (i % 4 == 2) {
            col[2] += encryptedText[i]
        } else if (i % 4 == 3) {
            col[3] += encryptedText[i]
        }
    }

    for (var i = 0; i < 4; i++) {
        for (var j = col[0].length - 1; j >= 0; j--) {
            tmp += col[i][j]
        }
    }

    encryptedText = tmp


    // Show the encrypted value at input box
    input.value = encryptedText
}

function decrypt() {
    var decryptedText = text.value.toLowerCase()

    // First step of decryption : Transposition
    var row = decryptedText.length / 4

    // Making an array to store the transposed text temporarily
    var tmpRow = []
    for (var i = 0; i < row; i++) {
        tmpRow.push("")
    }

    // Decrypt the transposition
    for (var i = decryptedText.length - 1; i >= 0; i--) {
        for (var j = 0; j < row; j++) {
            if (i % row == j) {
                tmpRow[j] = decryptedText[i] + tmpRow[j]
            }
        }
    }

    var tmp = ""
    for (var i = row - 1; i >= 0; i--) {
        tmp += tmpRow[i]
    }
    decryptedText = tmp

    // Second step of decryption : Subtitution
    tmp = ""
    var keys = generateKey()
    for (i of decryptedText) {
        tmp += String.fromCharCode(keys.indexOf(i) + 97)
    }
    decryptedText = tmp

    // Show the decrypted value at input box
    input.value = decryptedText
}

// Function to replace char at specific index
function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}