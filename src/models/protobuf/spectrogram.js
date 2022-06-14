var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Spectrogram = (function () {
  /**
   * Properties of a Spectrogram.
   * @exports ISpectrogram
   * @interface ISpectrogram
   * @property {string|null} [timestamp] Spectrogram timestamp
   * @property {string|null} [baseline] Spectrogram baseline
   * @property {string|null} [polarisation] Spectrogram polarisation
   * @property {Array.<number>|null} [phase] Spectrogram phase
   */

  /**
   * Constructs a new Spectrogram.
   * @exports Spectrogram
   * @classdesc Represents a Spectrogram.
   * @implements ISpectrogram
   * @constructor
   * @param {ISpectrogram=} [properties] Properties to set
   */
  function Spectrogram(properties) {
    this.phase = [];
    if (properties)
      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * Spectrogram timestamp.
   * @member {string} timestamp
   * @memberof Spectrogram
   * @instance
   */
  Spectrogram.prototype.timestamp = "";

  /**
   * Spectrogram baseline.
   * @member {string} baseline
   * @memberof Spectrogram
   * @instance
   */
  Spectrogram.prototype.baseline = "";

  /**
   * Spectrogram polarisation.
   * @member {string} polarisation
   * @memberof Spectrogram
   * @instance
   */
  Spectrogram.prototype.polarisation = "";

  /**
   * Spectrogram phase.
   * @member {Array.<number>} phase
   * @memberof Spectrogram
   * @instance
   */
  Spectrogram.prototype.phase = $util.emptyArray;

  /**
   * Creates a new Spectrogram instance using the specified properties.
   * @function create
   * @memberof Spectrogram
   * @static
   * @param {ISpectrogram=} [properties] Properties to set
   * @returns {Spectrogram} Spectrogram instance
   */
  Spectrogram.create = function create(properties) {
    return new Spectrogram(properties);
  };

  /**
   * Encodes the specified Spectrogram message. Does not implicitly {@link Spectrogram.verify|verify} messages.
   * @function encode
   * @memberof Spectrogram
   * @static
   * @param {ISpectrogram} message Spectrogram message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Spectrogram.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (
      message.timestamp != null &&
      Object.hasOwnProperty.call(message, "timestamp")
    )
      writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.timestamp);
    if (
      message.baseline != null &&
      Object.hasOwnProperty.call(message, "baseline")
    )
      writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.baseline);
    if (
      message.polarisation != null &&
      Object.hasOwnProperty.call(message, "polarisation")
    )
      writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.polarisation);
    if (message.phase != null && message.phase.length) {
      writer.uint32(/* id 4, wireType 2 =*/ 34).fork();
      for (var i = 0; i < message.phase.length; ++i)
        writer.int32(message.phase[i]);
      writer.ldelim();
    }
    return writer;
  };

  /**
   * Encodes the specified Spectrogram message, length delimited. Does not implicitly {@link Spectrogram.verify|verify} messages.
   * @function encodeDelimited
   * @memberof Spectrogram
   * @static
   * @param {ISpectrogram} message Spectrogram message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Spectrogram.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

  function processReader(reader, end, message) {
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = reader.string();
          break;
        case 2:
          message.baseline = reader.string();
          break;
        case 3:
          message.polarisation = reader.string();
          break;
        case 4:
          if (!(message.phase && message.phase.length)) message.phase = [];
          if ((tag & 7) === 2) {
            var end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) message.phase.push(reader.int32());
          } else message.phase.push(reader.int32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
  }

  /**
   * Decodes a Spectrogram message from the specified reader or buffer.
   * @function decode
   * @memberof Spectrogram
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Spectrogram} Spectrogram
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Spectrogram.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    var end = length === undefined ? reader.len : reader.pos + length;
    return processReader(reader, end, new $root.Spectrogram());
  };

  /**
   * Decodes a Spectrogram message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof Spectrogram
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {Spectrogram} Spectrogram
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Spectrogram.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  function baselineFails(message) {
    return (
      message.baseline != null &&
      message.hasOwnProperty("baseline") &&
      !$util.isString(message.baseline)
    );
  }

  function phaseFails(message) {
    return (
      message.phase != null &&
      message.hasOwnProperty("phase") &&
      !Array.isArray(message.phase)
    );
  }

  function phaseLengthFails(message) {
    if (
      message.phase != null &&
      message.hasOwnProperty("phase") &&
      Array.isArray(message.phase)
    ) {
      for (var i = 0; i < message.phase.length; ++i)
        if (!$util.isInteger(message.phase[i])) return true;
    }
    return false;
  }

  function polarisationFails(message) {
    return (
      message.polarisation != null &&
      message.hasOwnProperty("polarisation") &&
      !$util.isString(message.polarisation)
    );
  }

  function timestampFails(message) {
    return (
      message.timestamp != null &&
      message.hasOwnProperty("timestamp") &&
      !$util.isString(message.timestamp)
    );
  }

  /**
   * Verifies a Spectrogram message.
   * @function verify
   * @memberof Spectrogram
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  Spectrogram.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected";

    if (timestampFails(message)) return "timestamp: string expected";
    if (baselineFails(message)) return "baseline: string expected";
    if (polarisationFails(message)) return "polarisation: string expected";
    if (phaseFails(message)) return "phase: array expected";
    if (phaseLengthFails(message)) return "phase: integer[] expected";
    return null;
  };

  /**
   * Creates a Spectrogram message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof Spectrogram
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {Spectrogram} Spectrogram
   */
  Spectrogram.fromObject = function fromObject(object) {
    if (object instanceof $root.Spectrogram) return object;
    var message = new $root.Spectrogram();
    if (object.timestamp != null) message.timestamp = String(object.timestamp);
    if (object.baseline != null) message.baseline = String(object.baseline);
    if (object.polarisation != null)
      message.polarisation = String(object.polarisation);
    if (object.phase) {
      if (!Array.isArray(object.phase))
        throw TypeError(".Spectrogram.phase: array expected");
      message.phase = [];
      for (var i = 0; i < object.phase.length; ++i)
        message.phase[i] = object.phase[i] | 0;
    }
    return message;
  };

  /**
   * Creates a plain object from a Spectrogram message. Also converts values to other types if specified.
   * @function toObject
   * @memberof Spectrogram
   * @static
   * @param {Spectrogram} message Spectrogram
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  Spectrogram.toObject = function toObject(message, options) {
    if (!options) options = {};
    var object = {};
    if (options.arrays || options.defaults) object.phase = [];
    if (options.defaults) {
      object.timestamp = "";
      object.baseline = "";
      object.polarisation = "";
    }
    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
      object.timestamp = message.timestamp;
    if (message.baseline != null && message.hasOwnProperty("baseline"))
      object.baseline = message.baseline;
    if (message.polarisation != null && message.hasOwnProperty("polarisation"))
      object.polarisation = message.polarisation;
    if (message.phase && message.phase.length) {
      object.phase = [];
      for (var j = 0; j < message.phase.length; ++j)
        object.phase[j] = message.phase[j];
    }
    return object;
  };

  /**
   * Converts this Spectrogram to JSON.
   * @function toJSON
   * @memberof Spectrogram
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  Spectrogram.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  return Spectrogram;
})();

$root.Spectrograms = (function () {
  /**
   * Properties of a Spectrograms.
   * @exports ISpectrograms
   * @interface ISpectrograms
   * @property {Array.<ISpectrogram>|null} [spectrogram] Spectrograms spectrogram
   */

  /**
   * Constructs a new Spectrograms.
   * @exports Spectrograms
   * @classdesc Represents a Spectrograms.
   * @implements ISpectrograms
   * @constructor
   * @param {ISpectrograms=} [properties] Properties to set
   */
  function Spectrograms(properties) {
    this.spectrogram = [];
    if (properties)
      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * Spectrograms spectrogram.
   * @member {Array.<ISpectrogram>} spectrogram
   * @memberof Spectrograms
   * @instance
   */
  Spectrograms.prototype.spectrogram = $util.emptyArray;

  /**
   * Creates a new Spectrograms instance using the specified properties.
   * @function create
   * @memberof Spectrograms
   * @static
   * @param {ISpectrograms=} [properties] Properties to set
   * @returns {Spectrograms} Spectrograms instance
   */
  Spectrograms.create = function create(properties) {
    return new Spectrograms(properties);
  };

  /**
   * Encodes the specified Spectrograms message. Does not implicitly {@link Spectrograms.verify|verify} messages.
   * @function encode
   * @memberof Spectrograms
   * @static
   * @param {ISpectrograms} message Spectrograms message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Spectrograms.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (message.spectrogram != null && message.spectrogram.length)
      for (var i = 0; i < message.spectrogram.length; ++i)
        $root.Spectrogram.encode(
          message.spectrogram[i],
          writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
        ).ldelim();
    return writer;
  };

  /**
   * Encodes the specified Spectrograms message, length delimited. Does not implicitly {@link Spectrograms.verify|verify} messages.
   * @function encodeDelimited
   * @memberof Spectrograms
   * @static
   * @param {ISpectrograms} message Spectrograms message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Spectrograms.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

  /**
   * Decodes a Spectrograms message from the specified reader or buffer.
   * @function decode
   * @memberof Spectrograms
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Spectrograms} Spectrograms
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Spectrograms.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    var end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.Spectrograms();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (!(message.spectrogram && message.spectrogram.length))
            message.spectrogram = [];
          message.spectrogram.push(
            $root.Spectrogram.decode(reader, reader.uint32())
          );
          break;
        case 0:
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
   * Decodes a Spectrograms message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof Spectrograms
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {Spectrograms} Spectrograms
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */

  /**
   * Verifies a Spectrograms message.
   * @function verify
   * @memberof Spectrograms
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  Spectrograms.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected";
    if (message.spectrogram != null && message.hasOwnProperty("spectrogram")) {
      if (!Array.isArray(message.spectrogram))
        return "spectrogram: array expected";
      for (var i = 0; i < message.spectrogram.length; ++i) {
        var error = $root.Spectrogram.verify(message.spectrogram[i]);
        if (error) return "spectrogram." + error;
      }
    }
    return null;
  };

  /**
   * Creates a Spectrograms message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof Spectrograms
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {Spectrograms} Spectrograms
   */
  Spectrograms.fromObject = function fromObject(object) {
    if (object instanceof $root.Spectrograms) return object;
    var message = new $root.Spectrograms();
    if (object.spectrogram) {
      if (!Array.isArray(object.spectrogram))
        throw TypeError(".Spectrograms.spectrogram: array expected");
      message.spectrogram = [];
      for (var i = 0; i < object.spectrogram.length; ++i) {
        if (typeof object.spectrogram[i] !== "object")
          throw TypeError(".Spectrograms.spectrogram: object expected");
        message.spectrogram[i] = $root.Spectrogram.fromObject(
          object.spectrogram[i]
        );
      }
    }
    return message;
  };

  /**
   * Creates a plain object from a Spectrograms message. Also converts values to other types if specified.
   * @function toObject
   * @memberof Spectrograms
   * @static
   * @param {Spectrograms} message Spectrograms
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  Spectrograms.toObject = function toObject(message, options) {
    if (!options) options = {};
    var object = {};
    if (options.arrays || options.defaults) object.spectrogram = [];
    if (message.spectrogram && message.spectrogram.length) {
      object.spectrogram = [];
      for (var j = 0; j < message.spectrogram.length; ++j)
        object.spectrogram[j] = $root.Spectrogram.toObject(
          message.spectrogram[j],
          options
        );
    }
    return object;
  };

  /**
   * Converts this Spectrograms to JSON.
   * @function toJSON
   * @memberof Spectrograms
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  Spectrograms.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  return Spectrograms;
})();

module.exports = $root;
