
export interface BusinessInfo {
  name: string;
  industry: string;
  targetAudience: string;
  goals: string;
}

export interface WebsiteStrategy {
  platformSuggestion: string;
  keyFeatures: string[];
  designConcept: string;
}

export interface SocialMediaPlatformPlan {
  platform: string;
  strategy: string;
  contentIdeas: string[];
}

export interface ContentMarketing {
  blogIdeas: string[];
  videoIdeas: string[];
}

export interface OnlinePresencePlan {
  brandingVoice: string;
  websiteStrategy: WebsiteStrategy;
  socialMediaPlan: SocialMediaPlatformPlan[];
  contentMarketing: ContentMarketing;
  seoKeywords: string[];
}
