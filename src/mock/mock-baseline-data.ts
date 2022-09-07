const mockBaselinesData = {
  baselines: [
    'm033_m033_XX',
    'm033_m033_XY',
    'm033_m033_YX',
    'm033_m033_YY',
    'm034_m034_XX',
    'm034_m034_XY',
    'm034_m034_YX',
    'm034_m034_YY',
    'm035_m035_XX',
    'm035_m035_XY',
    'm035_m035_YX',
    'm035_m035_YY',
    'm036_m036_XX',
    'm036_m036_XY',
    'm036_m036_YX',
    'm036_m036_YY',
    'm037_m037_XX',
    'm037_m037_XY',
    'm037_m037_YX',
    'm037_m037_YY',
    'm038_m038_XX',
    'm038_m038_XY',
    'm038_m038_YX',
    'm038_m038_YY',
    'm039_m039_XX',
    'm039_m039_XY',
    'm039_m039_YX',
    'm039_m039_YY',
    'm040_m040_XX',
    'm040_m040_XY',
    'm040_m040_YX',
    'm040_m040_YY',
    'm041_m041_XX',
    'm041_m041_XY',
    'm041_m041_YX',
    'm041_m041_YY',
    'm042_m042_XX',
    'm042_m042_XY',
    'm042_m042_YX',
    'm042_m042_YY',
    'm043_m043_XX',
    'm043_m043_XY',
    'm043_m043_YX',
    'm043_m043_YY',
    'm044_m044_XX',
    'm044_m044_XY',
    'm044_m044_YX',
    'm044_m044_YY',
    'm045_m045_XX',
    'm045_m045_XY',
    'm045_m045_YX',
    'm045_m045_YY',
    'm046_m046_XX',
    'm046_m046_XY',
    'm046_m046_YX',
    'm046_m046_YY',
    'm047_m047_XX',
    'm047_m047_XY',
    'm047_m047_YX',
    'm047_m047_YY',
    'm049_m049_XX',
    'm049_m049_XY',
    'm049_m049_YX',
    'm049_m049_YY',
    'm050_m050_XX',
    'm050_m050_XY',
    'm050_m050_YX',
    'm050_m050_YY',
    'm051_m051_XX',
    'm051_m051_XY',
    'm051_m051_YX',
    'm051_m051_YY',
    'm052_m052_XX',
    'm052_m052_XY',
    'm052_m052_YX',
    'm052_m052_YY',
    'm053_m053_XX',
    'm053_m053_XY',
    'm053_m053_YX',
    'm053_m053_YY',
    'm054_m054_XX',
    'm054_m054_XY',
    'm054_m054_YX',
    'm054_m054_YY',
    'm055_m055_XX',
    'm055_m055_XY',
    'm055_m055_YX',
    'm055_m055_YY',
    'm056_m056_XX',
    'm056_m056_XY',
    'm056_m056_YX',
    'm056_m056_YY',
    'm057_m057_XX',
    'm057_m057_XY',
    'm057_m057_YX',
    'm057_m057_YY',
    'm058_m058_XX',
    'm058_m058_XY',
    'm058_m058_YX',
    'm058_m058_YY',
    'm059_m059_XX',
    'm059_m059_XY',
    'm059_m059_YX',
    'm059_m059_YY',
    'm060_m060_XX',
    'm060_m060_XY',
    'm060_m060_YX',
    'm060_m060_YY',
    'm061_m061_XX',
    'm061_m061_XY',
    'm061_m061_YX',
    'm061_m061_YY',
    'm062_m062_XX',
    'm062_m062_XY',
    'm062_m062_YX',
    'm062_m062_YY',
    'm063_m063_XX',
    'm063_m063_XY',
    'm063_m063_YX',
    'm063_m063_YY',
    'm033_m034_XX',
    'm033_m034_XY',
    'm033_m034_YX',
    'm033_m034_YY',
    'm033_m035_XX',
    'm033_m035_XY',
    'm033_m035_YX',
    'm033_m035_YY',
    'm034_m035_XX',
    'm034_m035_XY',
    'm034_m035_YX',
    'm034_m035_YY',
    'm033_m036_XX',
    'm033_m036_XY',
    'm033_m036_YX',
    'm033_m036_YY',
    'm034_m036_XX',
    'm034_m036_XY',
    'm034_m036_YX',
    'm034_m036_YY',
    'm035_m036_XX',
    'm035_m036_XY',
    'm035_m036_YX',
    'm035_m036_YY',
    'm033_m037_XX',
    'm033_m037_XY',
    'm033_m037_YX',
    'm033_m037_YY',
    'm034_m037_XX',
    'm034_m037_XY',
    'm034_m037_YX',
    'm034_m037_YY',
    'm035_m037_XX',
    'm035_m037_XY',
    'm035_m037_YX',
    'm035_m037_YY',
    'm036_m037_XX',
    'm036_m037_XY',
    'm036_m037_YX',
    'm036_m037_YY',
    'm033_m038_XX',
    'm033_m038_XY',
    'm033_m038_YX',
    'm033_m038_YY',
    'm034_m038_XX',
    'm034_m038_XY',
    'm034_m038_YX',
    'm034_m038_YY',
    'm035_m038_XX',
    'm035_m038_XY',
    'm035_m038_YX',
    'm035_m038_YY',
    'm036_m038_XX',
    'm036_m038_XY',
    'm036_m038_YX',
    'm036_m038_YY',
    'm037_m038_XX',
    'm037_m038_XY',
    'm037_m038_YX',
    'm037_m038_YY',
    'm033_m039_XX',
    'm033_m039_XY',
    'm033_m039_YX',
    'm033_m039_YY',
    'm034_m039_XX',
    'm034_m039_XY',
    'm034_m039_YX',
    'm034_m039_YY',
    'm035_m039_XX',
    'm035_m039_XY',
    'm035_m039_YX',
    'm035_m039_YY',
    'm036_m039_XX',
    'm036_m039_XY',
    'm036_m039_YX',
    'm036_m039_YY',
    'm037_m039_XX',
    'm037_m039_XY',
    'm037_m039_YX',
    'm037_m039_YY',
    'm038_m039_XX',
    'm038_m039_XY',
    'm038_m039_YX',
    'm038_m039_YY',
    'm033_m040_XX',
    'm033_m040_XY',
    'm033_m040_YX',
    'm033_m040_YY',
    'm034_m040_XX',
    'm034_m040_XY',
    'm034_m040_YX',
    'm034_m040_YY',
    'm035_m040_XX',
    'm035_m040_XY',
    'm035_m040_YX',
    'm035_m040_YY',
    'm036_m040_XX',
    'm036_m040_XY',
    'm036_m040_YX',
    'm036_m040_YY',
    'm037_m040_XX',
    'm037_m040_XY',
    'm037_m040_YX',
    'm037_m040_YY',
    'm038_m040_XX',
    'm038_m040_XY',
    'm038_m040_YX',
    'm038_m040_YY',
    'm039_m040_XX',
    'm039_m040_XY',
    'm039_m040_YX',
    'm039_m040_YY',
    'm033_m041_XX',
    'm033_m041_XY',
    'm033_m041_YX',
    'm033_m041_YY',
    'm034_m041_XX',
    'm034_m041_XY',
    'm034_m041_YX',
    'm034_m041_YY',
    'm035_m041_XX',
    'm035_m041_XY',
    'm035_m041_YX',
  ],
};

export default mockBaselinesData;
