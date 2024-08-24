import CryptoJS from 'crypto-js'
import { VITE_CRYPTO_SECRET_KEY, VITE_IV_KEY } from '../secrets'

const keyValue = VITE_CRYPTO_SECRET_KEY
const ivKey = VITE_IV_KEY

export function encrypteData(data) {
  if (data) {
    const key = CryptoJS.PBKDF2(keyValue, 'salt', { keySize: 256 / 32, iterations: 100 })
    const iv = CryptoJS.enc.Utf8.parse(ivKey)
    const encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv, mode: CryptoJS.mode.CBC })
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex)
  }
}
