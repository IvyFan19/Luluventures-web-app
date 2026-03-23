let amplifyConfigPromise: Promise<void> | null = null;
let amplifyAuthPromise: Promise<typeof import('aws-amplify/auth')> | null = null;

export function ensureAmplifyConfigured() {
  if (!amplifyConfigPromise) {
    amplifyConfigPromise = import('../aws-config').then(() => undefined);
  }

  return amplifyConfigPromise;
}

export function loadAmplifyAuth() {
  if (!amplifyAuthPromise) {
    amplifyAuthPromise = Promise.all([ensureAmplifyConfigured(), import('aws-amplify/auth')]).then(
      ([, authModule]) => authModule
    );
  }

  return amplifyAuthPromise;
}
