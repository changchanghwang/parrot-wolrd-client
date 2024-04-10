export enum CategoryCode {
  ANNOUNCEMENT = "000000000",
  FREE = "000010001",
}

export class ArticleModel {
  id!: string;
  title!: string;
  content!: string;
  author!: {
    nickName: string;
    email: string;
  };
  categoryCode!: CategoryCode;
  fileIds!: string[];
}
