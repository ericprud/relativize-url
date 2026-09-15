declare class RelativizeUrl {
  /**
   * Construct a relativizer for a fixed base (relateurl-style interface).
   * @param base - absolute URL that relative URLs will be relative to
   * @param options - reserved for future use
   */
  constructor(base: string | URL, options?: RelativizeUrl.Options);

  readonly base: string | URL;
  readonly options: RelativizeUrl.Options | undefined;

  /**
   * Construct the shortest URL that resolves to `rel` against this relativizer's base.
   * @param rel - target URL, absolute or relative to the base
   */
  relate(rel: string | URL): string;

  /**
   * Construct the shortest URL that resolves to `rel` against `base`.
   * @param rel - target URL, absolute or relative to `base`
   * @param base - absolute base URL
   * @param opts - reserved for future use
   */
  static relativize(rel: string | URL, base: string | URL, opts?: RelativizeUrl.Options): string;
}

declare namespace RelativizeUrl {
  /** Reserved for future use. */
  interface Options {}
}

export = RelativizeUrl;
