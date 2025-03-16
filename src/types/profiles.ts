export type Profile = {
  author: string
  avatar: string
  roleColor: string
  bot: boolean
  verified: boolean
  clanIcon?: string
  clanTag?: string
}

export type Profiles = {
  [key: string]: Profile
}
