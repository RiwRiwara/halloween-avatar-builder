export type AvatarOptions = {
  skinTone: string;
  head: string;
  eyes: string;
  body: string;
};

export type CustomizationCategory = {
  name: string;
  options: { id: string; label: string; icon: string }[];
};
