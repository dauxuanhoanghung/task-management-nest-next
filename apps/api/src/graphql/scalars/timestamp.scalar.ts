import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Timestamp', () => Date)
export class TimestampScalar
  implements CustomScalar<number | string, Date | null>
{
  description =
    'Timestamp scalar — handles ISO 8601 strings and millisecond timestamps';

  /**
   * from client → server
   * @inheritDoc
   */
  parseValue(value: string | number): Date {
    if (typeof value === 'number') return new Date(value); // timestamp (ms)
    if (typeof value === 'string') return new Date(value); // ISO
    throw new Error('Invalid Timestamp value');
  }

  /**
   * from server → client
   * @param {Date | number | string} value
   * @returns {number} milliseconds since epoch
   */
  serialize(value: Date | number | string): number {
    const date = value instanceof Date ? value : new Date(value);
    return date.getTime(); // always output milliseconds since epoch
  }

  // for inline literals in GraphQL query
  parseLiteral(ast: ValueNode): Date | null {
    if (ast.kind === Kind.INT) return new Date(parseInt(ast.value, 10));
    if (ast.kind === Kind.STRING) return new Date(ast.value);
    return null;
  }
}
