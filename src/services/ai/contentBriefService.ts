
export class ContentBriefService {
  private briefs: string[] = [
    "Create engaging content about productivity tips for remote workers",
    "Share insights about sustainable living and eco-friendly practices", 
    "Discuss the latest trends in digital marketing and social media",
    "Write about personal development and goal-setting strategies",
    "Create content about healthy lifestyle choices and wellness tips",
    "Share entrepreneurship advice for aspiring business owners",
    "Discuss technology trends and their impact on daily life",
    "Write about travel experiences and destination recommendations",
    "Create content about financial literacy and money management",
    "Share creative inspiration and artistic techniques",
    "Discuss work-life balance and stress management",
    "Write about learning new skills and professional development",
    "Create content about community building and networking",
    "Share cooking tips and healthy recipe ideas",
    "Discuss environmental conservation and climate action",
    "Write about fashion trends and sustainable clothing",
    "Create content about mental health awareness and self-care",
    "Share photography tips and visual storytelling techniques",
    "Discuss innovation in education and learning methods",
    "Write about celebrating diversity and inclusion"
  ];

  getRandomContentBrief(): string {
    const randomIndex = Math.floor(Math.random() * this.briefs.length);
    return this.briefs[randomIndex];
  }

  getAllBriefs(): string[] {
    return [...this.briefs];
  }

  addCustomBrief(brief: string): void {
    if (brief.trim() && !this.briefs.includes(brief.trim())) {
      this.briefs.push(brief.trim());
    }
  }
}

export const contentBriefService = new ContentBriefService();
