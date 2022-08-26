import createCache from '@emotion/cache';

export default const createEmotionCache = () => {
  return createCache({ key: 'css' });
};
