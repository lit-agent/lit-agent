export enum SegmentType {
  text = "text",
  imageChoices = "imageChoices",
  textChoices = "textChoices",
  groupLink = "groupLink",
  expiringGroupLink = "expiringGroupLink",
  task = "task",
  actionButton = "actionButton",
  images = "images",
  sheet = "sheet",
  productLink = "productLink",
  any = "any",
}

export interface Segment {
  type: SegmentType;
  content: any;
}
