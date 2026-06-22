'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useWorldTransition } from './TransitionProvider';
import { TECH_RESUME, worlds } from '@/lib/worlds';
import { profile, projects, skills } from '@/lib/data';

/**
 * Terminal — the Engineer world's signature interactive piece. A real
 * (read-only-FS) shell: type `help` to discover commands, `goto designer` to
 * morph worlds, `resume` to grab the PDF. Output is plain nodes; no eval, no
 * network — everything resolves from the site's own data. Keyboard: ↑/↓ recall
 * history. The PersonaPill already ignores 1/2/3 while an input is focused.
 */

type Line = { kind: 'in' | 'out'; node: React.ReactNode };

const PROMPT = 'keshav@samarth:~$';

const enterprise = projects.filter((p) => p.featured && p.category?.includes('Enterprise'));

export default function Terminal() {
  const { navigate } = useWorldTransition();
  const [lines, setLines] = useState<Line[]>([
    { kind: 'out', node: <Banner /> }
  ]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const push = useCallback((node: React.ReactNode, kind: Line['kind'] = 'out') => {
    setLines((l) => [...l, { kind, node }]);
  }, []);

  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      push(
        <span>
          <span className="text-accent">{PROMPT}</span> {cmd}
        </span>,
        'in'
      );
      if (!cmd) return;

      const [name, ...args] = cmd.toLowerCase().split(/\s+/);

      switch (name) {
        case 'help':
          push(<HelpOutput />);
          break;
        case 'whoami':
          push(
            <div className="space-y-0.5">
              <div>{profile.name} — Solutions Architect &amp; Technical Lead</div>
              <div className="text-muted">builds from schema to UI · {profile.location}</div>
            </div>
          );
          break;
        case 'ls':
        case 'projects':
          push(
            <ul className="space-y-0.5">
              {enterprise.map((p) => (
                <li key={p.title}>
                  <span className="text-accent">›</span> {p.title.split(' — ')[0]}
                  <span className="text-muted"> — {p.category}</span>
                </li>
              ))}
              <li className="text-muted">
                run <span className="text-accent">open &lt;name&gt;</span> or scroll for case studies
              </li>
            </ul>
          );
          break;
        case 'stack':
        case 'skills':
          push(
            <div className="space-y-1">
              {skills.jobStack.groups.slice(0, 4).map((g) => (
                <div key={g.name}>
                  <span className="text-accent">{g.name}:</span>{' '}
                  <span className="text-muted">{g.items.join(', ')}</span>
                </div>
              ))}
            </div>
          );
          break;
        case 'contact':
          push(
            <div className="space-y-0.5">
              <div>email: <a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a></div>
              <div>linkedin: <a className="underline" href={profile.socials.linkedin} target="_blank" rel="noreferrer">/in/keshav-krishan</a></div>
              <div>github: <a className="underline" href={profile.socials.github} target="_blank" rel="noreferrer">@KeshavKrishanSharma</a></div>
            </div>
          );
          break;
        case 'resume':
        case 'cv':
          push(<span>opening résumé in a new tab…</span>);
          window.open(TECH_RESUME, '_blank');
          break;
        case 'worlds':
          push(
            <ul className="space-y-0.5">
              {worlds.map((w) => (
                <li key={w.id}>
                  <span className="text-accent">{w.num}.</span> {w.name}
                  <span className="text-muted"> — goto {w.id}</span>
                </li>
              ))}
            </ul>
          );
          break;
        case 'goto':
        case 'cd': {
          const target = worlds.find((w) => w.id === args[0]);
          if (args[0] === 'home' || args[0] === '/' || args[0] === '~') {
            push(<span>morphing home…</span>);
            setTimeout(() => navigate('/', '#6366f1'), 250);
          } else if (target) {
            push(<span>morphing to the {target.name}…</span>);
            setTimeout(() => navigate(`/${target.id}`, target.accent), 250);
          } else {
            push(<span className="text-amber-400">no such world: {args[0] ?? '(none)'} — try `worlds`</span>);
          }
          break;
        }
        case 'hire': {
          push(
            <div>
              <span className="text-accent">✓ excellent choice.</span> run{' '}
              <span className="text-accent">contact</span> or{' '}
              <span className="text-accent">resume</span>.
            </div>
          );
          break;
        }
        case 'sudo':
          push(<span className="text-amber-400">nice try — this architect answers to no root. 🙂</span>);
          break;
        case 'clear':
          setLines([]);
          return;
        default:
          push(
            <span className="text-amber-400">
              command not found: {name} — type <span className="text-accent">help</span>
            </span>
          );
      }
    },
    [navigate, push]
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = value;
    setHistory((h) => (v.trim() ? [...h, v] : h));
    setHIndex(null);
    run(v);
    setValue('');
  };

  // ↑/↓ recall command history.
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const idx = hIndex === null ? history.length - 1 : Math.max(0, hIndex - 1);
      setHIndex(idx);
      setValue(history[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (hIndex === null) return;
      const idx = hIndex + 1;
      if (idx >= history.length) {
        setHIndex(null);
        setValue('');
      } else {
        setHIndex(idx);
        setValue(history[idx]);
      }
    }
  };

  // Keep the latest output in view.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  return (
    <div
      className="glass-strong overflow-hidden rounded-2xl"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-3 w-3 rounded-full" style={{ background: 'rgb(var(--accent-3))' }} />
        <span className="h-3 w-3 rounded-full" style={{ background: 'rgb(var(--accent-2))' }} />
        <span className="h-3 w-3 rounded-full" style={{ background: 'rgb(var(--accent))' }} />
        <span className="ml-2 font-mono-tight text-xs text-muted">keshav@samarth ~ — try `help`</span>
      </div>

      <div
        ref={scrollRef}
        className="max-h-80 min-h-[15rem] overflow-y-auto px-5 py-4 font-mono-tight text-[13px] leading-relaxed text-fg"
      >
        {lines.map((l, i) => (
          <div key={i} className={l.kind === 'out' ? 'mb-2' : 'mb-1'}>
            {l.node}
          </div>
        ))}

        <form onSubmit={submit} className="flex items-center gap-2">
          <span className="flex-shrink-0 text-accent">{PROMPT}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
            className="w-full bg-transparent text-fg caret-transparent outline-none"
          />
          <span
            className="-ml-2 inline-block h-4 w-2 flex-shrink-0 animate-pulse"
            style={{ background: 'rgb(var(--accent))' }}
            aria-hidden
          />
        </form>
      </div>
    </div>
  );
}

function Banner() {
  return (
    <div className="space-y-1">
      <div className="text-accent">keshav.sh — interactive résumé shell</div>
      <div className="text-muted">
        type <span className="text-accent">help</span> to list commands ·{' '}
        <span className="text-accent">goto designer</span> to switch worlds
      </div>
    </div>
  );
}

function HelpOutput() {
  const rows: [string, string][] = [
    ['help', 'show this list'],
    ['whoami', 'who is Keshav'],
    ['projects', 'the enterprise modules'],
    ['stack', 'tools I ship with'],
    ['worlds / goto <w>', 'switch persona world'],
    ['resume', 'open the PDF résumé'],
    ['contact', 'how to reach me'],
    ['clear', 'clear the screen']
  ];
  return (
    <table className="w-full">
      <tbody>
        {rows.map(([c, d]) => (
          <tr key={c}>
            <td className="whitespace-nowrap pr-4 align-top text-accent">{c}</td>
            <td className="text-muted">{d}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
