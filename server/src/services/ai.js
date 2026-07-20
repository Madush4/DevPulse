import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
 
export async function generateSummary(profile) {
  const topLanguages = (profile.languages || [])
    .slice(0, 3)
    .map((l) => l.language)
    .join(",");

  const topRepos =( profile.repos || [])
    .slice(0, 3)
    .map((r) => `${r.repo_name} (${r.stars} stars)`)
    .join(",");

  const prompt = `
    You are analyzing a developer's GitHub profile data. Based ONLY on the data provided below, write an honest and specific developer profile.

DEVELOPER DATA:
- Username: ${profile.user.github_username}
- Display name: ${profile.user.display_name || "Not provided"}
- Bio: ${profile.user.bio || "Not provided"}
- Location: ${profile.user.location || "Not provided"}
- Followers: ${profile.user.followers}
- Public repos: ${profile.user.public_repos}
- Total commits (last 90 days): ${profile.stats.total_commits}
- Current streak: ${profile.stats.current_streak} days
- Longest streak: ${profile.stats.longest_streak} days
- Top languages: ${topLanguages || "Not available"}
- Top repos by stars: ${topRepos || "Not available"}

Rules:
- Be specific — mention actual numbers, languages, and repo names
- Be honest — if streak is 0, don't say they are consistent
- Do not invent information not in the data
- Strengths and improvements must each be one sentence max
    `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            summary: {
              type: "string",
              description:
                "2-3 sentence paragraph describing the developer. Be specific and use the actual data . Write in third person.",
            },
            strengths: {
              type: "array",
              items: {
                type: "string",
              },
              description:
                "Exactly 3 specific strengths based on data, one sentence max each",
            },

            improvements: {
              type: "array",
              items: {
                type: "string",
              },
              description:
                "Exactly 2 specific areas to improve based on data, one sentence max each",
            },
          },

          required: ["summary", "strengths", "improvements"],
        },
      },
    });

    const parsed = JSON.parse(response.text);

    return {
      summary: parsed.summary || "No summary available",
      strengths: parsed.strengths || [],
      improvements: parsed.improvements || [],
    };
  } catch (error) {
    console.error("AI summary generation failed:", error.message);
    return {
      summary: "AI summary could not be generated at this time .",
      strengths: [],
      improvements: [],
    };
  }
}
