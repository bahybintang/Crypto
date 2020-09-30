# Deskripsi

Algoritma enkripsi yang saya buat melakukan substitusi dan transposisi pada plaintext.
Untuk substitusi menggunakan Vigenere Cipher dan transposisi menggunakan transposisi (rectangle).

# Generate Key

Untuk menggenerate key pada algoritma ini, pada bagian substitusi menggunakan inputan
key dari user. Sedangkan untuk key pada transposisi maka menggunakan perhitungan berikut.
Key menunjukkan jumlah kolom pada transposisi (rectangle).

```python
key = 0
for ch in input_key:
    key ^ ord(ch) % max(7, len(input_key) / 3)
key += 1
```

Key digenerate menggunakan hasil XOR dari tiap-tiap karakter pada string. Dan hasil akhir key
ditambahkan dengan 1 agar menghindari jumlah kolom 0. Penggunaan `len(input_key) // 3` agar
untuk kunci yang panjang maka tidak terbatas pada 7 kemungkinan jumlah kolom yang berbeda saja.

# Algoritma

## Enkripsi

- Vigenere (V)

```
Ci = (Mi + Ki) % len(alphabet)
```

- Rectangle Transposition (R)

```
Ex.
M = AKU BUDI DOREMI
K = 3 -> Jumlah kolom 3

A K U
  B U
D I
D O R
E M I

C = A DDEKBIOMUU RI
```

- Keseluruhan

```
C = R(V(M))
```

## Dekripsi

- Vigenere (V)

```
Mi = (Ci - Ki) % len(alphabet)
```

- Rectangle Transposition (R)

```
Ex.
C = A DDEKBIOMUU RI
K = 3 -> Jumlah kolom len(M) // 3 = 15 // 3 = 5

A   D D E
K B I O M
U U   R I

M = AKU BUDI DOREMI
```

- Keseluruhan
```
M = V(R(C))
```