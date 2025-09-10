
import { GoogleGenAI, Type } from "@google/genai";
import type { BusinessInfo, OnlinePresencePlan } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema: any = {
  type: Type.OBJECT,
  properties: {
    brandingVoice: {
      type: Type.STRING,
      description: "A short description of the recommended brand voice and tone.",
    },
    websiteStrategy: {
      type: Type.OBJECT,
      description: "Recommendations for the business website.",
      properties: {
        platformSuggestion: {
          type: Type.STRING,
          description: "Suggested platform to build the website (e.g., Shopify, WordPress, Squarespace).",
        },
        keyFeatures: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "List of essential features for the website.",
        },
        designConcept: {
          type: Type.STRING,
          description: "A brief on the visual design concept (e.g., minimalist, vibrant, professional).",
        },
      },
      required: ["platformSuggestion", "keyFeatures", "designConcept"]
    },
    socialMediaPlan: {
      type: Type.ARRAY,
      description: "A plan for at least 3 relevant social media platforms.",
      items: {
        type: Type.OBJECT,
        properties: {
          platform: {
            type: Type.STRING,
            description: "Name of the social media platform (e.g., Instagram, LinkedIn).",
          },
          strategy: {
            type: Type.STRING,
            description: "The core strategy for this platform.",
          },
          contentIdeas: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 3-4 specific content ideas for this platform.",
          },
        },
        required: ["platform", "strategy", "contentIdeas"]
      },
    },
    contentMarketing: {
      type: Type.OBJECT,
      description: "Content marketing ideas.",
      properties: {
        blogIdeas: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "A list of at least 3 blog post titles/ideas.",
        },
        videoIdeas: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "A list of at least 3 video content ideas.",
        },
      },
       required: ["blogIdeas", "videoIdeas"]
    },
    seoKeywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 10-15 relevant SEO keywords, including a mix of short-tail and long-tail keywords.",
    },
  },
  required: ["brandingVoice", "websiteStrategy", "socialMediaPlan", "contentMarketing", "seoKeywords"]
};


export const generatePlan = async (info: BusinessInfo): Promise<OnlinePresencePlan> => {
  const prompt = `
    Act as an expert digital marketing strategist and business consultant.
    Based on the following business details, generate a comprehensive and actionable online presence plan.

    Business Name: ${info.name}
    Industry: ${info.industry}
    Target Audience: ${info.targetAudience}
    Business Goals: ${info.goals}

    Please provide a plan that is creative, specific, and tailored to the provided details.
    The plan should cover branding, website strategy, social media for at least 3 platforms, content marketing ideas (blogs and videos), and SEO keywords.
    `;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as OnlinePresencePlan;

  } catch (error) {
    console.error("Error generating plan:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate plan from Gemini API: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the plan.");
  }
};
