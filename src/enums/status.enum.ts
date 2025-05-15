import { registerEnumType } from '@nestjs/graphql';

export enum Status {
  Active = 'Active',
  Inactive = 'Inactive',
  Pending = 'Pending',
  Cancelled = 'Cancelled',
  Completed = 'Completed',
  Failed = 'Failed',
  Refunded = 'Refunded',
  Disputed = 'Disputed',
  OnHold = 'OnHold',
}

registerEnumType(Status, {
  name: 'Status',
  description: 'The status ',
});
