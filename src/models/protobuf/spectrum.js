var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Spectrum = (function () {
  /**
   * Properties of a Spectrum.
   * @exports ISpectrum
   * @interface ISpectrum
   * @property {string|null} [timestamp] Spectrum timestamp
   * @property {number|null} [xMin] Spectrum xMin
   * @property {number|null} [xMax] Spectrum xMax
   * @property {number|null} [yMin] Spectrum yMin
   * @property {number|null} [yMax] Spectrum yMax
   * @property {Array.<number>|null} [channels] Spectrum channels
   * @property {Array.<number>|null} [power] Spectrum power
   * @property {Array.<number>|null} [sdL] Spectrum sdL
   * @property {Array.<number>|null} [sdU] Spectrum sdU
   */

  /**
   * Constructs a new Spectrum.
   * @exports Spectrum
   * @classdesc Represents a Spectrum.
   * @implements ISpectrum
   * @constructor
   * @param {ISpectrum=} [properties] Properties to set
   */
  function Spectrum(properties) {
    this.channels = [];
    this.power = [];
    this.sdL = [];
    this.sdU = [];
    if (properties)
      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * Spectrum timestamp.
   * @member {string} timestamp
   * @memberof Spectrum
   * @instance
   */
  Spectrum.prototype.timestamp = "";

  /**
   * Spectrum xMin.
   * @member {number} xMin
   * @memberof Spectrum
   * @instance
   */
  Spectrum.prototype.xMin = 0;

  /**
   * Spectrum xMax.
   * @member {number} xMax
   * @memberof Spectrum
   * @instance
   */
  Spectrum.prototype.xMax = 0;

  /**
   * Spectrum yMin.
   * @member {number} yMin
   * @memberof Spectrum
   * @instance
   */
  Spectrum.prototype.yMin = 0;

  /**
   * Spectrum yMax.
   * @member {number} yMax
   * @memberof Spectrum
   * @instance
   */
  Spectrum.prototype.yMax = 0;

  /**
   * Spectrum channels.
   * @member {Array.<number>} channels
   * @memberof Spectrum
   * @instance
   */
  Spectrum.prototype.channels = $util.emptyArray;

  /**
   * Spectrum power.
   * @member {Array.<number>} power
   * @memberof Spectrum
   * @instance
   */
  Spectrum.prototype.power = $util.emptyArray;

  /**
   * Spectrum sdL.
   * @member {Array.<number>} sdL
   * @memberof Spectrum
   * @instance
   */
  Spectrum.prototype.sdL = $util.emptyArray;

  /**
   * Spectrum sdU.
   * @member {Array.<number>} sdU
   * @memberof Spectrum
   * @instance
   */
  Spectrum.prototype.sdU = $util.emptyArray;

  /**
   * Creates a new Spectrum instance using the specified properties.
   * @function create
   * @memberof Spectrum
   * @static
   * @param {ISpectrum=} [properties] Properties to set
   * @returns {Spectrum} Spectrum instance
   */
  Spectrum.create = function create(properties) {
    return new Spectrum(properties);
  };

  /**
   * Encodes the specified Spectrum message. Does not implicitly {@link Spectrum.verify|verify} messages.
   * @function encode
   * @memberof Spectrum
   * @static
   * @param {ISpectrum} message Spectrum message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Spectrum.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (
      message.timestamp != null &&
      Object.hasOwnProperty.call(message, "timestamp")
    )
      writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.timestamp);
    if (message.xMin != null && Object.hasOwnProperty.call(message, "xMin"))
      writer.uint32(/* id 2, wireType 5 =*/ 21).float(message.xMin);
    if (message.xMax != null && Object.hasOwnProperty.call(message, "xMax"))
      writer.uint32(/* id 3, wireType 5 =*/ 29).float(message.xMax);
    if (message.yMin != null && Object.hasOwnProperty.call(message, "yMin"))
      writer.uint32(/* id 4, wireType 5 =*/ 37).float(message.yMin);
    if (message.yMax != null && Object.hasOwnProperty.call(message, "yMax"))
      writer.uint32(/* id 5, wireType 5 =*/ 45).float(message.yMax);
    if (message.channels != null && message.channels.length) {
      writer.uint32(/* id 6, wireType 2 =*/ 50).fork();
      for (var i1 = 0; i1 < message.channels.length; ++i1)
        writer.float(message.channels[i1]);
      writer.ldelim();
    }
    if (message.power != null && message.power.length) {
      writer.uint32(/* id 7, wireType 2 =*/ 58).fork();
      for (var i2 = 0; i2 < message.power.length; ++i2)
        writer.float(message.power[i2]);
      writer.ldelim();
    }
    if (message.sdL != null && message.sdL.length) {
      writer.uint32(/* id 8, wireType 2 =*/ 66).fork();
      for (var i3 = 0; i3 < message.sdL.length; ++i3)
        writer.float(message.sdL[i3]);
      writer.ldelim();
    }
    if (message.sdU != null && message.sdU.length) {
      writer.uint32(/* id 9, wireType 2 =*/ 74).fork();
      for (var i4 = 0; i4 < message.sdU.length; ++i4)
        writer.float(message.sdU[i4]);
      writer.ldelim();
    }
    return writer;
  };

  /**
   * Encodes the specified Spectrum message, length delimited. Does not implicitly {@link Spectrum.verify|verify} messages.
   * @function encodeDelimited
   * @memberof Spectrum
   * @static
   * @param {ISpectrum} message Spectrum message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Spectrum.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

  /**
   * Decodes a Spectrum message from the specified reader or buffer.
   * @function decode
   * @memberof Spectrum
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Spectrum} Spectrum
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Spectrum.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    var end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.Spectrum();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = reader.string();
          break;
        case 2:
          message.xMin = reader.float();
          break;
        case 3:
          message.xMax = reader.float();
          break;
        case 4:
          message.yMin = reader.float();
          break;
        case 5:
          message.yMax = reader.float();
          break;
        case 6:
          if (!(message.channels && message.channels.length))
            message.channels = [];
          if ((tag & 7) === 2) {
            var end2a = reader.uint32() + reader.pos;
            while (reader.pos < end2a) message.channels.push(reader.float());
          } else message.channels.push(reader.float());
          break;
        case 7:
          if (!(message.power && message.power.length)) message.power = [];
          if ((tag & 7) === 2) {
            var end2b = reader.uint32() + reader.pos;
            while (reader.pos < end2b) message.power.push(reader.float());
          } else message.power.push(reader.float());
          break;
        case 8:
          if (!(message.sdL && message.sdL.length)) message.sdL = [];
          if ((tag & 7) === 2) {
            var end2c = reader.uint32() + reader.pos;
            while (reader.pos < end2c) message.sdL.push(reader.float());
          } else message.sdL.push(reader.float());
          break;
        case 9:
          if (!(message.sdU && message.sdU.length)) message.sdU = [];
          if ((tag & 7) === 2) {
            var end2d = reader.uint32() + reader.pos;
            while (reader.pos < end2d) message.sdU.push(reader.float());
          } else message.sdU.push(reader.float());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
   * Decodes a Spectrum message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof Spectrum
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {Spectrum} Spectrum
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Spectrum.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  function channelsFails(message) {
    return (
      message.channels != null &&
      message.hasOwnProperty("channels") &&
      !Array.isArray(message.channels)
    );
  }

  function channelsLengthFails(message) {
    if (
      message.channels != null &&
      message.hasOwnProperty("channels") &&
      Array.isArray(message.channels)
    ) {
      for (var i = 0; i < message.channels.length; ++i)
        if (typeof message.channels[i] !== "number") return true;
    }
    return false;
  }

  function powerFails(message) {
    return (
      message.power != null &&
      message.hasOwnProperty("power") &&
      !Array.isArray(message.power)
    );
  }

  function powerLengthFails(message) {
    if (
      message.power != null &&
      message.hasOwnProperty("power") &&
      Array.isArray(message.power)
    ) {
      for (var i = 0; i < message.power.length; ++i)
        if (typeof message.power[i] !== "number") return true;
    }
    return false;
  }

  function sdLFails(message) {
    return (
      message.sdL != null &&
      message.hasOwnProperty("sdL") &&
      !Array.isArray(message.sdL)
    );
  }

  function sdLLengthFails(message) {
    if (
      message.sdL != null &&
      message.hasOwnProperty("sdL") &&
      Array.isArray(message.sdL)
    ) {
      for (var i = 0; i < message.sdL.length; ++i)
        if (typeof message.sdL[i] !== "number") return true;
    }
    return false;
  }

  function sdUFails(message) {
    return (
      message.sdU != null &&
      message.hasOwnProperty("sdU") &&
      !Array.isArray(message.sdU)
    );
  }

  function sdULengthFails(message) {
    if (
      message.sdU != null &&
      message.hasOwnProperty("sdU") &&
      Array.isArray(message.sdU)
    ) {
      for (var i = 0; i < message.sdU.length; ++i)
        if (typeof message.sdU[i] !== "number") return true;
    }
    return false;
  }

  function timestampFails(message) {
    return (
      message.timestamp != null &&
      message.hasOwnProperty("timestamp") &&
      !$util.isString(message.timestamp)
    );
  }

  function xMaxFails(message) {
    return (
      message.xMax != null &&
      message.hasOwnProperty("xMax") &&
      typeof message.xMax !== "number"
    );
  }

  function xMinFails(message) {
    return (
      message.xMin != null &&
      message.hasOwnProperty("xMin") &&
      typeof message.xMin !== "number"
    );
  }

  function yMaxFails(message) {
    return (
      message.yMax != null &&
      message.hasOwnProperty("yMax") &&
      typeof message.yMax !== "number"
    );
  }

  function yMinFails(message) {
    return (
      message.yMin != null &&
      message.hasOwnProperty("yMin") &&
      typeof message.yMin !== "number"
    );
  }
  /**
   * Verifies a Spectrum message.
   * @function verify
   * @memberof Spectrum
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  Spectrum.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected";
    if (timestampFails(message)) return "timestamp: string expected";
    if (xMinFails(message)) return "xMin: number expected";
    if (xMaxFails(message)) return "xMax: number expected";
    if (yMinFails(message)) return "yMin: number expected";
    if (yMaxFails(message)) return "yMax: number expected";
    if (channelsFails(message)) return "channels: array expected";
    if (channelsLengthFails(message)) return "channels: number[] expected";
    if (powerFails(message)) return "power: array expected";
    if (powerLengthFails(message)) return "power: number[] expected";
    if (sdLFails(message)) return "sdL: array expected";
    if (sdLLengthFails(message)) return "sdL: number[] expected";
    if (sdUFails(message)) return "sdU: array expected";
    if (sdULengthFails(message)) return "sdU: number[] expected";
    return null;
  };

  function setNumberArray(inValue, errMessage) {
    var arr = [];
    if (!Array.isArray(inValue)) throw TypeError(errMessage);
    else {
      for (var i = 0; i < inValue.length; ++i) arr[i] = Number(inValue[i]);
    }
    return arr;
  }
  /**
   * Creates a Spectrum message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof Spectrum
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {Spectrum} Spectrum
   */
  Spectrum.fromObject = function fromObject(object) {
    if (object instanceof $root.Spectrum) return object;

    var message = new $root.Spectrum();
    if (object.timestamp != null) message.timestamp = String(object.timestamp);
    if (object.xMin != null) message.xMin = Number(object.xMin);
    if (object.xMax != null) message.xMax = Number(object.xMax);
    if (object.yMin != null) message.yMin = Number(object.yMin);
    if (object.yMax != null) message.yMax = Number(object.yMax);
    if (object.channels)
      message.channels = setNumberArray(
        object.channels,
        ".Spectrum.channels: array expected"
      );
    if (object.power)
      message.power = setNumberArray(
        object.power,
        ".Spectrum.power: array expected"
      );
    if (object.sdL)
      message.sdL = setNumberArray(object.sdL, ".Spectrum.sdL: array expected");
    if (object.sdU)
      message.sdU = setNumberArray(object.sdU, ".Spectrum.sdU: array expected");
    return message;
  };

  function initializeObject(options) {
    var object = {};
    if (options.arrays || options.defaults) {
      object.channels = [];
      object.power = [];
      object.sdL = [];
      object.sdU = [];
    }
    if (options.defaults) {
      object.timestamp = "";
      object.xMin = 0;
      object.xMax = 0;
      object.yMin = 0;
      object.yMax = 0;
    }
    return object;
  }

  function getOptionsJSON(json, inValue) {
    return json && !isFinite(inValue) ? String(inValue) : inValue;
  }

  function getOptionsArray(json, inValue) {
    var arr = [];
    for (var i = 0; i < inValue.length; ++i)
      arr[i] = getOptionsJSON(json, inValue[i]);
    return arr;
  }

  function setObjectTimeStamp(message, object) {
    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
      object.timestamp = message.timestamp;
    return object;
  }

  function setObjectXMin(message, object, options) {
    if (message.xMin != null && message.hasOwnProperty("xMin"))
      object.xMin = getOptionsJSON(options.json, message.xMin);
    return object;
  }

  function setObjectXMax(message, object, options) {
    if (message.xMax != null && message.hasOwnProperty("xMax"))
      object.xMax = getOptionsJSON(options.json, message.xMax);
    return object;
  }

  function setObjectYMin(message, object, options) {
    if (message.yMin != null && message.hasOwnProperty("yMin"))
      object.yMin = getOptionsJSON(options.json, message.yMin);
    return object;
  }

  function setObjectYMax(message, object, options) {
    if (message.yMax != null && message.hasOwnProperty("yMax"))
      object.yMax = getOptionsJSON(options.json, message.yMax);
    return object;
  }

  /**
   * Creates a plain object from a Spectrum message. Also converts values to other types if specified.
   * @function toObject
   * @memberof Spectrum
   * @static
   * @param {Spectrum} message Spectrum
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  Spectrum.toObject = function toObject(message, options) {
    if (!options) options = {};
    var object = initializeObject(options);
    object = setObjectTimeStamp(message, object);
    object = setObjectXMin(message, object, options);
    object = setObjectXMax(message, object, options);
    object = setObjectYMin(message, object, options);
    object = setObjectYMax(message, object, options);
    if (message.channels && message.channels.length)
      object.channels = getOptionsArray(options.json, message.channels);
    if (message.power && message.power.length)
      object.power = getOptionsArray(options.json, message.power);
    if (message.sdL && message.sdL.length)
      object.sdL = getOptionsArray(options.json, message.sdL);
    if (message.sdU && message.sdU.length)
      object.sdU = getOptionsArray(options.json, message.sdU);
    return object;
  };

  /**
   * Converts this Spectrum to JSON.
   * @function toJSON
   * @memberof Spectrum
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  Spectrum.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  return Spectrum;
})();

module.exports = $root;
