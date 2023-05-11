export type Telescope = {
  code: string;
  name: string;
  location: string;
  position: {
    lat: number;
    lon: number;
  };
  image: string;
};


export interface TelescopeState {
    telescope: Telescope | null,
}

export const TELESCOPE_LOW = {
  code: 'low',
  name: 'SKA LOW',
  location: 'Dalgaranga Gold M',
  position: {
    lat: -27.685534514102958,
    lon: 117.08484475669175,
  },
  image:
    'https://res.cloudinary.com/dmwc3xvv8/image/upload/v1612505143/ska_low_dzquiv.svg',
};

export const TELESCOPE_MID = {
  code: 'mid',
  name: 'SKA MID',
  location: 'Carnarvon',
  position: {
    lat: -30.722597428175952,
    lon: 21.89239803559566,
  },
  image:
    'https://res.cloudinary.com/dmwc3xvv8/image/upload/v1612505475/ska_mid_mnvuil.svg',
};

export type Tel = 'mid' | 'low';

export type Position = {
  lat: number;
  lon: number;
};

export type Place = 'Carnarvon' | 'Dalgaranga Gold M';

export const midPos: Position = {
  lat: -30.722597428175952,
  lon: 21.89239803559566,
};

export const lowPos: Position = {
  lat: -27.685534514102958,
  lon: 117.08484475669175,
};

export let tel: Tel;
export let telescope: Telescope;

export const TelescopeList = [TELESCOPE_LOW, TELESCOPE_MID];
