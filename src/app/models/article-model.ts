export enum CategoryCode {
  ANNOUNCEMENT = "000000000",
  FREE = "000010001",
  SMALL_BIRD = "000010002",
  MIDDLE_BIRD = "000010003",
  LARGE_BIRD = "000010004",
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

  static getCategoryOptions() {
    return [
      { label: "자유게시판", value: CategoryCode.FREE },
      { label: "소형조게시판", value: CategoryCode.SMALL_BIRD },
      { label: "중형조게시판", value: CategoryCode.MIDDLE_BIRD },
      { label: "대형조게시판", value: CategoryCode.LARGE_BIRD },
    ];
  }
}
