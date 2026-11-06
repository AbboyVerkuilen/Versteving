"""Build the standalone Chemistry 101-110 pages.

Usage:  python3 chemistry-src/build.py <repo-root> [course ids...]
        e.g. python3 chemistry-src/build.py . 101 102 110
With no course ids, every course is built.

Each course becomes a single self-contained file: <repo-root>/chemistry-<id>/index.html
- 101 is hand-written in chemistry-src/101/ (concatenated in order).
- 102-110 share head.html + core.js (the engine) and add their own content
  and labs from chemistry-src/courses/<id>.js.
"""
import os, re, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
ALL = [str(i) for i in range(101, 111)]


def node_check(js):
    with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False) as f:
        f.write(js)
        path = f.name
    try:
        r = subprocess.run(['node', '--check', path], capture_output=True, text=True)
        return r.returncode == 0, r.stderr
    except FileNotFoundError:
        return True, ''  # node not installed: skip the syntax check
    finally:
        os.unlink(path)


def build_101():
    parts = ['1-head.html', '2-body.html', '3a-core.js', '3b-visuals.js', '3c-labs.js', '3d-final.js']
    return ''.join(open(os.path.join(HERE, '101', p), encoding='utf-8').read() for p in parts)


def build_series(cid):
    head = open(os.path.join(HERE, 'head.html'), encoding='utf-8').read()
    core = open(os.path.join(HERE, 'core.js'), encoding='utf-8').read()
    src = open(os.path.join(HERE, 'courses', cid + '.js'), encoding='utf-8').read()
    title = re.search(r"title: '([^']+)'", src).group(1)
    lede = re.search(r"lede: '((?:[^'\\]|\\.)+)'", src).group(1).replace("\\'", "'")
    js = "(function(){\n'use strict';\n" + src + "\n" + core + "\n})();"
    ok, err = node_check(js)
    if not ok:
        raise SystemExit(f'{cid}: syntax error\n{err[:1500]}')
    h = head.replace('{{TITLE}}', f'{title} · Chemistry {cid}').replace('{{DESC}}', lede.replace('"', '&quot;'))
    return h + '<body>\n<script>\n' + js + '\n</script>\n</body>\n</html>\n'


def main():
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    root, ids = sys.argv[1], sys.argv[2:] or ALL
    for cid in ids:
        html = build_101() if cid == '101' else build_series(cid)
        out = os.path.join(root, f'chemistry-{cid}')
        os.makedirs(out, exist_ok=True)
        with open(os.path.join(out, 'index.html'), 'w', encoding='utf-8') as f:
            f.write(html)
        print(cid, 'ok', len(html), 'bytes')


if __name__ == '__main__':
    main()
