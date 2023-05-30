// import * as $protobuf from 'protobufjs';
/** Properties of a Spectrum. */
export interface ISpectrum {
  /** Spectrum timestamp */
  timestamp?: string | null;

  /** Spectrum xMin */
  xMin?: number | null;

  /** Spectrum xMax */
  xMax?: number | null;

  /** Spectrum yMin */
  yMin?: number | null;

  /** Spectrum yMax */
  yMax?: number | null;

  /** Spectrum channels */
  channels?: number[] | null;

  /** Spectrum power */
  power?: number[] | null;

  /** Spectrum sdL */
  sdL?: number[] | null;

  /** Spectrum sdU */
  sdU?: number[] | null;
}

/** Represents a Spectrum. */
export class Spectrum implements ISpectrum {
  /**
   * Constructs a new Spectrum.
   * @param [properties] Properties to set
   */
  constructor(properties?: ISpectrum);

  /** Spectrum timestamp. */
  public timestamp: string;

  /** Spectrum xMin. */
  public xMin: number;

  /** Spectrum xMax. */
  public xMax: number;

  /** Spectrum yMin. */
  public yMin: number;

  /** Spectrum yMax. */
  public yMax: number;

  /** Spectrum channels. */
  public channels: number[];

  /** Spectrum power. */
  public power: number[];

  /** Spectrum sdL. */
  public sdL: number[];

  /** Spectrum sdU. */
  public sdU: number[];

  /**
   * Creates a new Spectrum instance using the specified properties.
   * @param [properties] Properties to set
   * @returns Spectrum instance
   */
  public static create(properties?: ISpectrum): Spectrum;

  /**
   * Encodes the specified Spectrum message. Does not implicitly {@link Spectrum.verify|verify} messages.
   * @param message Spectrum message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(message: ISpectrum, writer?: $protobuf.Writer): $protobuf.Writer;

  /**
   * Encodes the specified Spectrum message, length delimited. Does not implicitly {@link Spectrum.verify|verify} messages.
   * @param message Spectrum message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(message: ISpectrum, writer?: $protobuf.Writer): $protobuf.Writer;

  /**
   * Decodes a Spectrum message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns Spectrum
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): Spectrum;

  /**
   * Decodes a Spectrum message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns Spectrum
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): Spectrum;

  /**
   * Verifies a Spectrum message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null; // eslint-disable-line @typescript-eslint/no-explicit-any

  /**
   * Creates a Spectrum message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns Spectrum
   */
  public static fromObject(object: { [k: string]: any }): Spectrum; // eslint-disable-line @typescript-eslint/no-explicit-any

  /**
   * Creates a plain object from a Spectrum message. Also converts values to other types if specified.
   * @param message Spectrum
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: Spectrum,
    options?: $protobuf.IConversionOptions
  ): { [k: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any

  /**
   * Converts this Spectrum to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
}
