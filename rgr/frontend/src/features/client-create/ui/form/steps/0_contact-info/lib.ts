type ParseFio = {
  name: string
  surname: string
  patronymic: string
}

export const parseFio = (fio: string): ParseFio => {
  const tokens = fio.split(' ')
  return { surname: tokens[0] ?? '', name: tokens[1] ?? '', patronymic: tokens[2] ?? '' }
}
