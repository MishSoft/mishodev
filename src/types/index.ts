export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  is_visible: boolean;
  project_link?: string;
  github_link?: string;
  created_at?: Date;
}
