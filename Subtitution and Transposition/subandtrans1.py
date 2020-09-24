#!/usr/bin/python3
import math

letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 "


def generateKey(key):
    # subKey is the key for subtitutions
    # transKey is the key for transposition
    subKey = key
    transKey = 0

    # Generate transKey by xor and modulo 7
    for ch in key:
        transKey = transKey ^ ord(ch) % 7

    # If transKey == 0, assign
    # transKey to len(key) % 7
    if transKey == 0:
        transKey = len(key) % 7

    return subKey, transKey


def encryptVigenere(plaintext, key):
    c = ""

    # Ci = (Mi + Ki) % len(letters)
    for i in range(len(plaintext)):
        c += letters[
            (letters.index(plaintext[i]) +
             letters.index(key[i % len(key)])) % len(letters)
        ]
    return c


def decryptVigenere(plaintext, key):
    d = ""

    # Mi = (Ci - Ki) % 26
    # Don't need Mi = (Ci - Ki + 26) % 26
    # because Python already supported modulus
    # on negative number
    for i in range(len(plaintext)):
        d += letters[
            (letters.index(plaintext[i]) -
             letters.index(key[i % len(key)])) % len(letters)
        ]
    return d


def encryptTranspose(plaintext, key):
    c = ""
    colNum = key
    rowNum = len(plaintext) // key
    for i in range(colNum):
        for j in range(rowNum):
            c += plaintext[j * colNum + i]
    return c


def decryptTranspose(plaintext, key):
    d = ""

    # Flipped column and row in encrypt
    colNum = len(plaintext) // key
    rowNum = key
    for i in range(colNum):
        for j in range(rowNum):
            d += plaintext[j * colNum + i]
    return d


def encrypt(plaintext, subKey, transKey):
    # Normalize string
    plaintext += "x" * (transKey - (len(plaintext) %
                                    transKey if len(plaintext) % transKey != 0 else transKey))
    return encryptTranspose(encryptVigenere(plaintext, subKey), transKey)


def decrypt(plaintext, subKey, transKey):
    return decryptVigenere(decryptTranspose(plaintext, transKey), subKey)


if __name__ == '__main__':
    plaintext = input("Plaintext: ")
    subKey, transKey = generateKey(input("Key: "))
    cipher = encrypt(plaintext, subKey, transKey)
    decipher = decrypt(cipher, subKey, transKey)
    print("Encrypted: ", cipher)
    print("Decrypted: ", decipher)
