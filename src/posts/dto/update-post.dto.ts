export class UpdatePostDto {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly content: string;
  readonly userId: number;
  readonly image: string;
}
