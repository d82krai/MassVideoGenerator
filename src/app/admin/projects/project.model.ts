export interface ProjectFile {
  name: string;
  path: string;
  size: number;
}

export interface ProjectScene {
  name: string;
  thumbnail: string;
  sequenceOrder: number;
  sceneLength: number;
  conditions: string[];
}

export interface ProjectSettings {
  outputFileType: string;
  resolution: string;
}

export interface Project {
  id: string;
  name: string;
  files: ProjectFile[];
  dataFields: string[];
  scenes: ProjectScene[];
  status: string;
  settings: ProjectSettings;
  createdOn: Date;
  createdBy: string;
}