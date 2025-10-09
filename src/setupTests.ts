import { expect, afterEach } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';

// Extend expect with jest-dom matchers
expect.extend(matchers);

// Auto cleanup jsdom between tests
afterEach(() => {
  cleanup();
});
