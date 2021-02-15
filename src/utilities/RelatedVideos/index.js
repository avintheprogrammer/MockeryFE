import parsely from './providers/parsely';
import vilynx from './providers/vilynx';

const providers = {
  vilynx,
  parsely
};

export function getProvider(provider) {
  const p = providers[provider]
  if (!p) throw new Error('Provider not found.');
  return p;
}

export function getRecommendations(params, context) {
  const { provider, ...remainingArgs } = params;
  return getProvider(provider).getRecommendations(remainingArgs, context);
}
