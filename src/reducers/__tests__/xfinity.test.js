import xfinity from '../xfinity'
import { XFINITY_EXPERIENCE } from '../../actions/xfinity'

describe('xfinity reducer', () => {
  it('should return the initial state', () => {
    expect(xfinity(undefined, {})).toEqual({
      isXfinity: false,
    });
  });

  it('should handle XFINITY_EXPERIENCE', () => {
    expect(
      xfinity(undefined, {
        type: XFINITY_EXPERIENCE,
      }),
    ).toEqual({
      isXfinity: true,
    });
  });
})
