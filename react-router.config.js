import {hydrogenPreset} from '@shopify/hydrogen/react-router-preset';

/**
 * React Router 7 Configuration for Numa Skin Hydrogen Storefront
 */
export default {
  presets: [hydrogenPreset()],
  future: {
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
  },
};
