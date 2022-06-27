/** Регулярки для компонентов форм */

export interface IFormRegExps {
  email: RegExp,
  phone: RegExp,
  ogrn: RegExp,
  bic: RegExp,
  account: RegExp,
  birthCertificate: RegExp,
  foreignPassport: RegExp,
  passportRus: RegExp,
  passportInternational: RegExp,
}

export const FormRegExps: IFormRegExps = {
  email: /^\S+@\S+\.\S+$/,
  phone: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
  ogrn: /^\d{13}$/,
  bic: /^\d{9}$/,
  account: /^\d{20}$/,
  birthCertificate: /^[IVXLC1УХЛС]+-[А-Я]{2} \d{6}$/,
  foreignPassport: /^[\d\D]*$/,
  passportRus: /^[\d]{4} [\d]{6}$/,
  passportInternational: /^[\d]{2} [\d]{7}$/,
}

/** Регулярки для МАСОК */

export interface IMaskRegExps {
  date: string,
  phone: string,
  inn: string,
  kpp: string,
  account: string,
  birthCertificate: Record<string, unknown>
  foreignPassport: Record<string, unknown>,
  passportRus: string,
  passportInternational: string,
}

export const MaskRegExps: IMaskRegExps = {
  date: '##.##.####',
  phone: '+7 (###) ###-##-##',
  inn: '##########',
  kpp: '#########',
  account: '####################',
  birthCertificate: {
    mask: 'L*-RR ######',
    tokens: {
      'L': { pattern: /[IVXLC1УХЛС]/ },
      'R': { pattern: /[А-Я]/ },
    }
  },
  foreignPassport: {
    mask: 'HHHHHHHHHHHHHHHHHHHH',
    tokens: {
      'H': { pattern: /[0-9а-яА-Яa-zA-Z]/ },
    }
  },
  passportRus: '#### ######',
  passportInternational: '## #######',
}

/**
 {
    '#': { pattern: /[0-9]/ },
    'X': { pattern: /[0-9a-zA-Z]/ },
    'S': { pattern: /[a-zA-Z]/ },
    'A': { pattern: /[a-zA-Z]/, uppercase: true },
    'a': { pattern: /[a-zA-Z]/, lowercase: true },
    '!': { escape: true },
    '*': { repeat: true }
 }
 Escape symbol escapes next token (mask !# will render #)
 Repeat symbol allows repeating current token until it’s valid (e.g. mask #* for all digits or A* A* for CARDHOLDER NAME)
 */
