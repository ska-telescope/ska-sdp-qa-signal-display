// Used for Determining sizing of cards and image grid
import { env } from '../env';

export const CELL_HEIGHT = 75;
export const CELL_WIDTH = 150;
export const ROW_HEIGHT = 164;

export const COLOR = [
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FF00FF',
  '#00FFFF',
  '#008000',
  '#000080',
  '#808000',
  '#800080',
  '#008080',
  '#808080',
  '#C00000',
  '#00C000',
  '#0000C0',
  '#C0C000',
  '#C000C0',
  '#00C0C0',
  '#C0C0C0',
  '#004000',
  '#404000',
  '#004040',
  '#404040',
  '#200000',
  '#002000',
  '#000020',
  '#202000',
  '#200020',
  '#002020',
  '#202020',
  '#600000',
  '#006000',
  '#000060',
  '#606000',
  '#600060',
  '#006060',
  '#606060',
  '#A00000',
  '#00A000',
  '#0000A0',
  '#A0A000',
  '#A000A0',
  '#00A0A0',
  '#A0A0A0',
  '#E00000',
  '#00E000',
  '#0000E0',
  '#E0E000',
  '#E000E0',
  '#00E0E0',
  '#E0E0E0',
  '#39848F',
  '#F25A43',
  '#9379E0',
  '#D67283',
  '#9DD1BD',
  '#BF1AF4',
  '#47FB64',
  '#18983A',
  '#366192',
  '#480A69',
  '#E7A31F',
  '#0582BE',
  '#A75C5A',
  '#3FA02D',
  '#2CDCB3',
  '#8F33D8',
  '#E85728',
  '#04352C',
  '#D3E4CF',
  '#541270',
  '#380056',
  '#D8C74B',
  '#5ADF6C',
  '#34877C',
  '#22A24E',
  '#5CEB30',
  '#9C7FA9',
  '#11069F',
  '#15D338',
  '#1E0D9F',
  '#71684B',
  '#517B1C',
  '#4F006E',
  '#05D285',
  '#CA3E12',
  '#DB666E',
  '#847A93',
  '#118C00',
  '#E2B535',
  '#0F21D3',
  '#037E84',
  '#9AED54',
  '#8635DC',
  '#45F612',
  '#861F6E',
  '#1C2A4E',
  '#CC5F70',
  '#A684F9',
  '#18BBBD',
  '#5629D5',
  '#57B808',
  '#074BD7',
  '#21A163',
  '#A11789',
  '#92407A',
  '#79F5C5',
  '#4FC12D',
  '#0F3E4C',
  '#7A5228',
  '#AB71A6',
  '#8EF43B',
  '#B5D9F6',
  '#5C2A0F',
  '#5088E2',
  '#07AE23',
  '#302E25',
  '#4B0926',
  '#C6044C',
  '#777B62',
  '#15B95B',
  '#31E498',
  '#DDB222',
  '#9C4AEF',
  '#FD54AE',
  '#7D2552',
  '#7F25B8',
  '#406690',
  '#E24003',
  '#CAAD37',
  '#030F7C',
  '#F98935',
  '#877808',
  '#B5590A',
  '#E77CBF',
  '#FCBDA7',
  '#821432',
  '#1FD63F',
  '#A196B8',
  '#377747',
  '#FE43CE',
  '#1446F3',
  '#5376C6',
  '#A38C35',
  '#DF5AC2',
  '#0BBB3B',
  '#56CCBE',
  '#83BC53',
  '#4501A2',
  '#7B2858',
  '#B0D299',
  '#B83181',
  '#73B11D',
  '#522F33',
  '#7ED33A',
  '#E27988',
  '#26768F',
  '#B13A42',
  '#41E4F9',
  '#A8F922',
  '#1FAA21',
  '#37AA10',
  '#609131',
  '#1ECE9F',
  '#C8C281',
  '#61DC23',
  '#8C5B6D',
  '#D39752',
  '#9253BA',
  '#9AF55B',
  '#9DE489',
  '#47CDFD',
  '#3CC0B8',
  '#1C7AC4',
  '#077207',
  '#1C2261',
  '#797BA2',
  '#FD3C6D',
  '#726B56',
  '#3598F1',
  '#8DDFB6',
  '#248B67',
  '#653314',
  '#F2F37C',
  '#F62BB7',
  '#F8F447',
  '#CEA4DB',
  '#FA9A17',
  '#26F8C5',
  '#599913',
  '#781AC0',
  '#20070D',
  '#61D363',
  '#74F885',
  '#3503D0',
  '#D3A6F3',
  '#08C8E9',
  '#CCB422',
  '#C2A38B',
  '#166501',
  '#99062F',
  '#FDD9AD',
  '#EF4936',
  '#28BEB2',
  '#067EC3',
  '#A9B850',
  '#1FD6DC',
  '#63B190',
  '#30C0EC',
  '#C5072B',
  '#8F511B',
  '#3A5314',
  '#5AD28A',
  '#1C356B',
  '#363190',
  '#22329D',
  '#B4E481',
  '#3C4B78',
  '#208157',
  '#DF1C7C',
  '#6DF0E5',
  '#B3AEEA',
  '#F54293',
  '#1BF545',
  '#AB3120',
  '#9C91B3',
  '#D9150B',
  '#4A1329',
  '#CBB16F',
  '#3C27FC',
  '#50800C',
  '#1B581D',
  '#5587FF',
  '#D69F85',
  '#A5F347',
  '#58BE43',
  '#B7ACE1',
  '#E990E0',
  '#F32176',
  '#3257D0',
  '#C48FAD',
  '#E0F57B',
  '#EED16D',
  '#326316',
  '#B5BDBD',
  '#A8FA1E',
  '#24317B',
  '#D0316C',
  '#15636F',
  '#971BEA',
  '#CBB028',
  '#EA115E',
  '#5C63D9',
  '#8CA5AA',
  '#91465F',
  '#03B30D',
  '#5EAA7B',
  '#2CAE89',
  '#823514',
  '#CFA604',
  '#63EB3E',
  '#484272',
  '#3339DF',
  '#C47137',
  '#5E5E99',
  '#C3804C',
  '#5871D7',
  '#738415',
  '#305100',
  '#1BE07F',
  '#8167C3',
  '#669FE7',
  '#5ACD0C',
  '#794C5C',
  '#181C29',
  '#0D1396',
  '#3DCD85',
  '#BF1E84',
  '#E87235',
  '#5F69E5',
  '#EAEE41',
  '#11F60B',
  '#9025E2',
  '#45F010',
  '#BFCD05',
  '#2521D1',
  '#A1A81C',
  '#B053C7',
  '#4C385B',
  '#72F21C',
  '#AD537C',
  '#B9A6AC',
  '#FF29F5',
  '#4FA14B',
  '#0294D8',
  '#0DB149',
  '#CEE849',
  '#289907',
  '#782B20',
  '#E3C7C6',
  '#D1D631',
  '#8DEA4D',
  '#50D844',
  '#19EDB7',
  '#79595A',
  '#6A27CF',
  '#326ABC',
  '#F76C48',
  '#B4022D',
  '#367E24',
  '#E54E18',
  '#6CDD5E',
  '#4D0C30',
  '#15D1E7',
  '#87B4B9',
  '#823954',
  '#E8E71D',
  '#F0B3BC',
  '#8D124F',
  '#38FD5A',
  '#9D800F',
  '#83E5A6',
  '#BFD998',
  '#3DA84F',
  '#81D87D',
  '#7A0349',
  '#9F5098',
  '#33EAE2',
  '#CB3C17',
  '#AE81C7',
  '#0D1D06',
  '#539E4D',
  '#88F96E',
  '#645B9E',
  '#A74DF8',
  '#850C93',
  '#0DA7F8',
  '#B6681D',
  '#B21982',
  '#A9F45E',
  '#8B5BC9',
  '#6E3B96',
  '#FF8F78',
  '#18BF2A',
  '#1E8DF8',
  '#572E30',
  '#01205E',
  '#96EAA8',
  '#59AB9F',
  '#64CC36',
  '#3EE3A5',
  '#B91367',
  '#4224CD',
  '#6940A6',
  '#B80CBE',
  '#ECD7E9',
  '#AA02CE',
  '#FC5E3C',
  '#8CEE50',
  '#945176',
  '#BB1E5F',
  '#3AA117',
  '#DD53CD',
  '#2AA16B',
  '#8AC9A2',
  '#1CB9D0',
  '#869AA8',
  '#80F750',
  '#FC485C',
  '#46CDEF',
  '#E82B6E',
  '#A88634',
  '#09B115',
  '#802051',
  '#E90F59',
  '#55CB93',
  '#381397',
  '#D4A556',
  '#244BA7',
  '#4EA005',
  '#F8F093',
  '#1C7E8C',
  '#8BDDF9',
  '#FFF425',
  '#4F8DC6',
  '#64AE9F',
  '#79FAFE',
  '#517304',
  '#7CBB77',
  '#BCDD03',
  '#750ED9',
  '#C9C2CB',
  '#7D6F3F',
  '#1BA0F0',
  '#7A928D',
  '#0994CE',
  '#2CC047',
  '#0E410C',
  '#7CE071',
  '#A0CBFA',
  '#1F90B4',
  '#89B249',
  '#9E5976',
  '#CE4E3D',
  '#215AA0',
  '#8217ED',
  '#D5E3C2',
  '#CA0874',
  '#AF8DD2',
  '#2D9E2A',
  '#35B7B4',
  '#A1C38E',
  '#45B44B',
  '#6C3537',
  '#45D443',
  '#E59580',
  '#B1263F',
  '#F844B1',
  '#E2E35E',
  '#597EF9',
  '#8DBCD8',
  '#3008A8',
  '#920603',
  '#05C5B5',
  '#B05D76',
  '#E2AC30',
  '#E273D2',
  '#079330',
  '#28127E',
  '#4E81F1',
  '#987D7A',
  '#C355A7',
  '#FBF540',
  '#BD8A23',
  '#FF6B60',
  '#341208',
  '#CA8872',
  '#AA39AA',
  '#3E4B91',
  '#772A86',
  '#854595',
  '#9B25ED',
  '#EC1884',
  '#D73947',
  '#640739',
  '#A8AE08',
  '#9946EF',
  '#8639AC',
  '#31FBA3',
  '#2B606F',
  '#3D13C4',
  '#903FEB',
  '#D7735D',
  '#F63E53',
  '#2F72FE',
  '#A4558C',
  '#FCCF52',
  '#B076A0',
  '#DCDC0B',
  '#5A034D',
  '#22E655',
  '#F706CE',
  '#EED0B7',
  '#BD72FD',
  '#6FE692',
  '#429EF6',
  '#3E13E9',
  '#65F197',
  '#607CC4',
  '#4E0EF4',
  '#94139F',
  '#A96FD4',
  '#51F6FB',
  '#001695',
  '#7CD2B7',
  '#B6C80C',
  '#B492BD',
  '#82D3D9',
  '#6C9D8C',
  '#3CA61E',
  '#07562E',
  '#9AF5C2',
  '#DD5C3D',
  '#BF972F',
  '#F774DE',
  '#FCFE38',
  '#E37618',
  '#C8837C',
  '#D16D93',
  '#D30451',
  '#EBDA1A',
  '#E2BFE2',
  '#4056EA',
  '#C80074',
  '#FBFC09',
  '#C6ADDD',
  '#FF33AC',
  '#D9DD50',
  '#9F2FBF',
  '#DD4F9C',
  '#64B0DD',
  '#456342',
  '#11DFF0',
  '#F00D83',
  '#88A713',
  '#6EF1A8',
  '#D31463',
  '#0C7696',
  '#E5291B',
  '#B580AB',
  '#993B6B',
  '#F90D00',
  '#E265D8',
  '#88C5B0',
  '#02DF55',
  '#F3AA4C',
  '#99FFE5',
  '#7F40A1',
  '#360729',
  '#D96906',
  '#9CF509',
  '#4BA589',
  '#CC421B',
  '#066562',
  '#536A1A',
  '#9FF668',
  '#2C2F52',
  '#730C75',
  '#1B92E0',
  '#144E04',
  '#705DD7',
  '#152E2A',
  '#F75B21',
  '#94E2A7',
  '#5E581C',
  '#323AC2',
  '#7F9AC7',
  '#0AB79D',
  '#CB914D',
  '#D15167',
  '#5794F0',
  '#363CE9',
  '#63363E',
  '#1830C3',
  '#3018F9',
  '#F11486',
  '#7E8497',
  '#DB3A87',
  '#623AC9',
  '#9C8021',
  '#CCE1E4'
];

export const PROTOCOL = {
  JSON: 'json',
  MESSAGE_PACK: 'msgpack',
  PROTOBUF: 'protobuf'
};

export const POLARIZATIONS = ['XX', 'XY', 'YX', 'YY'];

export const SOCKET_STATUS = ['unknown', 'error', 'connected', 'local'];

export const WATERFALL_PLOT_TYPES = {
  SPECTROGRAM: 'spectrogram',
  LAG_PLOT: 'lag_plot',
  SPECTRUM: 'spectrum'
};

// Common URLs
export const DATA_API_URL = env.REACT_APP_DATA_API_URL;

export const DATA_LOCAL = env.REACT_APP_USE_LOCAL_DATA === 'true';

const processAPI = env.REACT_APP_WS_API ? env.REACT_APP_WS_API : 'ws://localhost:8002';
export const WS_API_URL = processAPI.startsWith('/')
  ? (window.location.protocol === 'https:' ? 'wss://' : 'ws://') +
    window.location.hostname +
    processAPI
  : processAPI;

export const LOOKUP_COLOUR_VALUES = [
  [255, 127, 127, 255],
  [255, 129, 127, 255],
  [255, 131, 127, 255],
  [255, 133, 127, 255],
  [255, 136, 127, 255],
  [255, 138, 127, 255],
  [255, 140, 127, 255],
  [255, 142, 127, 255],
  [255, 144, 127, 255],
  [255, 146, 127, 255],
  [255, 148, 127, 255],
  [255, 150, 127, 255],
  [255, 153, 127, 255],
  [255, 155, 127, 255],
  [255, 157, 127, 255],
  [255, 159, 127, 255],
  [255, 161, 127, 255],
  [255, 163, 127, 255],
  [255, 165, 127, 255],
  [255, 167, 127, 255],
  [255, 170, 127, 255],
  [255, 172, 127, 255],
  [255, 174, 127, 255],
  [255, 176, 127, 255],
  [255, 178, 127, 255],
  [255, 180, 127, 255],
  [255, 182, 127, 255],
  [255, 184, 127, 255],
  [255, 187, 127, 255],
  [255, 189, 127, 255],
  [255, 191, 127, 255],
  [255, 193, 127, 255],
  [255, 195, 127, 255],
  [255, 197, 127, 255],
  [255, 199, 127, 255],
  [255, 201, 127, 255],
  [255, 204, 127, 255],
  [255, 206, 127, 255],
  [255, 208, 127, 255],
  [255, 210, 127, 255],
  [255, 212, 127, 255],
  [255, 214, 127, 255],
  [255, 216, 127, 255],
  [255, 218, 127, 255],
  [255, 221, 127, 255],
  [255, 223, 127, 255],
  [255, 225, 127, 255],
  [255, 227, 127, 255],
  [255, 229, 127, 255],
  [255, 231, 127, 255],
  [255, 233, 127, 255],
  [255, 235, 127, 255],
  [255, 238, 127, 255],
  [255, 240, 127, 255],
  [255, 242, 127, 255],
  [255, 244, 127, 255],
  [255, 246, 127, 255],
  [255, 248, 127, 255],
  [255, 250, 127, 255],
  [255, 252, 127, 255],
  [255, 255, 127, 255],
  [252, 255, 127, 255],
  [250, 255, 127, 255],
  [248, 255, 127, 255],
  [246, 255, 127, 255],
  [244, 255, 127, 255],
  [242, 255, 127, 255],
  [240, 255, 127, 255],
  [238, 255, 127, 255],
  [235, 255, 127, 255],
  [233, 255, 127, 255],
  [231, 255, 127, 255],
  [229, 255, 127, 255],
  [227, 255, 127, 255],
  [225, 255, 127, 255],
  [223, 255, 127, 255],
  [221, 255, 127, 255],
  [218, 255, 127, 255],
  [216, 255, 127, 255],
  [214, 255, 127, 255],
  [212, 255, 127, 255],
  [210, 255, 127, 255],
  [208, 255, 127, 255],
  [206, 255, 127, 255],
  [204, 255, 127, 255],
  [201, 255, 127, 255],
  [199, 255, 127, 255],
  [197, 255, 127, 255],
  [195, 255, 127, 255],
  [193, 255, 127, 255],
  [191, 255, 127, 255],
  [189, 255, 127, 255],
  [187, 255, 127, 255],
  [184, 255, 127, 255],
  [182, 255, 127, 255],
  [180, 255, 127, 255],
  [178, 255, 127, 255],
  [176, 255, 127, 255],
  [174, 255, 127, 255],
  [172, 255, 127, 255],
  [170, 255, 127, 255],
  [167, 255, 127, 255],
  [165, 255, 127, 255],
  [163, 255, 127, 255],
  [161, 255, 127, 255],
  [159, 255, 127, 255],
  [157, 255, 127, 255],
  [155, 255, 127, 255],
  [153, 255, 127, 255],
  [150, 255, 127, 255],
  [148, 255, 127, 255],
  [146, 255, 127, 255],
  [144, 255, 127, 255],
  [142, 255, 127, 255],
  [140, 255, 127, 255],
  [138, 255, 127, 255],
  [135, 255, 127, 255],
  [133, 255, 127, 255],
  [131, 255, 127, 255],
  [129, 255, 127, 255],
  [127, 255, 127, 255],
  [127, 255, 129, 255],
  [127, 255, 131, 255],
  [127, 255, 133, 255],
  [127, 255, 135, 255],
  [127, 255, 138, 255],
  [127, 255, 140, 255],
  [127, 255, 142, 255],
  [127, 255, 144, 255],
  [127, 255, 146, 255],
  [127, 255, 148, 255],
  [127, 255, 150, 255],
  [127, 255, 152, 255],
  [127, 255, 155, 255],
  [127, 255, 157, 255],
  [127, 255, 159, 255],
  [127, 255, 161, 255],
  [127, 255, 163, 255],
  [127, 255, 165, 255],
  [127, 255, 167, 255],
  [127, 255, 170, 255],
  [127, 255, 172, 255],
  [127, 255, 174, 255],
  [127, 255, 176, 255],
  [127, 255, 178, 255],
  [127, 255, 180, 255],
  [127, 255, 182, 255],
  [127, 255, 184, 255],
  [127, 255, 187, 255],
  [127, 255, 189, 255],
  [127, 255, 191, 255],
  [127, 255, 193, 255],
  [127, 255, 195, 255],
  [127, 255, 197, 255],
  [127, 255, 199, 255],
  [127, 255, 201, 255],
  [127, 255, 204, 255],
  [127, 255, 206, 255],
  [127, 255, 208, 255],
  [127, 255, 210, 255],
  [127, 255, 212, 255],
  [127, 255, 214, 255],
  [127, 255, 216, 255],
  [127, 255, 218, 255],
  [127, 255, 221, 255],
  [127, 255, 223, 255],
  [127, 255, 225, 255],
  [127, 255, 227, 255],
  [127, 255, 229, 255],
  [127, 255, 231, 255],
  [127, 255, 233, 255],
  [127, 255, 235, 255],
  [127, 255, 238, 255],
  [127, 255, 240, 255],
  [127, 255, 242, 255],
  [127, 255, 244, 255],
  [127, 255, 246, 255],
  [127, 255, 248, 255],
  [127, 255, 250, 255],
  [127, 255, 252, 255],
  [127, 255, 255, 255],
  [127, 252, 255, 255],
  [127, 250, 255, 255],
  [127, 248, 255, 255],
  [127, 246, 255, 255],
  [127, 244, 255, 255],
  [127, 242, 255, 255],
  [127, 240, 255, 255],
  [127, 237, 255, 255],
  [127, 235, 255, 255],
  [127, 233, 255, 255],
  [127, 231, 255, 255],
  [127, 229, 255, 255],
  [127, 227, 255, 255],
  [127, 225, 255, 255],
  [127, 223, 255, 255],
  [127, 221, 255, 255],
  [127, 218, 255, 255],
  [127, 216, 255, 255],
  [127, 214, 255, 255],
  [127, 212, 255, 255],
  [127, 210, 255, 255],
  [127, 208, 255, 255],
  [127, 206, 255, 255],
  [127, 204, 255, 255],
  [127, 201, 255, 255],
  [127, 199, 255, 255],
  [127, 197, 255, 255],
  [127, 195, 255, 255],
  [127, 193, 255, 255],
  [127, 191, 255, 255],
  [127, 189, 255, 255],
  [127, 187, 255, 255],
  [127, 184, 255, 255],
  [127, 182, 255, 255],
  [127, 180, 255, 255],
  [127, 178, 255, 255],
  [127, 176, 255, 255],
  [127, 174, 255, 255],
  [127, 172, 255, 255],
  [127, 169, 255, 255],
  [127, 167, 255, 255],
  [127, 165, 255, 255],
  [127, 163, 255, 255],
  [127, 161, 255, 255],
  [127, 159, 255, 255],
  [127, 157, 255, 255],
  [127, 155, 255, 255],
  [127, 153, 255, 255],
  [127, 150, 255, 255],
  [127, 148, 255, 255],
  [127, 146, 255, 255],
  [127, 144, 255, 255],
  [127, 142, 255, 255],
  [127, 140, 255, 255],
  [127, 138, 255, 255],
  [127, 135, 255, 255],
  [127, 133, 255, 255],
  [127, 131, 255, 255],
  [127, 129, 255, 255],
  [127, 127, 255, 255],
  [129, 127, 255, 255],
  [131, 127, 255, 255],
  [133, 127, 255, 255],
  [135, 127, 255, 255],
  [138, 127, 255, 255],
  [140, 127, 255, 255],
  [142, 127, 255, 255],
  [144, 127, 255, 255],
  [146, 127, 255, 255],
  [148, 127, 255, 255],
  [150, 127, 255, 255],
  [152, 127, 255, 255],
  [155, 127, 255, 255],
  [157, 127, 255, 255],
  [159, 127, 255, 255],
  [161, 127, 255, 255],
  [163, 127, 255, 255],
  [165, 127, 255, 255],
  [167, 127, 255, 255],
  [169, 127, 255, 255],
  [172, 127, 255, 255],
  [174, 127, 255, 255],
  [176, 127, 255, 255],
  [178, 127, 255, 255],
  [180, 127, 255, 255],
  [182, 127, 255, 255],
  [184, 127, 255, 255],
  [187, 127, 255, 255],
  [189, 127, 255, 255],
  [191, 127, 255, 255],
  [193, 127, 255, 255],
  [195, 127, 255, 255],
  [197, 127, 255, 255],
  [199, 127, 255, 255],
  [201, 127, 255, 255],
  [204, 127, 255, 255],
  [206, 127, 255, 255],
  [208, 127, 255, 255],
  [210, 127, 255, 255],
  [212, 127, 255, 255],
  [214, 127, 255, 255],
  [216, 127, 255, 255],
  [218, 127, 255, 255],
  [221, 127, 255, 255],
  [223, 127, 255, 255],
  [225, 127, 255, 255],
  [227, 127, 255, 255],
  [229, 127, 255, 255],
  [231, 127, 255, 255],
  [233, 127, 255, 255],
  [235, 127, 255, 255],
  [238, 127, 255, 255],
  [240, 127, 255, 255],
  [242, 127, 255, 255],
  [244, 127, 255, 255],
  [246, 127, 255, 255],
  [248, 127, 255, 255],
  [250, 127, 255, 255],
  [252, 127, 255, 255],
  [255, 127, 255, 255],
  [255, 127, 252, 255],
  [255, 127, 250, 255],
  [255, 127, 248, 255],
  [255, 127, 246, 255],
  [255, 127, 244, 255],
  [255, 127, 242, 255],
  [255, 127, 240, 255],
  [255, 127, 238, 255],
  [255, 127, 235, 255],
  [255, 127, 233, 255],
  [255, 127, 231, 255],
  [255, 127, 229, 255],
  [255, 127, 227, 255],
  [255, 127, 225, 255],
  [255, 127, 223, 255],
  [255, 127, 221, 255],
  [255, 127, 218, 255],
  [255, 127, 216, 255],
  [255, 127, 214, 255],
  [255, 127, 212, 255],
  [255, 127, 210, 255],
  [255, 127, 208, 255],
  [255, 127, 206, 255],
  [255, 127, 203, 255],
  [255, 127, 201, 255],
  [255, 127, 199, 255],
  [255, 127, 197, 255],
  [255, 127, 195, 255],
  [255, 127, 193, 255],
  [255, 127, 191, 255],
  [255, 127, 189, 255],
  [255, 127, 187, 255],
  [255, 127, 184, 255],
  [255, 127, 182, 255],
  [255, 127, 180, 255],
  [255, 127, 178, 255],
  [255, 127, 176, 255],
  [255, 127, 174, 255],
  [255, 127, 172, 255],
  [255, 127, 170, 255],
  [255, 127, 167, 255],
  [255, 127, 165, 255],
  [255, 127, 163, 255],
  [255, 127, 161, 255],
  [255, 127, 159, 255],
  [255, 127, 157, 255],
  [255, 127, 155, 255],
  [255, 127, 153, 255],
  [255, 127, 150, 255],
  [255, 127, 148, 255],
  [255, 127, 146, 255],
  [255, 127, 144, 255],
  [255, 127, 142, 255],
  [255, 127, 140, 255],
  [255, 127, 138, 255],
  [255, 127, 135, 255],
  [255, 127, 133, 255],
  [255, 127, 131, 255],
  [255, 127, 129, 255],
  [255, 127, 127, 255]
];

export const OFFSETS = [
  'crossElevationOffset',
  'crossElevationFittedWidth',
  'elevationOffset',
  'elevationFittedWidth',
  'fittedHeight'
];

export const GAINS = ['amplitudeH', 'amplitudeV', 'phaseH', 'phaseV'];
