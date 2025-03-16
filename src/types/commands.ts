export type Command = {
  name: string
  category: string
  description: string
  usage: string
  options?: string[]
  sub_commands?: string[]
}

export type Commands = Command[]
