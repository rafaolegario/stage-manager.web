export function CpfMask(value: string): string {
  value = value.replace(/[^0-9]/g, '')

  if (value.length <= 11) {
    return value
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
      .replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3')
  }

  return value
}

export function CepMask(value: string): string {
  value = value.replace(/[^0-9]/g, '')

  if (value.length <= 5) {
    return value
  }

  return value
    .replace(/^(\d{5})(\d{3})$/, '$1-$2')

}

export function PhoneMask(value: string): string {
  value = value.replace(/[^0-9]/g, '')

  if (value.length <= 10) {
    return value
      .replace(/^(\d{2})(\d{5})(\d{4})$/, '($1)$2-$3')
  }

  return value
    .slice(0, 11)
    .replace(/^(\d{2})(\d{5})(\d{4})$/, '($1)$2-$3')
}