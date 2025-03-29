/**
 * Interest categories and tags for user profiles
 */
export const interestCategories = [
    {
      name: "Technology",
      interests: [
        "JavaScript",
        "React",
        "Node.js",
        "Python",
        "Machine Learning",
        "Artificial Intelligence",
        "Web Development",
        "Mobile Development",
        "Data Science",
        "Blockchain",
        "Cybersecurity",
        "Cloud Computing",
      ],
    },
    {
      name: "Business",
      interests: [
        "Entrepreneurship",
        "Marketing",
        "Finance",
        "Startups",
        "E-commerce",
        "Management",
        "Sales",
        "Business Strategy",
        "Product Management",
        "Leadership",
      ],
    },
    {
      name: "Creative",
      interests: [
        "Design",
        "UI/UX Design",
        "Graphic Design",
        "Photography",
        "Videography",
        "Writing",
        "Music",
        "Art",
        "Animation",
        "Fashion",
      ],
    },
    {
      name: "Lifestyle",
      interests: ["Travel", "Fitness", "Health", "Food", "Cooking", "Yoga", "Meditation", "Reading", "Gaming", "Sports"],
    },
    {
      name: "Education",
      interests: [
        "Teaching",
        "Learning",
        "Languages",
        "History",
        "Science",
        "Mathematics",
        "Literature",
        "Philosophy",
        "Psychology",
        "Self-improvement",
      ],
    },
  ]
  
  /**
   * Get all interests as a flat array
   * @returns {string[]} Array of all interests
   */
  export const getAllInterests = () => {
    return interestCategories.flatMap((category) => category.interests)
  }
  
  /**
   * Find matching interests based on a search query
   * @param {string} query - Search query
   * @returns {string[]} Array of matching interests
   */
  export const searchInterests = (query) => {
    if (!query || query.trim() === "") {
      return []
    }
  
    const normalizedQuery = query.toLowerCase().trim()
    const allInterests = getAllInterests()
  
    return allInterests.filter((interest) => interest.toLowerCase().includes(normalizedQuery))
  }
  
  