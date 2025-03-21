export interface Idea {
  id: string
  title: string
  description: string
  author: {
    name: string
    company: string
    avatar: string
    initials: string
  }
  category: "environmental" | "social" | "circular"
  votes: number
  comments: Comment[]
  lookingForCollaborators: boolean
  date: string
  expectedImpact?: string
  potentialCollaborators?: string[]
  resourcesNeeded?: string
}

export interface Comment {
  id: string
  author: {
    name: string
    company: string
    avatar: string
    initials: string
  }
  date: string
  content: string
  likes: number
}

export const ideasData: Idea[] = [
  {
    id: "1",
    title: "Cross-Brand Recycling Program",
    description:
      "Create a unified recycling system across all Virgin properties that allows customers to drop off recyclables at any location. This would increase recycling rates and create a consistent sustainability experience across the Virgin ecosystem.\n\nThe program would include standardized recycling bins, educational materials, and a tracking system to measure impact. Staff would receive training on proper recycling procedures, and customers would be incentivized to participate through loyalty program points or other rewards.\n\nThis idea builds on existing recycling programs at individual Virgin companies but creates a cohesive, branded experience that reinforces Virgin's commitment to sustainability across all customer touchpoints.",
    author: {
      name: "Sarah Johnson",
      company: "Virgin Hotels",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    category: "circular",
    votes: 24,
    comments: [
      {
        id: "c1",
        author: {
          name: "Michael Chen",
          company: "Virgin Media",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "MC",
        },
        date: "2025-03-15",
        content:
          "This is a fantastic idea! Virgin Media has been looking for ways to improve our recycling program, and a cross-brand approach would be much more effective than each company working independently.",
        likes: 5,
      },
      {
        id: "c2",
        author: {
          name: "Emma Wilson",
          company: "Virgin Voyages",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "EW",
        },
        date: "2025-03-14",
        content:
          "I love this concept. On our ships, we've seen that clear signage and staff education are key to successful recycling programs. Happy to share our learnings if this moves forward.",
        likes: 3,
      },
    ],
    lookingForCollaborators: true,
    date: "2025-03-18",
    expectedImpact:
      "This program could divert an estimated 500,000 kg of waste from landfills annually across all Virgin properties. It would also create a more consistent customer experience and reinforce Virgin's sustainability brand.",
    potentialCollaborators: ["Virgin Atlantic", "Virgin Voyages", "Virgin Media"],
    resourcesNeeded:
      "Standardized recycling bins, signage, staff training materials, and a cross-company working group to implement and monitor the program.",
  },
  {
    id: "2",
    title: "Community Solar Initiative",
    description:
      "Partner with local communities to install solar panels on public buildings, with Virgin providing initial funding and technical expertise. The energy generated could be shared between Virgin properties and the community.",
    author: {
      name: "Michael Chen",
      company: "Virgin Media",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MC",
    },
    category: "environmental",
    votes: 18,
    comments: [],
    lookingForCollaborators: true,
    date: "2025-03-17",
    expectedImpact:
      "This initiative could generate clean energy for both Virgin properties and local communities, reducing carbon emissions and energy costs.",
    potentialCollaborators: ["Virgin Hotels", "Virgin Investments"],
    resourcesNeeded: "Initial funding for solar installations, technical expertise, and community partnerships.",
  },
  {
    id: "3",
    title: "Digital Skills for All",
    description:
      "Launch a program to provide digital literacy training to underserved communities, leveraging Virgin Media's expertise and infrastructure. This could help bridge the digital divide and create more inclusive communities.",
    author: {
      name: "Emma Wilson",
      company: "Virgin Media",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "EW",
    },
    category: "social",
    votes: 32,
    comments: [],
    lookingForCollaborators: false,
    date: "2025-03-15",
    expectedImpact:
      "This program could provide digital skills training to thousands of people, improving their employment prospects and quality of life.",
    potentialCollaborators: [],
    resourcesNeeded: "Training materials, volunteer instructors, and community spaces for classes.",
  },
]

export function getIdeaById(id: string): Idea | undefined {
  return ideasData.find((idea) => idea.id === id)
}

