// Time-based carbon footprint data for companies
interface CompanyData {
  name: string;
  logo: string;
  initials: string;
  type: string;
  carbonFootprint: {
    [key: string]: {
      current: number;
      previous: number;
      trend: number;
      target2025: number;
      monthlyData: { date: string; value: number }[];
    };
  };
  wasteReduction: {
    [key: string]: {
      current: number;
      previous: number;
      trend: number;
    };
  };
  renewableEnergy: {
    [key: string]: {
      current: number;
      previous: number;
      trend: number;
    };
  };
}

export const companyTimeSeriesData: Record<string, CompanyData> = {
  "1": {
    // Virgin Atlantic
    name: "Virgin Atlantic",
    logo: "/placeholder.svg?height=40&width=40",
    initials: "VA",
    type: "airline",
    carbonFootprint: {
      // Last 30 days
      "30d": {
        current: 850000,
        previous: 920000,
        trend: -7.6,
        target2025: 600000,
        monthlyData: [
          { date: "2025-02-19", value: 71000 },
          { date: "2025-02-26", value: 70500 },
          { date: "2025-03-05", value: 70000 },
          { date: "2025-03-12", value: 69000 },
          { date: "2025-03-19", value: 68500 },
        ],
      },
      // Last 2 months
      "2m": {
        current: 870000,
        previous: 930000,
        trend: -6.5,
        target2025: 600000,
        monthlyData: [
          { date: "2025-01-19", value: 73000 },
          { date: "2025-01-26", value: 72500 },
          { date: "2025-02-02", value: 72000 },
          { date: "2025-02-09", value: 71500 },
          { date: "2025-02-16", value: 71000 },
          { date: "2025-02-23", value: 70500 },
          { date: "2025-03-02", value: 70000 },
          { date: "2025-03-09", value: 69500 },
          { date: "2025-03-16", value: 69000 },
        ],
      },
      // Last 6 months
      "6m": {
        current: 890000,
        previous: 950000,
        trend: -6.3,
        target2025: 600000,
        monthlyData: [
          { date: "2024-09-19", value: 78000 },
          { date: "2024-10-19", value: 76000 },
          { date: "2024-11-19", value: 74000 },
          { date: "2024-12-19", value: 73000 },
          { date: "2025-01-19", value: 72000 },
          { date: "2025-02-19", value: 71000 },
          { date: "2025-03-19", value: 69000 },
        ],
      },
      // Last year
      "1y": {
        current: 920000,
        previous: 1050000,
        trend: -12.4,
        target2025: 600000,
        monthlyData: [
          { date: "2024-03-19", value: 87000 },
          { date: "2024-05-19", value: 85000 },
          { date: "2024-07-19", value: 82000 },
          { date: "2024-09-19", value: 78000 },
          { date: "2024-11-19", value: 74000 },
          { date: "2025-01-19", value: 72000 },
          { date: "2025-03-19", value: 69000 },
        ],
      },
      // Last 2 years
      "2y": {
        current: 920000,
        previous: 1200000,
        trend: -23.3,
        target2025: 600000,
        monthlyData: [
          { date: "2023-03-19", value: 100000 },
          { date: "2023-07-19", value: 95000 },
          { date: "2023-11-19", value: 90000 },
          { date: "2024-03-19", value: 87000 },
          { date: "2024-07-19", value: 82000 },
          { date: "2024-11-19", value: 74000 },
          { date: "2025-03-19", value: 69000 },
        ],
      },
    },
    wasteReduction: {
      "30d": { current: 68, previous: 62, trend: 9.7 },
      "2m": { current: 67, previous: 61, trend: 9.8 },
      "6m": { current: 65, previous: 58, trend: 12.1 },
      "1y": { current: 62, previous: 52, trend: 19.2 },
      "2y": { current: 62, previous: 45, trend: 37.8 },
    },
    renewableEnergy: {
      "30d": { current: 42, previous: 35, trend: 20.0 },
      "2m": { current: 40, previous: 34, trend: 17.6 },
      "6m": { current: 38, previous: 32, trend: 18.8 },
      "1y": { current: 35, previous: 28, trend: 25.0 },
      "2y": { current: 35, previous: 22, trend: 59.1 },
    },
  },
  "2": {
    // Virgin Voyages
    name: "Virgin Voyages",
    logo: "/placeholder.svg?height=40&width=40",
    initials: "VV",
    type: "cruise",
    carbonFootprint: {
      // Last 30 days
      "30d": {
        current: 420000,
        previous: 380000,
        trend: 10.5,
        target2025: 300000,
        monthlyData: [
          { date: "2025-02-19", value: 34000 },
          { date: "2025-02-26", value: 34500 },
          { date: "2025-03-05", value: 35000 },
          { date: "2025-03-12", value: 35500 },
          { date: "2025-03-19", value: 36000 },
        ],
      },
      // Last 2 months
      "2m": {
        current: 410000,
        previous: 375000,
        trend: 9.3,
        target2025: 300000,
        monthlyData: [
          { date: "2025-01-19", value: 33000 },
          { date: "2025-01-26", value: 33500 },
          { date: "2025-02-02", value: 34000 },
          { date: "2025-02-09", value: 34500 },
          { date: "2025-02-16", value: 35000 },
          { date: "2025-02-23", value: 35500 },
          { date: "2025-03-02", value: 36000 },
          { date: "2025-03-09", value: 36500 },
          { date: "2025-03-16", value: 37000 },
        ],
      },
      // Last 6 months
      "6m": {
        current: 400000,
        previous: 370000,
        trend: 8.1,
        target2025: 300000,
        monthlyData: [
          { date: "2024-09-19", value: 32000 },
          { date: "2024-10-19", value: 32500 },
          { date: "2024-11-19", value: 33000 },
          { date: "2024-12-19", value: 33500 },
          { date: "2025-01-19", value: 34000 },
          { date: "2025-02-19", value: 35000 },
          { date: "2025-03-19", value: 36000 },
        ],
      },
      // Last year
      "1y": {
        current: 400000,
        previous: 360000,
        trend: 11.1,
        target2025: 300000,
        monthlyData: [
          { date: "2024-03-19", value: 30000 },
          { date: "2024-05-19", value: 31000 },
          { date: "2024-07-19", value: 32000 },
          { date: "2024-09-19", value: 33000 },
          { date: "2024-11-19", value: 34000 },
          { date: "2025-01-19", value: 35000 },
          { date: "2025-03-19", value: 36000 },
        ],
      },
      // Last 2 years
      "2y": {
        current: 400000,
        previous: 340000,
        trend: 17.6,
        target2025: 300000,
        monthlyData: [
          { date: "2023-03-19", value: 28000 },
          { date: "2023-07-19", value: 29000 },
          { date: "2023-11-19", value: 30000 },
          { date: "2024-03-19", value: 31000 },
          { date: "2024-07-19", value: 33000 },
          { date: "2024-11-19", value: 35000 },
          { date: "2025-03-19", value: 36000 },
        ],
      },
    },
    wasteReduction: {
      "30d": { current: 82, previous: 75, trend: 9.3 },
      "2m": { current: 80, previous: 74, trend: 8.1 },
      "6m": { current: 78, previous: 72, trend: 8.3 },
      "1y": { current: 75, previous: 68, trend: 10.3 },
      "2y": { current: 75, previous: 60, trend: 25.0 },
    },
    renewableEnergy: {
      "30d": { current: 28, previous: 22, trend: 27.3 },
      "2m": { current: 27, previous: 21, trend: 28.6 },
      "6m": { current: 25, previous: 20, trend: 25.0 },
      "1y": { current: 22, previous: 18, trend: 22.2 },
      "2y": { current: 22, previous: 15, trend: 46.7 },
    },
  },
  "3": {
    // Virgin Hotels
    name: "Virgin Hotels",
    logo: "/placeholder.svg?height=40&width=40",
    initials: "VH",
    type: "hospitality",
    carbonFootprint: {
      // Last 30 days
      "30d": {
        current: 320000,
        previous: 350000,
        trend: -8.6,
        target2025: 250000,
        monthlyData: [
          { date: "2025-02-19", value: 27000 },
          { date: "2025-02-26", value: 26500 },
          { date: "2025-03-05", value: 26000 },
          { date: "2025-03-12", value: 25500 },
          { date: "2025-03-19", value: 25000 },
        ],
      },
      // Last 2 months
      "2m": {
        current: 325000,
        previous: 355000,
        trend: -8.5,
        target2025: 250000,
        monthlyData: [
          { date: "2025-01-19", value: 28000 },
          { date: "2025-01-26", value: 27500 },
          { date: "2025-02-02", value: 27000 },
          { date: "2025-02-09", value: 26500 },
          { date: "2025-02-16", value: 26000 },
          { date: "2025-02-23", value: 25500 },
          { date: "2025-03-02", value: 25000 },
          { date: "2025-03-09", value: 24500 },
          { date: "2025-03-16", value: 24000 },
        ],
      },
      // Last 6 months
      "6m": {
        current: 330000,
        previous: 360000,
        trend: -8.3,
        target2025: 250000,
        monthlyData: [
          { date: "2024-09-19", value: 29000 },
          { date: "2024-10-19", value: 28500 },
          { date: "2024-11-19", value: 28000 },
          { date: "2024-12-19", value: 27500 },
          { date: "2025-01-19", value: 27000 },
          { date: "2025-02-19", value: 26000 },
          { date: "2025-03-19", value: 25000 },
        ],
      },
      // Last year
      "1y": {
        current: 340000,
        previous: 380000,
        trend: -10.5,
        target2025: 250000,
        monthlyData: [
          { date: "2024-03-19", value: 31000 },
          { date: "2024-05-19", value: 30000 },
          { date: "2024-07-19", value: 29000 },
          { date: "2024-09-19", value: 28000 },
          { date: "2024-11-19", value: 27000 },
          { date: "2025-01-19", value: 26000 },
          { date: "2025-03-19", value: 25000 },
        ],
      },
      // Last 2 years
      "2y": {
        current: 340000,
        previous: 400000,
        trend: -15.0,
        target2025: 250000,
        monthlyData: [
          { date: "2023-03-19", value: 33000 },
          { date: "2023-07-19", value: 32000 },
          { date: "2023-11-19", value: 31000 },
          { date: "2024-03-19", value: 30000 },
          { date: "2024-07-19", value: 28000 },
          { date: "2024-11-19", value: 26000 },
          { date: "2025-03-19", value: 25000 },
        ],
      },
    },
    wasteReduction: {
      "30d": { current: 75, previous: 68, trend: 10.3 },
      "2m": { current: 74, previous: 67, trend: 10.4 },
      "6m": { current: 72, previous: 65, trend: 10.8 },
      "1y": { current: 68, previous: 60, trend: 13.3 },
      "2y": { current: 68, previous: 52, trend: 30.8 },
    },
    renewableEnergy: {
      "30d": { current: 65, previous: 52, trend: 25.0 },
      "2m": { current: 63, previous: 51, trend: 23.5 },
      "6m": { current: 60, previous: 48, trend: 25.0 },
      "1y": { current: 55, previous: 42, trend: 31.0 },
      "2y": { current: 55, previous: 35, trend: 57.1 },
    },
  },
  "4": {
    // Virgin Media
    name: "Virgin Media",
    logo: "/placeholder.svg?height=40&width=40",
    initials: "VM",
    type: "telecommunications",
    carbonFootprint: {
      // Last 30 days
      "30d": {
        current: 280000,
        previous: 310000,
        trend: -9.7,
        target2025: 200000,
        monthlyData: [
          { date: "2025-02-19", value: 24000 },
          { date: "2025-02-26", value: 23500 },
          { date: "2025-03-05", value: 23000 },
          { date: "2025-03-12", value: 22500 },
          { date: "2025-03-19", value: 22000 },
        ],
      },
      // Last 2 months
      "2m": {
        current: 285000,
        previous: 315000,
        trend: -9.5,
        target2025: 200000,
        monthlyData: [
          { date: "2025-01-19", value: 25000 },
          { date: "2025-01-26", value: 24500 },
          { date: "2025-02-02", value: 24000 },
          { date: "2025-02-09", value: 23500 },
          { date: "2025-02-16", value: 23000 },
          { date: "2025-02-23", value: 22500 },
          { date: "2025-03-02", value: 22000 },
          { date: "2025-03-09", value: 21500 },
          { date: "2025-03-16", value: 21000 },
        ],
      },
      // Last 6 months
      "6m": {
        current: 290000,
        previous: 320000,
        trend: -9.4,
        target2025: 200000,
        monthlyData: [
          { date: "2024-09-19", value: 26000 },
          { date: "2024-10-19", value: 25500 },
          { date: "2024-11-19", value: 25000 },
          { date: "2024-12-19", value: 24500 },
          { date: "2025-01-19", value: 24000 },
          { date: "2025-02-19", value: 23000 },
          { date: "2025-03-19", value: 22000 },
        ],
      },
      // Last year
      "1y": {
        current: 300000,
        previous: 340000,
        trend: -11.8,
        target2025: 200000,
        monthlyData: [
          { date: "2024-03-19", value: 28000 },
          { date: "2024-05-19", value: 27000 },
          { date: "2024-07-19", value: 26000 },
          { date: "2024-09-19", value: 25000 },
          { date: "2024-11-19", value: 24000 },
          { date: "2025-01-19", value: 23000 },
          { date: "2025-03-19", value: 22000 },
        ],
      },
      // Last 2 years
      "2y": {
        current: 300000,
        previous: 360000,
        trend: -16.7,
        target2025: 200000,
        monthlyData: [
          { date: "2023-03-19", value: 30000 },
          { date: "2023-07-19", value: 29000 },
          { date: "2023-11-19", value: 28000 },
          { date: "2024-03-19", value: 27000 },
          { date: "2024-07-19", value: 25000 },
          { date: "2024-11-19", value: 23000 },
          { date: "2025-03-19", value: 22000 },
        ],
      },
    },
    wasteReduction: {
      "30d": { current: 70, previous: 65, trend: 7.7 },
      "2m": { current: 69, previous: 64, trend: 7.8 },
      "6m": { current: 67, previous: 62, trend: 8.1 },
      "1y": { current: 65, previous: 58, trend: 12.1 },
      "2y": { current: 65, previous: 50, trend: 30.0 },
    },
    renewableEnergy: {
      "30d": { current: 55, previous: 48, trend: 14.6 },
      "2m": { current: 53, previous: 47, trend: 12.8 },
      "6m": { current: 50, previous: 45, trend: 11.1 },
      "1y": { current: 48, previous: 40, trend: 20.0 },
      "2y": { current: 48, previous: 32, trend: 50.0 },
    },
  },
  "5": {
    // Virgin Active
    name: "Virgin Active",
    logo: "/placeholder.svg?height=40&width=40",
    initials: "VA",
    type: "fitness",
    carbonFootprint: {
      // Last 30 days
      "30d": {
        current: 95000,
        previous: 90000,
        trend: 5.6,
        target2025: 70000,
        monthlyData: [
          { date: "2025-02-19", value: 7800 },
          { date: "2025-02-26", value: 7900 },
          { date: "2025-03-05", value: 8000 },
          { date: "2025-03-12", value: 8100 },
          { date: "2025-03-19", value: 8200 },
        ],
      },
      // Last 2 months
      "2m": {
        current: 94000,
        previous: 89000,
        trend: 5.6,
        target2025: 70000,
        monthlyData: [
          { date: "2025-01-19", value: 7600 },
          { date: "2025-01-26", value: 7700 },
          { date: "2025-02-02", value: 7800 },
          { date: "2025-02-09", value: 7900 },
          { date: "2025-02-16", value: 8000 },
          { date: "2025-02-23", value: 8100 },
          { date: "2025-03-02", value: 8200 },
          { date: "2025-03-09", value: 8300 },
          { date: "2025-03-16", value: 8400 },
        ],
      },
      // Last 6 months
      "6m": {
        current: 93000,
        previous: 88000,
        trend: 5.7,
        target2025: 70000,
        monthlyData: [
          { date: "2024-09-19", value: 7400 },
          { date: "2024-10-19", value: 7500 },
          { date: "2024-11-19", value: 7600 },
          { date: "2024-12-19", value: 7700 },
          { date: "2025-01-19", value: 7800 },
          { date: "2025-02-19", value: 8000 },
          { date: "2025-03-19", value: 8200 },
        ],
      },
      // Last year
      "1y": {
        current: 92000,
        previous: 86000,
        trend: 7.0,
        target2025: 70000,
        monthlyData: [
          { date: "2024-03-19", value: 7200 },
          { date: "2024-05-19", value: 7300 },
          { date: "2024-07-19", value: 7400 },
          { date: "2024-09-19", value: 7600 },
          { date: "2024-11-19", value: 7800 },
          { date: "2025-01-19", value: 8000 },
          { date: "2025-03-19", value: 8200 },
        ],
      },
      // Last 2 years
      "2y": {
        current: 92000,
        previous: 84000,
        trend: 9.5,
        target2025: 70000,
        monthlyData: [
          { date: "2023-03-19", value: 7000 },
          { date: "2023-07-19", value: 7100 },
          { date: "2023-11-19", value: 7200 },
          { date: "2024-03-19", value: 7400 },
          { date: "2024-07-19", value: 7600 },
          { date: "2024-11-19", value: 7900 },
          { date: "2025-03-19", value: 8200 },
        ],
      },
    },
    wasteReduction: {
      "30d": { current: 60, previous: 55, trend: 9.1 },
      "2m": { current: 59, previous: 54, trend: 9.3 },
      "6m": { current: 57, previous: 52, trend: 9.6 },
      "1y": { current: 55, previous: 48, trend: 14.6 },
      "2y": { current: 55, previous: 42, trend: 31.0 },
    },
    renewableEnergy: {
      "30d": { current: 38, previous: 30, trend: 26.7 },
      "2m": { current: 37, previous: 29, trend: 27.6 },
      "6m": { current: 35, previous: 28, trend: 25.0 },
      "1y": { current: 32, previous: 25, trend: 28.0 },
      "2y": { current: 32, previous: 20, trend: 60.0 },
    },
  },
};

// Helper function to get company data for a specific timeframe
export function getCompanyDataForTimeframe(
  companyId: string,
  timeframe: string
) {
  if(companyId === undefined || timeframe === undefined) return null;
  const company = companyTimeSeriesData[companyId];
  if (!company) return null;

  return {
    id: companyId,
    name: company.name,
    logo: company.logo,
    initials: company.initials,
    type: company.type,
    carbonFootprint:
      company.carbonFootprint[timeframe] || company.carbonFootprint["30d"],
    wasteReduction:
      company.wasteReduction[timeframe] || company.wasteReduction["30d"],
    renewableEnergy:
      company.renewableEnergy[timeframe] || company.renewableEnergy["30d"],
  };
}

// Get all companies for a specific timeframe
export function getAllCompaniesForTimeframe(timeframe: string) {
  return Object.keys(companyTimeSeriesData).map((companyId) =>
    getCompanyDataForTimeframe(companyId, timeframe)
  );
}
