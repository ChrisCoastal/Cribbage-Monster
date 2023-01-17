//playing cards
// cards are split into 3 rows and 3 columns
// CardBoxHeight will match CardSize height
// CardBoxWidth will match CardSize width / 3 * number of cards (6 / 3 * 4 = 8)
export enum CardSize {
  SM = 'w-6 h-8',
  MD = 'w-15 h-20',
  LG = 'w-30 h-40'
}

export enum CardBoxHeight {
  SM = 'h-8',
  MD = 'h-20',
  LG = 'h-40'
}

export enum CardBoxWidth {
  SM_FOUR = 'w-16',
  SM_SIX = 'w-16',
  MD_ONE = 'w-[3.75rem]',
  MD_FOUR = 'w-[7.5rem]',
  MD_FOUR_HALF = 'w-[9.375rem]',
  LG_SIX = 'w-80'
}

export enum CardOverlap {
  NONE,
  TWO_THIRDS,
  HALF
}

// badges
export enum AvatarSize {
  SM = 'h-10 w-10 text-[1.8rem]',
  MD = 'h-16 w-16 text-[3.6rem]',
  LG = 'h-20 w-20 text-[4.2rem]',
  XL = 'h-48 w-48 text-[8.8rem]'
}

export type BadgeName = 'trophy' | 'first' | 'jack' | 'five' | 'star' | 'suits';
