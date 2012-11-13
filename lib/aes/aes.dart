library AES;
import 'dart:crypto';
/**
 *  AES for Dart
 *
 *  Copyright (c) 2012 Yulian Kuncheff
 *
 *  Released under MIT License.
 *
 *  Based on AES implementation in JavaScript by Chris Veness
 */

class AES {

  static List randomBytes() {
    var blockSize = 16;

    int nBytes = 32;
    var pwBytes = new List(nBytes);

    SHA256 hasher = new SHA256();
    List bytes = '${(new Date.now()).millisecondsSinceEpoch}'.charCodes;
    hasher.update(bytes);
    pwBytes = hasher.digest().getRange(0, nBytes);

    var key = AES.cipher(pwBytes, AES.keyExpansion(pwBytes));

    return key;
  }

  static List cipher(List input, List keySchedule) {
    int blockSize = 4; //block size - fixed at 4 for AES
    int numRounds = keySchedule.length ~/ blockSize-1; // number of rounds (10/12/14 for 128/192/256-bit keys)

    // Initialize 4xNb byte-array 'state' with input [§3.4]
    var state = [new List(4),new List(4),new List(4),new List(4)];
    for (int i = 0; i < 4*blockSize; i++) {
      int r = i%4;
      int c = (i~/4).floor();
      state[r][c] = input[i];
    }

    state = _addRoundKey(state, keySchedule, 0, blockSize);
    for (int round=1; round<numRounds; round++) {
      state = _subBytes(state, blockSize);
      state = _shiftRows(state, blockSize);
      state = _mixColumns(state, blockSize);
      state = _addRoundKey(state, keySchedule, round, blockSize);
    }

    state = _subBytes(state, blockSize);
    state = _shiftRows(state, blockSize);
    state = _addRoundKey(state, keySchedule, numRounds, blockSize);

    var output = new List(4*blockSize);
    for (int i=0; i < 4*blockSize; i++) {
      output[i] = state[i%4][(i~/4).floor()];
    }
    return output;
  }

  static List keyExpansion(List key) {
    int blockSize = 4;
    int keyLength = key.length ~/ 4;
    int numRounds = keyLength + 6;

    var keySchedule = new List((blockSize*(numRounds+1)).toInt());
    var temp = new List(4);

    for (int i = 0; i < keyLength; i++) {
      var row = [key[4*i], key[4*i+1], key[4*i+2], key[4*i+3]];
      keySchedule[i] = row;
    }

    for (int i=keyLength; i < (blockSize*(numRounds+1)); i++) {
      keySchedule[i] = new List(4);
      for (int t=0; t<4; t++) {
        temp[t] = keySchedule[i-1][t];
      }
      if (i % keyLength == 0) {
        temp = _subWord(_rotWord(temp));
        for (int t=0; t<4; t++) {
          temp[t] ^= _rCon[i ~/ keyLength][t];
        }
      }
      else if (keyLength > 6 && i%keyLength == 4) {
        temp = _subWord(temp);
      }
      for (int t=0; t<4; t++) {
        keySchedule[i][t] = keySchedule[i-keyLength][t] ^ temp[t];
      }
    }

    return keySchedule;
  }

  static _subBytes(List state, int blockSize) {
    for (int row=0; row<4; row++) {
      for (int column=0; column<blockSize; column++) {
        state[row][column] = _sBox[state[row][column]];
      }
    }
    return state;
  }

  static _shiftRows(List state, int blockSize) {
    var temp = new List(4);
    for (int row=1; row<4; row++) {
      for (int column=0; column<4; column++) {
        temp[column] = state[row][(column+row)%blockSize];
      }
      for (int column=0; column<4; column++) {
        state[row][column] = temp[column];
      }
    }
    return state;
  }

  static _mixColumns(List state, int blockSize) {
    for (int column=0; column<4; column++) {
      var a = new List(4);
      var b = new List(4);
      for (int i=0; i<4; i++) {
        a[i] = state[i][column];
        b[i] = (state[i][column] & 0x80) != 0 ? state[i][column] << 1 ^ 0x011b : state[i][column]<<1;
      }

      state[0][column] = b[0] ^ a[1] ^ b[1] ^ a[2] ^ a[3];
      state[1][column] = a[0] ^ b[1] ^ a[2] ^ b[2] ^ a[3];
      state[2][column] = a[0] ^ a[1] ^ b[2] ^ a[3] ^ b[3];
      state[3][column] = a[0] ^ b[0] ^ a[1] ^ a[2] ^ b[3];
    }
    return state;
  }

  static _addRoundKey(List state, List keySchedule, int round, int blockSize) {
    for (int row=0; row<4; row++) {
      for (int column=0; column<blockSize; column++) {
        state[row][column] ^= keySchedule[round*4+column][row];
      }
    }
    return state;
  }

  static _subWord(List keySchedule) {
    for (int i=0; i<4; i++) {
      _sBox[keySchedule[i]];
    }
    return keySchedule;
  }

  static _rotWord(List keySchedule) {
    var temp = keySchedule[0];
    for (int i=0; i<3; i++) {
      keySchedule[i] = keySchedule[i+1];
    }
    keySchedule[3] = temp;
    return keySchedule;
  }

  static const _sBox = const [0x63,0x7c,0x77,0x7b,0xf2,0x6b,0x6f,0xc5,0x30,0x01,0x67,0x2b,0xfe,0xd7,0xab,0x76,
                 0xca,0x82,0xc9,0x7d,0xfa,0x59,0x47,0xf0,0xad,0xd4,0xa2,0xaf,0x9c,0xa4,0x72,0xc0,
                 0xb7,0xfd,0x93,0x26,0x36,0x3f,0xf7,0xcc,0x34,0xa5,0xe5,0xf1,0x71,0xd8,0x31,0x15,
                 0x04,0xc7,0x23,0xc3,0x18,0x96,0x05,0x9a,0x07,0x12,0x80,0xe2,0xeb,0x27,0xb2,0x75,
                 0x09,0x83,0x2c,0x1a,0x1b,0x6e,0x5a,0xa0,0x52,0x3b,0xd6,0xb3,0x29,0xe3,0x2f,0x84,
                 0x53,0xd1,0x00,0xed,0x20,0xfc,0xb1,0x5b,0x6a,0xcb,0xbe,0x39,0x4a,0x4c,0x58,0xcf,
                 0xd0,0xef,0xaa,0xfb,0x43,0x4d,0x33,0x85,0x45,0xf9,0x02,0x7f,0x50,0x3c,0x9f,0xa8,
                 0x51,0xa3,0x40,0x8f,0x92,0x9d,0x38,0xf5,0xbc,0xb6,0xda,0x21,0x10,0xff,0xf3,0xd2,
                 0xcd,0x0c,0x13,0xec,0x5f,0x97,0x44,0x17,0xc4,0xa7,0x7e,0x3d,0x64,0x5d,0x19,0x73,
                 0x60,0x81,0x4f,0xdc,0x22,0x2a,0x90,0x88,0x46,0xee,0xb8,0x14,0xde,0x5e,0x0b,0xdb,
                 0xe0,0x32,0x3a,0x0a,0x49,0x06,0x24,0x5c,0xc2,0xd3,0xac,0x62,0x91,0x95,0xe4,0x79,
                 0xe7,0xc8,0x37,0x6d,0x8d,0xd5,0x4e,0xa9,0x6c,0x56,0xf4,0xea,0x65,0x7a,0xae,0x08,
                 0xba,0x78,0x25,0x2e,0x1c,0xa6,0xb4,0xc6,0xe8,0xdd,0x74,0x1f,0x4b,0xbd,0x8b,0x8a,
                 0x70,0x3e,0xb5,0x66,0x48,0x03,0xf6,0x0e,0x61,0x35,0x57,0xb9,0x86,0xc1,0x1d,0x9e,
                 0xe1,0xf8,0x98,0x11,0x69,0xd9,0x8e,0x94,0x9b,0x1e,0x87,0xe9,0xce,0x55,0x28,0xdf,
                 0x8c,0xa1,0x89,0x0d,0xbf,0xe6,0x42,0x68,0x41,0x99,0x2d,0x0f,0xb0,0x54,0xbb,0x16];

  static const _rCon = const [const [0x00, 0x00, 0x00, 0x00],
                              const [0x01, 0x00, 0x00, 0x00],
                              const [0x02, 0x00, 0x00, 0x00],
                              const [0x04, 0x00, 0x00, 0x00],
                              const [0x08, 0x00, 0x00, 0x00],
                              const [0x10, 0x00, 0x00, 0x00],
                              const [0x20, 0x00, 0x00, 0x00],
                              const [0x40, 0x00, 0x00, 0x00],
                              const [0x80, 0x00, 0x00, 0x00],
                              const [0x1b, 0x00, 0x00, 0x00],
                              const [0x36, 0x00, 0x00, 0x00]];
}
