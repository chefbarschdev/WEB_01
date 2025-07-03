#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';

async function fileExists(p: string) {
  try {
    await fs.stat(p);
    return true;
  } catch {
    return false;
  }
}

const root = process.cwd();
const machinePath = path.join(root, 'src/components/WaitlistMachine.tsx');
const apiPath = path.join(root, 'src/routes/api/waitlist/index.ts');
const joinPath = path.join(root, 'src/routes/join/index.tsx');

async function ensureMachine() {
  if (await fileExists(machinePath)) return false;
  const content = `import { component$, useSignal, $ } from '@builder.io/qwik';

export type WaitlistState = 'idle' | 'submitting' | 'success' | 'error';

export const WaitlistMachine = component$(() => {
  const email = useSignal('');
  const state = useSignal<WaitlistState>('idle');
  const timerVisible = useSignal(false);
  const errorMsg = useSignal('');

  const submit = $(async () => {
    if (state.value === 'submitting') return;
    state.value = 'submitting';
    timerVisible.value = true;
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        body: JSON.stringify({ email: email.value }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Unknown error');
      state.value = 'success';
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      errorMsg.value = message;
      state.value = 'error';
    } finally {
      timerVisible.value = false;
    }
  });

  return (
    <div>
      {state.value === 'success' ? (
        <p class="text-green-600">✅ You're on the waitlist!</p>
      ) : (
        <>
          <input type="email" bind:value={email} placeholder="Your email" class="border rounded p-2 mr-2" />
          <button onClick$={submit} disabled={state.value === 'submitting'} class="bg-blue-500 text-white px-4 py-2 rounded">Join Waitlist</button>
          {timerVisible.value && <p class="text-sm text-gray-500 mt-2">⏳ Saving your request...</p>}
          {state.value === 'error' && <p class="text-red-600 mt-2">❌ {errorMsg.value}</p>}
        </>
      )}
    </div>
  );
});
`;
  await fs.mkdir(path.dirname(machinePath), { recursive: true });
  await fs.writeFile(machinePath, content);
  return true;
}

async function ensureApi() {
  if (await fileExists(apiPath)) return false;
  const content = `import { type RequestHandler } from '@builder.io/qwik-city';
import { createClient } from '@supabase/supabase-js';

export const onPost: RequestHandler = async ({ request, json }) => {
  const { email } = await request.json();
  const url = process.env.SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY;
  if (!url || !anon) {
    json(500, { error: 'Supabase env vars missing' });
    return;
  }
  const supabase = createClient(url, anon);
  const { error } = await supabase.from('waitlist').insert({ email });
  if (error) {
    json(500, { error: error.message });
    return;
  }
  json(200, { success: true });
};
`;
  await fs.mkdir(path.dirname(apiPath), { recursive: true });
  await fs.writeFile(apiPath, content);
  return true;
}

async function patchJoin() {
  if (!(await fileExists(joinPath))) return false;
  const content = await fs.readFile(joinPath, 'utf-8');
  if (content.includes('WaitlistMachine')) return false;
  const replaced = content
    .replace('WaitlistForm', 'WaitlistMachine')
    .replace('<WaitlistForm />', '<WaitlistMachine />');
  await fs.writeFile(joinPath, replaced);
  return true;
}

async function run() {
  const changed = await Promise.all([
    ensureMachine(),
    ensureApi(),
    patchJoin(),
  ]);
  const envMissing = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'].filter(
    (k) => !process.env[k]
  );
  console.log('Init results:');
  changed.forEach((c, i) => {
    if (c)
      console.log(['Machine created', 'API created', 'Join page patched'][i]);
  });
  if (envMissing.length) {
    console.warn('Missing env vars:', envMissing.join(', '));
  } else {
    console.log('Supabase env vars present');
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
