export type StaffCategory =
  | "Developers"
  | "Translators"
  | "Beta Testers"
  | "Contributors"
  | "Admins"

export type StaffMember = {
  name: string
  categories: StaffCategory[]
  description: string
  imageUrl: string
  websiteUrl: string | null
}

export type StaffMembers = StaffMember[]
