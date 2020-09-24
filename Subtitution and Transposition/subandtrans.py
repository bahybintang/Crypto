#!/usr/bin/python3

letters = "abcdefghijklmnopqrstuvwxyz "


def generateKey(key):
    # subKey is the key for subtitutions
    # transKey is the key for transposition
    subKey = {}
    transKey = 0

    # To keep track of index in letters
    cur = 0

    for ch in key:
        # Generate transKey by xor and modulo 4
        transKey = transKey ^ ord(ch) % 4

        # Generate subKey if the key character
        # not already exists in subKey value
        if ch not in subKey.values():
            subKey[letters[cur += 1]] = ch

    # Generate key for unmapped letter
    while cur < len(key):
        subKey[letters[cur]] = letters[cur += 1]

    return subKey, transKey


def substitute(plaintext, key):
    return [key[ch] for ch in plaintext]


if __name__ == '__main__':
    plaintext = input("Plaintext: ")
    subKey, transKey = generateKey(input("Key: "))
    print(substitute(plaintext, subKey))
