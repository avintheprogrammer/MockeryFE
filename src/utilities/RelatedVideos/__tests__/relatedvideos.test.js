import { getProvider } from '../index';
import parsely from '../providers/parsely';
import vilynx from '../providers/vilynx';

describe('RelatedVideos providers getProvider()', () => {
  it('loads appropriate provider', () => {
    expect(getProvider('vilynx', {})).toEqual(vilynx);
    expect(getProvider('parsely')).toEqual(parsely);
  });
});
