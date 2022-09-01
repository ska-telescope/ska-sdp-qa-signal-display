// Not converted to typescript as this seems to complicated. It will be done in future.



const $protobuf = await import("protobufjs/minimal");

// Common aliases
const $Reader = $protobuf.Reader; const $Writer = $protobuf.Writer;
const $util = $protobuf.util;

// Exported root namespace
export const spectrumRoot = $protobuf.roots.default || ($protobuf.roots.default = {});

// eslint-disable-next-line no-multi-assign
const SpectrumExport = spectrumRoot.Spectrum = (() => {

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
            for (let keys = Object.keys(properties), i = 0; i < keys.length; i+=1)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
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
        if (!writer)
            writer = $Writer.create();
        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(/* id 1, wireType 2 = */10).string(message.timestamp);
        if (message.xMin != null && Object.hasOwnProperty.call(message, "xMin"))
            writer.uint32(/* id 2, wireType 5 = */21).float(message.xMin);
        if (message.xMax != null && Object.hasOwnProperty.call(message, "xMax"))
            writer.uint32(/* id 3, wireType 5 = */29).float(message.xMax);
        if (message.yMin != null && Object.hasOwnProperty.call(message, "yMin"))
            writer.uint32(/* id 4, wireType 5 = */37).float(message.yMin);
        if (message.yMax != null && Object.hasOwnProperty.call(message, "yMax"))
            writer.uint32(/* id 5, wireType 5 = */45).float(message.yMax);
        if (message.channels != null && message.channels.length) {
            writer.uint32(/* id 6, wireType 2 = */50).fork();
            for (let i1 = 0; i1 < message.channels.length; i1+=1)
                writer.float(message.channels[i1]);
            writer.ldelim();
        }
        if (message.power != null && message.power.length) {
            writer.uint32(/* id 7, wireType 2 = */58).fork();
            for (let i2 = 0; i2 < message.power.length; i2+=1)
                writer.float(message.power[i2]);
            writer.ldelim();
        }
        if (message.sdL != null && message.sdL.length) {
            writer.uint32(/* id 8, wireType 2 = */66).fork();
            for (let i3 = 0; i3 < message.sdL.length; i3+=1)
                writer.float(message.sdL[i3]);
            writer.ldelim();
        }
        if (message.sdU != null && message.sdU.length) {
            writer.uint32(/* id 9, wireType 2 = */74).fork();
            for (let i4 = 0; i4 < message.sdU.length; i4+=1)
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
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = new spectrumRoot.Spectrum();
        while (reader.pos < end) {
            const tag = reader.uint32();
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
                    const end2a = reader.uint32() + reader.pos;
                    while (reader.pos < end2a)
                        message.channels.push(reader.float());
                } else
                    message.channels.push(reader.float());
                break;
            case 7:
                if (!(message.power && message.power.length))
                    message.power = [];
                if ((tag & 7) === 2) {
                    const end2b = reader.uint32() + reader.pos;
                    while (reader.pos < end2b)
                        message.power.push(reader.float());
                } else
                    message.power.push(reader.float());
                break;
            case 8:
                if (!(message.sdL && message.sdL.length))
                    message.sdL = [];
                if ((tag & 7) === 2) {
                    const end2c = reader.uint32() + reader.pos;
                    while (reader.pos < end2c)
                        message.sdL.push(reader.float());
                } else
                    message.sdL.push(reader.float());
                break;
            case 9:
                if (!(message.sdU && message.sdU.length))
                    message.sdU = [];
                if ((tag & 7) === 2) {
                    const end2d = reader.uint32() + reader.pos;
                    while (reader.pos < end2d)
                        message.sdU.push(reader.float());
                } else
                    message.sdU.push(reader.float());
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
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

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
        if (message.timestamp != null && Object.prototype.call(message,"timestamp"))
            if (!$util.isString(message.timestamp))
                return "timestamp: string expected";
        if (message.xMin != null && Object.prototype.call(message,"xMin"))
            if (typeof message.xMin !== "number")
                return "xMin: number expected";
        if (message.xMax != null && Object.prototype.call(message,"xMax"))
            if (typeof message.xMax !== "number")
                return "xMax: number expected";
        if (message.yMin != null && Object.prototype.call(message,"yMin"))
            if (typeof message.yMin !== "number")
                return "yMin: number expected";
        if (message.yMax != null && Object.prototype.call(message,"yMax"))
            if (typeof message.yMax !== "number")
                return "yMax: number expected";
        if (message.channels != null && Object.prototype.call(message,"channels")) {
            if (!Array.isArray(message.channels))
                return "channels: array expected";
            for (let i5 = 0; i5 < message.channels.length; i5+=1)
                if (typeof message.channels[i5] !== "number")
                    return "channels: number[] expected";
        }
        if (message.power != null && Object.prototype.call(message,"power")) {
            if (!Array.isArray(message.power))
                return "power: array expected";
            for (let i6 = 0; i6 < message.power.length; i6+=1)
                if (typeof message.power[i6] !== "number")
                    return "power: number[] expected";
        }
        if (message.sdL != null && Object.prototype.call(message,"sdL")) {
            if (!Array.isArray(message.sdL))
                return "sdL: array expected";
            for (let i7 = 0; i7 < message.sdL.length; i7+=1)
                if (typeof message.sdL[i7] !== "number")
                    return "sdL: number[] expected";
        }
        if (message.sdU != null && Object.prototype.call(message,"sdU")) {
            if (!Array.isArray(message.sdU))
                return "sdU: array expected";
            for (let i8 = 0; i8 < message.sdU.length; i8+=1)
                if (typeof message.sdU[i8] !== "number")
                    return "sdU: number[] expected";
        }
        return null;
    };

    /**
     * Creates a Spectrum message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Spectrum
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Spectrum} Spectrum
     */
    Spectrum.fromObject = function fromObject(object) {
        if (object instanceof spectrumRoot.Spectrum)
            return object;
        const message = new spectrumRoot.Spectrum();
        if (object.timestamp != null)
            message.timestamp = String(object.timestamp);
        if (object.xMin != null)
            message.xMin = Number(object.xMin);
        if (object.xMax != null)
            message.xMax = Number(object.xMax);
        if (object.yMin != null)
            message.yMin = Number(object.yMin);
        if (object.yMax != null)
            message.yMax = Number(object.yMax);
        if (object.channels) {
            if (!Array.isArray(object.channels))
                throw TypeError(".Spectrum.channels: array expected");
            message.channels = [];
            for (let i9 = 0; i9 < object.channels.length; i9+=1)
                message.channels[i9] = Number(object.channels[i9]);
        }
        if (object.power) {
            if (!Array.isArray(object.power))
                throw TypeError(".Spectrum.power: array expected");
            message.power = [];
            for (let j5 = 0; j5 < object.power.length; j5+=1)
                message.power[j5] = Number(object.power[j5]);
        }
        if (object.sdL) {
            if (!Array.isArray(object.sdL))
                throw TypeError(".Spectrum.sdL: array expected");
            message.sdL = [];
            for (let j6 = 0; j6 < object.sdL.length; j6+=1)
                message.sdL[j6] = Number(object.sdL[j6]);
        }
        if (object.sdU) {
            if (!Array.isArray(object.sdU))
                throw TypeError(".Spectrum.sdU: array expected");
            message.sdU = [];
            for (let j7 = 0; j7 < object.sdU.length; j7+=1)
                message.sdU[j7] = Number(object.sdU[j7]);
        }
        return message;
    };

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
        if (!options)
            options = {};
        const object = {};
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
        if (message.timestamp != null && Object.prototype.call(message,"timestamp"))
            object.timestamp = message.timestamp;
        if (message.xMin != null && Object.prototype.call(message,"xMin"))
            object.xMin = options.json && !Number.isFinite(message.xMin) ? String(message.xMin) : message.xMin;
        if (message.xMax != null && Object.prototype.call(message,"xMax"))
            object.xMax = options.json && !Number.isFinite(message.xMax) ? String(message.xMax) : message.xMax;
        if (message.yMin != null && Object.prototype.call(message,"yMin"))
            object.yMin = options.json && !Number.isFinite(message.yMin) ? String(message.yMin) : message.yMin;
        if (message.yMax != null && Object.prototype.call(message,"yMax"))
            object.yMax = options.json && !Number.isFinite(message.yMax) ? String(message.yMax) : message.yMax;
        if (message.channels && message.channels.length) {
            object.channels = [];
            for (let j1 = 0; j1 < message.channels.length; j1+=1)
                object.channels[j1] = options.json && !Number.isFinite(message.channels[j1]) ? String(message.channels[j1]) : message.channels[j1];
        }
        if (message.power && message.power.length) {
            object.power = [];
            for (let j2 = 0; j2 < message.power.length; j2+=1)
                object.power[j2] = options.json && !Number.isFinite(message.power[j2]) ? String(message.power[j2]) : message.power[j2];
        }
        if (message.sdL && message.sdL.length) {
            object.sdL = [];
            for (let j4 = 0; j4 < message.sdL.length; j4+=1)
                object.sdL[j4] = options.json && !Number.isFinite(message.sdL[j4]) ? String(message.sdL[j4]) : message.sdL[j4];
        }
        if (message.sdU && message.sdU.length) {
            object.sdU = [];
            for (let j3 = 0; j3 < message.sdU.length; j3+=1)
                object.sdU[j3] = options.json && !Number.isFinite(message.sdU[j3]) ? String(message.sdU[j3]) : message.sdU[j3];
        }
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

export default SpectrumExport;
