
export class ContentAdaptationService {
  static adaptContentForPlatform(content: string, fromPlatform: string, toPlatform: string): string {
    const adaptations = {
      toTwitter: (text: string) => text.length > 250 ? text.substring(0, 247) + '...' : text,
      toInstagram: (text: string) => text + '\n\n#content #socialmedia',
      toLinkedIn: (text: string) => `Professional insight:\n\n${text}\n\nWhat's your experience with this?`,
      toFacebook: (text: string) => `Hey everyone! 👋\n\n${text}\n\nWhat do you think?`,
      toTikTok: (text: string) => text.split('\n')[0] + ' 🎬✨',
      toYouTube: (text: string) => `In this content:\n\n${text}\n\nSubscribe for more!`
    };

    const adaptKey = `to${toPlatform.charAt(0).toUpperCase() + toPlatform.slice(1)}` as keyof typeof adaptations;
    return adaptations[adaptKey] ? adaptations[adaptKey](content) : content;
  }
}
