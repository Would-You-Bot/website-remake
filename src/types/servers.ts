export type ServerMarquee = {
  name: string
  members: string
  avatar: string
  partnered: boolean
  verified: boolean
  invite: string
}

export interface Server extends ServerMarquee {
  id: string
  vanityURLCode: string
  iconURL: string
}
