const mongoose = require("mongoose")
const dotenv = require("dotenv")
const SalaryEntry = require("./models/SalaryEntry")

dotenv.config()
mongoose.connect(process.env.MONGO_URI)

const sampleEntries = [
  // Technology
  { jobTitle: "Software Engineer", location: "California, US", gender: "Male", ethnicity: "Asian", salary: 95000, yearsExperience: 3, education: "Bachelor's", industry: "Technology" },
  { jobTitle: "Software Engineer", location: "California, US", gender: "Female", ethnicity: "White", salary: 90000, yearsExperience: 4, education: "Bachelor's", industry: "Technology" },
  { jobTitle: "DevOps Engineer", location: "Tokyo, JP", gender: "Male", ethnicity: "Asian", salary: 92000, yearsExperience: 5, education: "Bachelor's", industry: "Technology" },
  { jobTitle: "UX Designer", location: "Paris, FR", gender: "Female", ethnicity: "White", salary: 70000, yearsExperience: 4, education: "Master's", industry: "Technology" },

  // Healthcare
  { jobTitle: "Nurse", location: "Texas, US", gender: "Female", ethnicity: "Black", salary: 67000, yearsExperience: 4, education: "Bachelor's", industry: "Healthcare" },
  { jobTitle: "Medical Assistant", location: "Ontario, CA", gender: "Male", ethnicity: "Latino", salary: 52000, yearsExperience: 2, education: "Associate's", industry: "Healthcare" },

  // Education
  { jobTitle: "Teacher", location: "New York, US", gender: "Non-binary", ethnicity: "Multiracial", salary: 58000, yearsExperience: 5, education: "Master's", industry: "Education" },
  { jobTitle: "Professor", location: "London, UK", gender: "Female", ethnicity: "Asian", salary: 72000, yearsExperience: 10, education: "PhD", industry: "Education" },

  // Finance
  { jobTitle: "Financial Analyst", location: "Toronto, CA", gender: "Male", ethnicity: "White", salary: 75000, yearsExperience: 4, education: "Bachelor's", industry: "Finance" },
  { jobTitle: "Accountant", location: "Berlin, DE", gender: "Female", ethnicity: "Black", salary: 68000, yearsExperience: 3, education: "Bachelor's", industry: "Finance" },

  // Retail
  { jobTitle: "Store Manager", location: "Florida, US", gender: "Male", ethnicity: "Pacific Islander", salary: 55000, yearsExperience: 5, education: "High School", industry: "Retail" },
  { jobTitle: "Sales Associate", location: "Sydney, AU", gender: "Female", ethnicity: "Hispanic", salary: 45000, yearsExperience: 2, education: "High School", industry: "Retail" },

  // Manufacturing
  { jobTitle: "Production Worker", location: "Michigan, US", gender: "Male", ethnicity: "Native American", salary: 48000, yearsExperience: 3, education: "High School", industry: "Manufacturing" },
  { jobTitle: "Quality Inspector", location: "Hamburg, DE", gender: "Female", ethnicity: "White", salary: 51000, yearsExperience: 4, education: "Associate's", industry: "Manufacturing" },

  // Misc
  { jobTitle: "HR Specialist", location: "Texas, US", gender: "Female", ethnicity: "Latino", salary: 60000, yearsExperience: 3, education: "Associate's", industry: "Technology" },
  { jobTitle: "Product Manager", location: "London, UK", gender: "Non-binary", ethnicity: "Asian", salary: 85000, yearsExperience: 5, education: "Master's", industry: "Technology" },
  { jobTitle: "Data Analyst", location: "New York, US", gender: "Female", ethnicity: "Black", salary: 72000, yearsExperience: 2, education: "Master's", industry: "Healthcare" },
  { jobTitle: "UX Designer", location: "Ontario, CA", gender: "Male", ethnicity: "White", salary: 68000, yearsExperience: 3, education: "Bachelor's", industry: "Technology" },
  { jobTitle: "Receptionist", location: "California, US", gender: "Female", ethnicity: "Multiracial", salary: 40000, yearsExperience: 1, education: "High School", industry: "Retail" },
  { jobTitle: "Operations Coordinator", location: "Berlin, DE", gender: "Male", ethnicity: "Asian", salary: 61000, yearsExperience: 4, education: "Bachelor's", industry: "Finance" },
  { jobTitle: "Marketing Analyst", location: "Florida, US", gender: "Female", ethnicity: "Hispanic", salary: 64000, yearsExperience: 3, education: "Bachelor's", industry: "Retail" },
  { jobTitle: "Project Manager", location: "Paris, FR", gender: "Non-binary", ethnicity: "Native American", salary: 72000, yearsExperience: 6, education: "Master's", industry: "Education" },
  { jobTitle: "Customer Support", location: "Toronto, CA", gender: "Male", ethnicity: "White", salary: 52000, yearsExperience: 2, education: "High School", industry: "Technology" },
  { jobTitle: "Software Engineer", location: "Berlin, DE", gender: "Female", ethnicity: "Asian", salary: 88000, yearsExperience: 6, education: "Bachelor's", industry: "Technology" },
  { jobTitle: "Content Writer", location: "New York, US", gender: "Female", ethnicity: "Black", salary: 57000, yearsExperience: 3, education: "Bachelor's", industry: "Education" }
]

async function seed() {
  try {
    await SalaryEntry.deleteMany({})
    await SalaryEntry.insertMany(sampleEntries)
    console.log("✅ Sample data inserted")
    process.exit()
  } catch (err) {
    console.error("❌ Failed to seed:", err)
    process.exit(1)
  }
}

seed()
