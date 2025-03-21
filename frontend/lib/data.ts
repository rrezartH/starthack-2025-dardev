export interface Initiative {
  id: string;
  title: string;
  summary: string;
  callToAction: string;
  link: string;
  category: string;
  status: "active" | "completed" | "planned";
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  image: string;
  impact: {
    co2Reduced: number;
    peopleImpacted: number;
    resourcesSaved: number;
  };
  ratings: {
    average: number;
    count: number;
  };
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  date: string;
  content: string;
  rating: number;
}

export const initiatives: Initiative[] = [
  {
    id: "1",
    title: "Carbon Neutral Aviation",
    summary:
      "Developing sustainable aviation fuel and carbon offset programs to make Virgin flights carbon neutral by 2030.",
    callToAction: "Support Carbon Neutral Flights",
    link: "/initiatives/carbon-neutral-aviation",
    category: "Climate Action",
    status: "active",
    location: {
      name: "Global",
      lat: 51.5074,
      lng: -0.1278,
    },
    image: "/images/carbon.jpg",
    impact: {
      co2Reduced: 250000,
      peopleImpacted: 5000000,
      resourcesSaved: 0,
    },
    ratings: {
      average: 4.7,
      count: 128,
    },
    comments: [
      {
        id: "c1",
        author: "Jane Smith",
        date: "2023-12-15",
        content:
          "I'm impressed with Virgin's commitment to sustainable aviation. The carbon offset program is easy to use when booking flights.",
        rating: 5,
      },
      {
        id: "c2",
        author: "Mark Johnson",
        date: "2023-11-30",
        content:
          "Great initiative, but I'd like to see more transparency about how the carbon offsets are being used.",
        rating: 4,
      },
    ],
  },
  {
    id: "2",
    title: "Ocean Plastic Recovery",
    summary:
      "Partnering with ocean cleanup organizations to remove plastic waste from the world's oceans and incorporate recycled materials into Virgin products.",
    callToAction: "Join Ocean Cleanup",
    link: "/initiatives/ocean-plastic-recovery",
    category: "Ocean Conservation",
    status: "active",
    location: {
      name: "Pacific Ocean",
      lat: 28.3699,
      lng: -177.3734,
    },
    image: "/images/carbon.jpg",
    impact: {
      co2Reduced: 0,
      peopleImpacted: 1000000,
      resourcesSaved: 500000,
    },
    ratings: {
      average: 4.9,
      count: 203,
    },
    comments: [
      {
        id: "c3",
        author: "Sarah Williams",
        date: "2024-01-10",
        content:
          "I participated in a beach cleanup organized by Virgin. It was well-organized and really made an impact on the local shoreline.",
        rating: 5,
      },
    ],
  },
  {
    id: "3",
    title: "Renewable Energy Transition",
    summary:
      "Transitioning all Virgin properties and operations to 100% renewable energy sources by 2025.",
    callToAction: "Learn About Renewable Energy",
    link: "/initiatives/renewable-energy-transition",
    category: "Clean Energy",
    status: "active",
    location: {
      name: "Multiple Locations",
      lat: 40.7128,
      lng: -74.006,
    },
    image: "/images/carbon.jpg",
    impact: {
      co2Reduced: 750000,
      peopleImpacted: 2000000,
      resourcesSaved: 0,
    },
    ratings: {
      average: 4.5,
      count: 87,
    },
    comments: [
      {
        id: "c4",
        author: "David Chen",
        date: "2023-10-05",
        content:
          "The solar installation at the Virgin Hotel in Las Vegas is impressive. Great to see the company walking the talk.",
        rating: 5,
      },
    ],
  },
  {
    id: "4",
    title: "Sustainable Supply Chain",
    summary:
      "Implementing rigorous sustainability standards across Virgin's global supply chain to reduce environmental impact and ensure ethical practices.",
    callToAction: "Support Sustainable Suppliers",
    link: "/initiatives/sustainable-supply-chain",
    category: "Responsible Consumption",
    status: "active",
    location: {
      name: "Global",
      lat: 0,
      lng: 0,
    },
    image: "/images/carbon.jpg",
    impact: {
      co2Reduced: 320000,
      peopleImpacted: 500000,
      resourcesSaved: 250000,
    },
    ratings: {
      average: 4.2,
      count: 56,
    },
    comments: [
      {
        id: "c5",
        author: "Lisa Thompson",
        date: "2023-09-18",
        content:
          "I appreciate the transparency in Virgin's supply chain reporting. Would love to see more details about worker conditions.",
        rating: 4,
      },
    ],
  },
  {
    id: "5",
    title: "Zero Waste Operations",
    summary:
      "Eliminating single-use plastics and implementing comprehensive recycling and composting programs across all Virgin businesses.",
    callToAction: "Reduce Your Waste",
    link: "/initiatives/zero-waste-operations",
    category: "Waste Reduction",
    status: "active",
    location: {
      name: "Global",
      lat: 34.0522,
      lng: -118.2437,
    },
    image: "/images/carbon.jpg",
    impact: {
      co2Reduced: 180000,
      peopleImpacted: 3000000,
      resourcesSaved: 800000,
    },
    ratings: {
      average: 4.6,
      count: 112,
    },
    comments: [
      {
        id: "c6",
        author: "Michael Brown",
        date: "2024-02-20",
        content:
          "The elimination of plastic bottles on Virgin Voyages ships is a great step. Hope to see this expanded to all Virgin businesses.",
        rating: 5,
      },
    ],
  },
  {
    id: "6",
    title: "Biodiversity Protection",
    summary:
      "Supporting conservation projects to protect endangered species and restore natural habitats in regions where Virgin operates.",
    callToAction: "Protect Wildlife",
    link: "/initiatives/biodiversity-protection",
    category: "Conservation",
    status: "planned",
    location: {
      name: "Caribbean",
      lat: 18.2208,
      lng: -66.5901,
    },
    image: "/images/carbon.jpg",
    impact: {
      co2Reduced: 0,
      peopleImpacted: 100000,
      resourcesSaved: 0,
    },
    ratings: {
      average: 4.8,
      count: 45,
    },
    comments: [
      {
        id: "c7",
        author: "Emma Wilson",
        date: "2023-11-12",
        content:
          "The coral reef restoration project in the Caribbean is making a real difference. I visited last year and was amazed by the progress.",
        rating: 5,
      },
    ],
  },
  {
    id: "7",
    title: "Community Solar Projects",
    summary:
      "Investing in community solar projects to provide clean energy access to underserved communities near Virgin operations.",
    callToAction: "Support Community Solar",
    link: "/initiatives/community-solar-projects",
    category: "Clean Energy",
    status: "active",
    location: {
      name: "Multiple Locations",
      lat: 37.7749,
      lng: -122.4194,
    },
    image: "/images/carbon.jpg",
    impact: {
      co2Reduced: 420000,
      peopleImpacted: 250000,
      resourcesSaved: 0,
    },
    ratings: {
      average: 4.4,
      count: 78,
    },
    comments: [
      {
        id: "c8",
        author: "Robert Garcia",
        date: "2023-08-30",
        content:
          "The community solar project in my neighborhood has reduced energy bills and created local jobs. Thank you, Virgin!",
        rating: 5,
      },
    ],
  },
  {
    id: "8",
    title: "Sustainable Tourism",
    summary:
      "Developing and promoting sustainable tourism practices that minimize environmental impact while supporting local economies.",
    callToAction: "Travel Sustainably",
    link: "/initiatives/sustainable-tourism",
    category: "Responsible Travel",
    status: "active",
    location: {
      name: "Global",
      lat: -33.8688,
      lng: 151.2093,
    },
    image: "/images/carbon.jpg",
    impact: {
      co2Reduced: 150000,
      peopleImpacted: 1500000,
      resourcesSaved: 300000,
    },
    ratings: {
      average: 4.3,
      count: 92,
    },
    comments: [
      {
        id: "c9",
        author: "Jennifer Lee",
        date: "2024-01-25",
        content:
          "Virgin's eco-tourism guidelines have helped me make better choices when traveling. Would love to see more sustainable destination options.",
        rating: 4,
      },
    ],
  },
];

export const categories = [
  "All",
  "Climate Action",
  "Ocean Conservation",
  "Clean Energy",
  "Responsible Consumption",
  "Waste Reduction",
  "Conservation",
  "Responsible Travel",
];

export const statuses = ["All", "active", "completed", "planned"];

export function getInitiativeById(id: string): Initiative | undefined {
  return initiatives.find((initiative) => initiative.id === id);
}

export function getInitiativesByCategory(category: string): Initiative[] {
  if (category === "All") return initiatives;
  return initiatives.filter((initiative) => initiative.category === category);
}

export function getInitiativesByStatus(status: string): Initiative[] {
  if (status === "All") return initiatives;
  return initiatives.filter((initiative) => initiative.status === status);
}

export function searchInitiatives(query: string): Initiative[] {
  const lowercaseQuery = query.toLowerCase();
  return initiatives.filter(
    (initiative) =>
      initiative.title.toLowerCase().includes(lowercaseQuery) ||
      initiative.summary.toLowerCase().includes(lowercaseQuery) ||
      initiative.category.toLowerCase().includes(lowercaseQuery)
  );
}
