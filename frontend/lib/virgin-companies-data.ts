export interface VirginCompany {
  id: string
  name: string
  logo: string
  website: string
  category: string
  status: "active" | "inactive"
  carbonFootprint: {
    current: number
    trend: number
  }
  initiatives: number
}

export const virginCompanies: VirginCompany[] = [
  {
    id: "virgin-atlantic",
    name: "Virgin Atlantic",
    logo: "/placeholder.svg?height=40&width=40",
    website: "www.virgin-atlantic.com",
    category: "Travel & Transportation",
    status: "active",
    carbonFootprint: {
      current: 1250000,
      trend: -12.5,
    },
    initiatives: 8,
  },
  {
    id: "virgin-voyages",
    name: "Virgin Voyages",
    logo: "/placeholder.svg?height=40&width=40",
    website: "www.virginvoyages.com",
    category: "Travel & Transportation",
    status: "active",
    carbonFootprint: {
      current: 980000,
      trend: -8.3,
    },
    initiatives: 6,
  },
  {
    id: "virgin-hotels",
    name: "Virgin Hotels",
    logo: "/placeholder.svg?height=40&width=40",
    website: "www.virginhotels.com",
    category: "Hospitality",
    status: "active",
    carbonFootprint: {
      current: 450000,
      trend: -15.2,
    },
    initiatives: 5,
  },
  {
    id: "virgin-media",
    name: "Virgin Media",
    logo: "/placeholder.svg?height=40&width=40",
    website: "www.virginmedia.com",
    category: "Telecommunications",
    status: "active",
    carbonFootprint: {
      current: 320000,
      trend: -18.7,
    },
    initiatives: 7,
  },
  {
    id: "virgin-active",
    name: "Virgin Active",
    logo: "/placeholder.svg?height=40&width=40",
    website: "www.virginactive.com",
    category: "Health & Fitness",
    status: "active",
    carbonFootprint: {
      current: 180000,
      trend: -5.2,
    },
    initiatives: 3,
  },
  {
    id: "virgin-galactic",
    name: "Virgin Galactic",
    logo: "/placeholder.svg?height=40&width=40",
    website: "www.virgingalactic.com",
    category: "Aerospace",
    status: "active",
    carbonFootprint: {
      current: 520000,
      trend: 2.1,
    },
    initiatives: 4,
  },
  {
    id: "virgin-hyperloop",
    name: "Virgin Hyperloop",
    logo: "/placeholder.svg?height=40&width=40",
    website: "www.virginhyperloop.com",
    category: "Transportation Technology",
    status: "active",
    carbonFootprint: {
      current: 75000,
      trend: -22.5,
    },
    initiatives: 2,
  },
  {
    id: "virgin-orbit",
    name: "Virgin Orbit",
    logo: "/placeholder.svg?height=40&width=40",
    website: "www.virginorbit.com",
    category: "Aerospace",
    status: "inactive",
    carbonFootprint: {
      current: 310000,
      trend: 0,
    },
    initiatives: 0,
  },
  {
    id: "virgin-limited-edition",
    name: "Virgin Limited Edition",
    logo: "/placeholder.svg?height=40&width=40",
    website: "www.virginlimitededition.com",
    category: "Hospitality",
    status: "active",
    carbonFootprint: {
      current: 120000,
      trend: -10.8,
    },
    initiatives: 5,
  },
  {
    id: "virgin-wines",
    name: "Virgin Wines",
    logo: "/placeholder.svg?height=40&width=40",
    website: "www.virginwines.com",
    category: "Food & Beverage",
    status: "active",
    carbonFootprint: {
      current: 85000,
      trend: -7.3,
    },
    initiatives: 2,
  },
  {
    id: "virgin-money",
    name: "Virgin Money",
    logo: "/placeholder.svg?height=40&width=40",
    website: "www.virginmoney.com",
    category: "Financial Services",
    status: "active",
    carbonFootprint: {
      current: 95000,
      trend: -12.1,
    },
    initiatives: 3,
  },
  {
    id: "virgin-pure",
    name: "Virgin Pure",
    logo: "/placeholder.svg?height=40&width=40",
    website: "www.virginpure.com",
    category: "Consumer Goods",
    status: "active",
    carbonFootprint: {
      current: 25000,
      trend: -15.5,
    },
    initiatives: 2,
  },
]

export function getCompanyCategories(): string[] {
  const categories = new Set<string>()
  categories.add("All Categories")

  virginCompanies.forEach((company) => {
    categories.add(company.category)
  })

  return Array.from(categories)
}

export function getCompanyStatuses(): string[] {
  return ["all", "active", "inactive"]
}

export function filterCompanies(searchQuery: string, categoryFilter: string, statusFilter: string): VirginCompany[] {
  return virginCompanies.filter((company) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.website.toLowerCase().includes(searchQuery.toLowerCase())

    // Category filter
    const matchesCategory = categoryFilter === "All Categories" || company.category === categoryFilter

    // Status filter
    const matchesStatus = statusFilter === "all" || company.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })
}

