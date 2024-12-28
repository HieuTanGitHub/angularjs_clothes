export class Comment {
  id?: string;
  productId!: string;  // ID of the associated product
  userId!: string;     // ID of the user making the comment
  userName!: string;   // Name of the user making the comment
  content!: string;    // Comment text
  createdDate!: Date;  // Date of comment creation
}
