const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

test('agnix reports an error for an invalid agent skill', () => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'agnix-invalid-'));
  const skillDirectory = path.join(
    fixtureRoot,
    '.agents',
    'skills',
    'Invalid Name',
  );

  try {
    fs.mkdirSync(skillDirectory, { recursive: true });
    fs.writeFileSync(
      path.join(skillDirectory, 'SKILL.md'),
      `---
name: Invalid Name
description: A deliberately invalid test skill.
---

This fixture must fail agnix validation.
`,
    );

    const agnixPath = path.resolve(
      'node_modules',
      '.bin',
      process.platform === 'win32' ? 'agnix.cmd' : 'agnix',
    );
    const result = spawnSync(agnixPath, [fixtureRoot], {
      encoding: 'utf8',
      shell: process.platform === 'win32',
      windowsHide: true,
    });
    const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`;

    assert.ifError(result.error);
    assert.notEqual(result.status, 0, output);
    assert.match(output, /:\d+:\d+ error:/, output);
  } finally {
    fs.rmSync(fixtureRoot, { recursive: true, force: true });
  }
});
