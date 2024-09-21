import { ExternalLink } from 'lucide-react';
import Image from 'next/image';



export default function SocialIcons({name,width=100,height=100}:{name?:string,width?:number,height?:number}){
  switch (name?.toLowerCase()) {
    case 'linkedin':
      return <Image src="/icons/linkedin.svg" alt='Linkedin' width={width} height={height}/>
    case 'twitter':
      return <Image src="/icons/twitter.svg" alt='Linkedin' width={width} height={height}/>
    case 'facebook':
      return <Image src="/icons/facebook.svg" alt="Facebook" width={width} height={height} />;
    case 'instagram':
      return <Image src="/icons/instagram.svg" alt="Instagram" width={width} height={height} />;
    case 'twitter':
      return <Image src="/icons/twitter.svg" alt="Twitter" width={width} height={height} />;
    case 'youtube':
      return <Image src="/icons/youtube.svg" alt="Youtube" width={width} height={height} />;
    case 'twitch':
      return <Image src="/icons/twitch.svg" alt="Twitch" width={width} height={height} />;
    case 'tiktok':
      return <Image src="/icons/tiktok.svg" alt="Tiktok" width={width} height={height} />;
    default:
      return <ExternalLink className="w-5 h-5" />;
  }
}