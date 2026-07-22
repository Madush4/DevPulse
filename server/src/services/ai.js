import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
console.log("Gemini key ending:", process.env.GEMINI_API_KEY?.slice(-6));
export async function generateSummary(profile) {
  const topLanguages = (profile.languages || [])
    .slice(0, 3)
    .map((language) => language.language)
    .join(", ");

  const topRepos = (profile.repos || [])
    .slice(0, 3)
    .map((repo) => `${repo.repo_name} (${repo.stars} stars)`)
    .join(", ");


  const prompt = `
You are analyzing a developer's GitHub profile data.

Based ONLY on the data provided below, return valid JSON only.
Do not use markdown.
Do not wrap the JSON in code blocks.

Return this exact JSON structure:
{
  "summary": "2-3 sentence paragraph describing the developer in third person",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2"]
}

DEVELOPER DATA:
- Username: ${profile.user.github_username}
- Display name: ${profile.user.display_name || "Not provided"}
- Bio: ${profile.user.bio || "Not provided"}
- Location: ${profile.user.location || "Not provided"}
- Followers: ${profile.user.followers}
- Public repos: ${profile.user.public_repos}
- Total commits: ${profile.stats.total_commits}
- Current streak: ${profile.stats.current_streak} days
- Longest streak: ${profile.stats.longest_streak} days
- Top languages: ${topLanguages || "Not available"}
- Top repos by stars: ${topRepos || "Not available"}

Rules:
- Be specific and honest.
- Mention actual numbers, languages, and repo names.
- Do not invent information not shown in the data.
- Each strength and improvement must be one sentence max.
`;

  try {
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.0-flash-lite",
      contents: prompt,
    });

    const cleanedText = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleanedText);

    return {
      summary: parsed.summary || "No summary available.",
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
      improvements: Array.isArray(parsed.improvements)
        ? parsed.improvements
        : [],
    };
  } catch (error) {
    console.error("AI summary generation failed:", error);

    return {
      summary:
        "AI summary is temporarily unavailable because the AI service could not generate a response.",
      strengths: [],
      improvements: [],
    };
  }
}
