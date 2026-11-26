from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
class Page(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.links=[];self.assets=[];self.h1=0
 def handle_starttag(self,t,a):
  d=dict(a)
  if 'id'in d:self.ids.append(d['id'])
  if t=='h1':self.h1+=1
  if t=='a':self.links.append(d.get('href',''))
  if t=='img' and d.get('src'):self.assets.append(d['src'])
  if t=='script' and d.get('src'):self.assets.append(d['src'])
r=Path(__file__).resolve().parents[1]/'dist';pages={}
for f in r.glob('*.html'):
 if f.name.endswith('-check.html'):continue
 p=Page();p.feed(f.read_text());pages[f.name]=p
 assert len(p.ids)==len(set(p.ids)),f'Duplicate ID: {f.name}'
 assert p.h1==1,f'Expected one H1: {f.name}'
for name,p in pages.items():
 for link in p.links:
  u=urlsplit(link)
  if u.scheme or u.netloc:continue
  target=u.path.lstrip('/') or ('index.html' if u.path=='/' else name)
  assert (r/target).is_file(),f'Broken link: {name}: {link}'
  if u.fragment:assert u.fragment in pages[target].ids,f'Broken anchor: {name}: {link}'
 for asset in p.assets:assert (r/asset.lstrip('/')).is_file(),f'Missing asset: {name}: {asset}'
print(f'PASS: {len(pages)} pages; headings, unique IDs, links, anchors, images and scripts.')
