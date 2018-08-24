import { getAppData } from '../postHelpers';

describe('getAppData', () => {
  it('should return an empty object when post does not contain an app', () => {
    const post = { json: {} };
    expect(getAppData(post)).toEqual({});
  });

  it('should return an empty object if app is defined but empty', () => {
    const post = { json: { app: '' } };
    expect(getAppData(post)).toEqual({});
  });

  it('should return an empty object if app is not on the white list', () => {
    const post = { json: { app: 'thisappshouldneverbeonthewhitelist12356' } };
    expect(getAppData(post)).toEqual({});
  });

  it('should return an object with the appName and version', () => {
    const post = { json: { app: 'weapp/1.2.4' } };
    expect(getAppData(post)).toEqual({ appName: 'weapp', version: '1.2.4' });
  });

  it('should return an object with the appName and empty version if version is absent', () => {
    const post = { json: { app: 'weapp' } };
    expect(getAppData(post)).toEqual({ appName: 'weapp', version: '' });
  });

  it('should handle more app parameters without failing, eg. weapp/1.2/other', () => {
    const post = { json: { app: 'weapp/1.2.3/something' } };
    expect(getAppData(post)).toEqual({ appName: 'weapp', version: '1.2.3' });
  });
});
