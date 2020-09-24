#!/usr/bin/python3
letters = "abcdefghijklmnopqrstuvwxyz "


def encrypt(p, s):
    c = ""
    for ch in p:
        c += letters[(letters.index(ch) + s) % 27]
    return c


def decrypt(p, s):
    c = ""
    for ch in p:
        c += letters[(letters.index(ch) - s) % 27]
    return c


plaintext = input("Plaintext: ")
shift = int(input("Shift: "))

print(encrypt(plaintext, 3))
print(decrypt(encrypt(plaintext, 3), 3))
