declare const __ASSET_BASE__: string;

const base = `${__ASSET_BASE__}images/`;

/** Static image assets served from /public/images. */
export const images = {
  logo: `${base}Logo.png`,
  logoWordmark: `${base}image.png`,
  logoTransparentTag: `${base}1_CS_Logo_Transparent_TAG.png`,
  logoWhiteTag: `${base}2_CS_Logo_White_BG_TAG.png`,
  kaleidoscopeDrop: `${base}CS_Kaleidescope_Juice_Drop.png`,
  creativePersona: `${base}creative_persona_transformation.png`,
  ezineCover: `${base}ezine_cover_featured_person.png`,
  splitGroupPersonality: `${base}split_group_personality.png`,
  splitIndividualPersonality: `${base}split_individual_personality.png`,
} as const;
