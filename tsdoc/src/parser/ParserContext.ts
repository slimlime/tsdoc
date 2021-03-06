import { TextRange } from './TextRange';
import { Token } from './Token';
import { ParseError } from './ParseError';
import { DocNode } from '../nodes';

export class ParserContext {
  /**
   * The input text
   */
  public sourceRange: TextRange;

  /**
   * The range from the opening comment delimiter ("/**" to the closing comment delimiter.
   */
  public commentRange: TextRange;

  /**
   * The line ranges inside the doc comment by LineExtractor
   */
  public lines: TextRange[];

  /**
   * The list of tokens extracted from the lines by Tokenizer;
   */
  public tokens: Token[];

  /**
   * The nodes that were parsed from the tokens by NodeParser.
   */
  public nodes: DocNode[];

  public parseErrors: ParseError[];

  public constructor(range: TextRange) {
    this.sourceRange = range;
    this.commentRange = TextRange.empty;
    this.lines = [];
    this.tokens = [];
    this.nodes = [];
    this.parseErrors = [];
  }

  public addError(range: TextRange, message: string, pos: number, end?: number): void {
    if (!end) {
      if (pos + 1 <= range.buffer.length) {
        end = pos + 1;
      } else {
        end = pos;
      }
    }
    this.parseErrors.push(
      new ParseError(message, range.getNewRange(pos, end))
    );
  }
}
