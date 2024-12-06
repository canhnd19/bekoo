import { expect, test } from 'vitest'

const add = (a: number, b: number) => a + b

test('1 + 1 = 2', () => {
  expect(add(1, 1)).toBe(2)
})
