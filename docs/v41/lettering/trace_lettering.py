from pathlib import Path
from PIL import Image, ImageFilter
import numpy as np
import json, hashlib, sys, xml.etree.ElementTree as ET
import vtracer
HERE=Path(__file__).resolve().parent
NS='http://www.w3.org/2000/svg'
ET.register_namespace('',NS)
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()

def components(mask):
    # Connected alpha regions by row runs, using 8-connectivity.
    a = np.array(mask) > 0
    parents, all_runs, prev = [], [], []
    def find(i):
        while parents[i] != i:
            parents[i] = parents[parents[i]]
            i = parents[i]
        return i
    def union(i,j):
        ri,rj=find(i),find(j)
        if ri != rj: parents[max(ri,rj)] = min(ri,rj)
    for y,row in enumerate(a):
        edges=np.flatnonzero(np.diff(np.pad(row.astype(np.int8),(1,1))))
        cur=[]
        j=0
        for l,r in zip(edges[::2],edges[1::2]):
            l,r=int(l),int(r)
            ident=len(parents); parents.append(ident)
            cur.append((l,r,ident)); all_runs.append((y,l,r,ident))
            while j<len(prev) and prev[j][1]<l: j+=1
            k=j
            while k<len(prev) and prev[k][0]<=r:
                union(ident,prev[k][2]); k+=1
        prev=cur
    stats={}
    for y,l,r,i in all_runs:
        root=find(i)
        s=stats.setdefault(root,{'area':0,'bbox':[l,y,r,y+1]})
        s['area']+=r-l
        b=s['bbox'];b[:]=[min(b[0],l),min(b[1],y),max(b[2],r),max(b[3],y+1)]
    return [(y,l,r,find(i)) for y,l,r,i in all_runs],stats

PARAMS={'alphaThreshold':128,'medianFilterSize':3,'minimumConnectedArea':16,'padding':56,'colormode':'binary','mode':'spline','filter_speckle':4,'corner_threshold':60,'length_threshold':6.0,'splice_threshold':45,'path_precision':3}
COLOR='#203c32'
manifest=[]

def trace(name,text,mask,metadata):
    bbox=mask.getbbox(); alpha=mask.crop(bbox); ink_size=alpha.size
    alpha=Image.fromarray(np.pad(np.array(alpha),PARAMS['padding']))
    alpha.save(HERE/f'{name}-alpha.png')
    rgba=np.zeros((alpha.height,alpha.width,4),dtype=np.uint8)
    opaque=np.array(alpha)>0
    rgba[opaque,:3]=[int(COLOR[k:k+2],16) for k in (1,3,5)];rgba[:,:,3]=np.array(alpha)
    Image.fromarray(rgba).save(HERE/f'{name}-clean-master.png')
    Image.eval(alpha,lambda a:255-a).convert('RGB').save(HERE/f'{name}-trace-input.png')
    trace_params={k:v for k,v in PARAMS.items() if k not in ['alphaThreshold','medianFilterSize','minimumConnectedArea','padding']}
    vtracer.convert_image_to_svg_py(str(HERE/f'{name}-trace-input.png'),str(HERE/f'{name}-trace.svg'),**trace_params)
    paths=[p for p in ET.parse(HERE/f'{name}-trace.svg').getroot() if p.tag.endswith('path') and p.get('fill','').lower() in ['#000000','#000','black']]
    prompt_file=metadata.pop('promptFile')
    metadata.update({'text':text,'sourceSha256':sha(HERE/metadata['source']),'sourceType':'AI-assisted brush lettering, generated with built-in image_gen; not human handwriting, a font, or font outlines','generationTool':'image_gen.imagegen','generationModel':'not exposed by built-in tool','transparent_background':True,'referenced_image_paths':None,'promptFile':prompt_file,'prompt':(HERE/prompt_file).read_text(),'method':'Threshold generated alpha, median filter, isolate connected components, remove regions under 16px, reconstruct spline contours with vtracer 0.6.15; no manual stroke redrawing','parameters':PARAMS,'characterGeometry':'original generated proportions, no scaling or glyph deformation; translations only where recorded','processedAlphaSha256':sha(HERE/f'{name}-alpha.png'),'inkDimensions':ink_size,'inkAspectRatio':round(ink_size[0]/ink_size[1],6),'license':{'type':'AI-generated project artwork','attribution':'AI-assisted lettering and algorithmic alpha contour reconstruction; do not claim human hand-lettering','thirdPartyFontUsed':False,'generationServiceTerms':'Subject to the terms governing the built-in image generation service; no separate font license applies','processor':'vtracer 0.6.15, MIT license; license copy in VTRACER-LICENSE'}})
    root=ET.Element(f'{{{NS}}}svg',{'viewBox':f'0 0 {alpha.width} {alpha.height}','width':str(alpha.width),'height':str(alpha.height),'role':'img','aria-labelledby':f'{name}-title {name}-desc','fill-rule':'evenodd'})
    ET.SubElement(root,f'{{{NS}}}title',{'id':f'{name}-title'}).text=text
    ET.SubElement(root,f'{{{NS}}}desc',{'id':f'{name}-desc'}).text='AI辅助题字母版经Alpha轮廓算法重建的真实路径。非字库转曲，非人工手写；保留原生字形与少量飞白。'
    ET.SubElement(root,f'{{{NS}}}metadata').text=json.dumps(metadata,ensure_ascii=False)
    for p in paths:
        p.set('fill',COLOR);p.set('fill-rule','evenodd');root.append(p)
    ET.ElementTree(root).write(HERE/f'{name}.svg',encoding='utf-8',xml_declaration=True)
    metadata.update({'svg':f'{name}.svg','svgSha256':sha(HERE/f'{name}.svg'),'viewBox':[0,0,alpha.width,alpha.height],'paths':len(paths),'bytes':(HERE/f'{name}.svg').stat().st_size})
    manifest.append(metadata)

# Legacy hero: independent two-line image. Preserve the glyph geometry, adding
# a little vertical breathing room and gently opening the second line's spacing.
im=Image.open(HERE/'legacy-master.png').convert('RGBA')
hard=im.getchannel('A').point(lambda a:255 if a>=128 else 0).filter(ImageFilter.MedianFilter(3))
runs,stats=components(hard)
clean=np.zeros((im.height+72,im.width+80),dtype=np.uint8)
for y,l,r,root in runs:
    s=stats[root]
    if s['area']<16:continue
    b=s['bbox'];cx=(b[0]+b[2])/2;cy=(b[1]+b[3])/2
    second=cy>400
    char=0 if cx<500 else 1 if cx<900 else 2 if cx<1190 else 3
    dx=(16+20*char) if second else 0
    clean[y+(72 if second else 0),l+dx:r+dx]=255
trace('legacy-title','山河不止，\n薪火有继',Image.fromarray(clean),{'source':'legacy-master.png','promptFile':'legacy-prompt.txt','lineBreaks':['山河不止，','薪火有继'],'layoutTranslations':{'firstLine':[0,0],'secondLineCharacterX':[16,36,56,76],'secondLineY':72}})

# Chapter title sheet: separate its disconnected rows by connected-component
# centers. Small spacing correction for the last line only; no glyph scaling.
im=Image.open(HERE/'chapters-sheet-master.png').convert('RGBA')
hard=im.getchannel('A').point(lambda a:255 if a>=128 else 0).filter(ImageFilter.MedianFilter(3))
runs,stats=components(hard)
for idx,(name,text) in enumerate([('learning-title','走近历史'),('service-title','践行责任'),('archives-title','保存记忆')]):
    clean=np.zeros((im.height,im.width),dtype=np.uint8)
    src=np.zeros_like(clean)
    for y,l,r,root in runs:
        s=stats[root]
        if s['area']<16:continue
        b=s['bbox'];cx=(b[0]+b[2])/2;cy=(b[1]+b[3])/2
        row=0 if cy<360 else 1 if cy<700 else 2
        if row!=idx:continue
        char=0 if cx<505 else 1 if cx<772 else 2 if cx<1055 else 3
        dx=-3*char if idx==2 else 0
        src[y,l:r]=255;clean[y,l+dx:r+dx]=255
    bbox=Image.fromarray(src).getbbox()
    crop=[max(0,bbox[0]-32),max(0,bbox[1]-32),min(im.width,bbox[2]+32),min(im.height,bbox[3]+32)]
    im.crop(crop).save(HERE/f'{name}-master.png')
    alpha=Image.fromarray(clean)
    box=alpha.getbbox();assert 3.5<=(box[2]-box[0])/(box[3]-box[1])<=4.2
    trace(name,text,alpha,{'source':f'{name}-master.png','sourceSheet':'chapters-sheet-master.png','sourceSheetSha256':sha(HERE/'chapters-sheet-master.png'),'sourceCrop':crop,'sourceSheetRow':idx+1,'promptFile':'chapters-sheet-prompt.txt','characterTranslationsX':[0,-3,-6,-9] if idx==2 else [0,0,0,0]})

(HERE/'provenance.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print(json.dumps([{k:m[k] for k in ['text','svg','viewBox','paths','bytes','inkDimensions','inkAspectRatio']} for m in manifest],ensure_ascii=False,indent=2))

